import { expect, assert } from "chai";

import { DIDJwt } from "../main";
import { DidJwk, getResolver } from "node-did-jwk";
import { Resolver } from "did-resolver";
import { JWK } from "node-jose";
import { JwtSigner, NodeJwtSigner } from "../main/signers";

import fs from "fs";
import path from "path";

describe("DID JWT Tests", () => {
  let jwk1: JWK.Key;
  let jwk2: JWK.Key;

  let did1: DidJwk;
  let did2: DidJwk;

  let signer1: JwtSigner;
  let signer2: JwtSigner;

  let jwt: string;
  let resolver: Resolver;

  before(async () => {
    jwk1 = await JWK.asKey(fs.readFileSync(path.join(__dirname, "resources/jwk1.json")));
    jwk2 = await JWK.asKey(fs.readFileSync(path.join(__dirname, "resources/jwk2.json")));

    did1 = new DidJwk(jwk1);
    did2 = new DidJwk(jwk2);

    signer1 = new NodeJwtSigner(jwk1);
    signer2 = new NodeJwtSigner(jwk2);

    const jwkResolver = getResolver();
    resolver = new Resolver({
      jwk: jwkResolver
    });
  });

  it("Should create a JWT without an exception", () => {
    assert.doesNotThrow(() => {
      jwt = DIDJwt.sign({ "name": "anonymous" }, signer1, {
        issuer: did1.getDidUri(),
        keyid: "keys-1",
        algorithm: "ES256"
      });

      assert.isNotNull(jwt);
    });
  });

  it("JWT verification against the right issuer should pass", async () => {
    const result = await DIDJwt.verify(resolver, jwt, did1.getDidUri());

    expect(result["iss"]).equal(did1.getDidUri());
  });

  it("JWT verification against the wrong issuer should faild", async () => {
    try {
      await DIDJwt.verify(resolver, jwt, did2.getDidUri());
      assert.fail("Verification should of failed!");
    } catch (err) {
      expect(err["name"]).equal("JsonWebTokenError");
    }
  });

  it("JWT verification against a null issuer should fail", async () => {
    try {
      await DIDJwt.verify(resolver, jwt, null);
      assert.fail("Verification should of failed!");
    } catch (err) {
      expect(err).to.not.be.a("null");
    }
  });

  it("JWT verification against an undefined issuer should fail", async () => {
    try {
      await DIDJwt.verify(resolver, jwt, undefined);
      assert.fail("Verification should of failed!");
    } catch (err) {
      expect(err).to.not.be.a("null");
    }
  });

  it("JWT verification against a undefined unsupported should fail", async () => {
    try {
      await DIDJwt.verify(resolver, jwt, "did:example:1234");
      assert.fail("Verification should of failed!");
    } catch (err) {
      expect(err).to.not.be.a("null");
    }
  });
});
