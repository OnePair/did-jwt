import { JWK } from "node-jose";
import { Resolver, DIDDocument, PublicKey } from "did-resolver";
import { JwtSigner } from "./signers";
import { WrongIssuerError } from "./errors";
import { VerificationResult } from "./verification-result";

import { pki } from "node-forge";

import * as JWT from "jsonwebtoken";

const KEY_ID_FRAGMENT_PATTERN = /^(?<did>(did):(.+):(.+))#(?<fragment>.+)$/;

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
    jwt: string
  ): Promise<VerificationResult>;
  public static async verify(
    resolver: Resolver,
    jwt: string,
    caStore?: pki.CAStore
  ): Promise<VerificationResult>;
  public static async verify(
    resolver: Resolver,
    jwt: string,
    caStore?: pki.CAStore,
    options?: JWT.VerifyOptions
  ): Promise<VerificationResult> {
    // 1) Get the jwk
    const decodedJwt: any = JWT.decode(jwt, { complete: true });

    // 2) Get the key id
    const keyId: string = decodedJwt["header"]["kid"];

    // 3) Get the did
    const did = KEY_ID_FRAGMENT_PATTERN.exec(keyId).groups.did;

    // 4) Resolve the did document
    const didDoc: DIDDocument = await resolver.resolve(did);

    // 5) Check the issuer
    if (didDoc.id != did) throw new WrongIssuerError("Wrong issuer!");

    const publicKey: PublicKey = didDoc.publicKey.find(
      ({ id }) => id === keyId
    );

    const jwk: JWK.Key = await JWK.asKey(publicKey.publicKeyPem, "pem");

    // 6) Verify the JWT
    const verifiedPayload: any = JWT.verify(jwt, jwk.toPEM(false), options);

    // set the issuer
    let verificationResult: VerificationResult = {
      issuer: did,
      payload: verifiedPayload,
    };
    //verificationResult["issuer"] = did;

    // 7) Verify the issuer's cert
    if ("rootCertificate" in publicKey && caStore != undefined) {
      const certificate: pki.Certificate = pki.certificateFromPem(
        publicKey["rootCertificate"]
      );

      // Verify the certificate chain
      pki.verifyCertificateChain(caStore, [certificate]);

      // Get the issuer's domain name
      verificationResult.issuerDomainName = certificate.issuer.getField(
        "CN"
      ).value;
    }

    return verificationResult;
  }
}
