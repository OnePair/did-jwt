import { JWK } from "node-jose";
import { Resolver, DIDDocument, PublicKey } from "did-resolver";
import { JwtSigner } from "./signers";
import { WrongIssuerError } from "./errors";

import * as JWT from "jsonwebtoken";
import * as Util from "util";

export class DIDJwt {
  public static async sign(
    payload: object,
    signer: JwtSigner,
    options?: JWT.SignOptions
  ): Promise<string> {
    return await signer.sign(payload, options);
  }

  public static async verify(
    resolver: Resolver,
    jwt: string,
    did: string
  ): Promise<object>;
  public static async verify(
    resolver: Resolver,
    jwt: string,
    did: string,
    options?: JWT.VerifyOptions
  ): Promise<object> {
    return new Promise<object>(
      async (onSuccess: Function, onError: Function) => {
        try {
          // 1) Resolve the did document
          const didDoc: DIDDocument = await resolver.resolve(did);

          // 2) Check the issuer
          if (didDoc.id != did) throw new WrongIssuerError("Wrong issuer!");

          // 2) Get the jwk
          const decodedJwt: any = JWT.decode(jwt, { complete: true });
          let keyId: string = decodedJwt["header"]["kid"];

          // Default issuing key
          if (keyId == undefined) keyId = Util.format("%s#keys-1", did);

          const publicKey: PublicKey = didDoc.publicKey.find(
            ({ id }) => id === keyId
          );

          const jwk: JWK.Key = await JWK.asKey(publicKey.publicKeyPem, "pem");

          onSuccess(JWT.verify(jwt, jwk.toPEM(false), options));
        } catch (err) {
          onError(err);
        }
      }
    );
  }
}
