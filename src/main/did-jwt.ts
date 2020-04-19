import { JWK } from "node-jose"
import JWT from "jsonwebtoken";

import {
  Resolver,
  DIDDocument,
  ParsedDID,
  parse
} from "did-resolver";

import Util from "util";

/*
* TODOs
* 1) Key ID
* 2) External Signer
*/
export class DIDJwt {
  public static sign(payload: object, key: JWK.Key,
    options?: JWT.SignOptions): string {
    //return JWT.sign(payload, key, options);
    return JWT.sign(payload, key.toPEM(true), options);
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
        const issuer: string = decodedJwt["iss"];
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
