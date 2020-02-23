import { JWT, JWK, JWKS } from "jose";
import {
  Resolver,
  DIDDocument,
  ParsedDID,
  parse
} from "did-resolver";

export class DIDJwt {
  public static sign(payload: object, key: JWK.Key,
    options?: JWT.SignOptions): string {
    return JWT.sign(payload, key, options);
  }

  public static async verify(resolver: Resolver, jwt: string,
    did: string): Promise<object>
  public static async verify(resolver: Resolver, jwt: string, did: string,
    options?: JWT.VerifyOptions<false>): Promise<object> {
    return new Promise<object>(async (onSuccess: Function, onError: Function) => {
      try {
        // 1) Resolve the did document
        let didDoc: DIDDocument = await resolver.resolve(did);

        // 2) Get the jwk
        let decodedJwt: object = JWT.decode(jwt);
        let issuer: string = decodedJwt["iss"];

        let parsedIssuerDid: ParsedDID = parse(issuer);
        // Default issuing key
        if (parsedIssuerDid.fragment == undefined)
          issuer = issuer + "#keys-1";

        let publicKey: object = didDoc.publicKey.find(({ id }) => id === issuer);
        let jwk: JWK.Key = publicKey["publicKeyJwk"];

        onSuccess(JWT.verify(jwt, jwk, options));

      } catch (err) {
        onError(err);
      }
    });
  }

}
