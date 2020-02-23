import { expect, assert } from "chai";

import { DIDJwt } from "../main";
import { DidJwk, getResolver } from "node-did-jwk";
import { Resolver } from "did-resolver";
import { JWK, JWT } from "jose";

describe("DID JWK Tests", () => {
  let jwk: JWK.ECKey;
  let jwk1: JWK.ECKey;

  let did: DidJwk;
  let did1: DidJwk;

  let jwt: string;
  let resolver: Resolver;

  before(() => {
    //jwk = JWK.generateSync("EC", "secp256k1");
    jwk = JWK.generateSync("EC", "P-256");
    jwk1 = JWK.generateSync("EC", "P-256");

    did = new DidJwk(jwk);
    did1 = new DidJwk(jwk1);

    const jwkResolver = getResolver();
    resolver = new Resolver({
      jwk: jwkResolver
    });
  });

  it("Should create a JWT", () => {
    jwt = DIDJwt.sign({ "name": "anonymous" }, jwk, { issuer: did.getDidUri() });
    assert.isNotNull(jwt);
  });

  it("JWT should be valid", () => {
    assert.doesNotThrow(async () => {
      await DIDJwt.verify(resolver, jwt, did.getDidUri());
    });
  });

  it("JWT should be invalid", async () => {
    try {
      await DIDJwt.verify(resolver, jwt, did1.getDidUri());
      assert.fail("expected exception not thrown");
    } catch (err) {
      expect(err).not.null
    }
  });
});
