import { JWK } from "node-jose"
import {
  Resolver,
  DIDDocument
} from "did-resolver";
import { JwtSigner } from "./signers";

import JWT from "jsonwebtoken";
import Util from "util";

/*
* TODOs
* 1) External Signer
*/
export class DIDJwt {
  public static sign(payload: object, signer: JwtSigner): string {
    return signer.sign(payload);
  }


  public static async verify(resolver: Resolver, jwt: string,
    did: string): Promise<object>
  public static async verify(resolver: Resolver, jwt: string, did: string,
    options?: JWT.VerifyOptions): Promise<object> {
    return new Promise<object>(async (onSuccess: Function, onError: Function) => {
      try {
        // 1) Resolve the did document
        const didDoc: DIDDocument = await resolver.resolve(did);


        // 2) Get the jwk
        const decodedJwt: any = JWT.decode(jwt, { complete: true });
        let keyId: string = decodedJwt["header"]["kid"];

        // Default issuing key
        if (keyId == undefined)
          keyId = "#keys-1";

        keyId = Util.format("%s#%s", did, keyId);

        let publicKey: object = didDoc.publicKey.find(({ id }) => id === keyId);
        let jwk: JWK.Key = await JWK.asKey(publicKey["publicKeyJwk"]);

        onSuccess(JWT.verify(jwt, jwk.toPEM(false), options));

      } catch (err) {
        onError(err);
      }
    });
  }

}
