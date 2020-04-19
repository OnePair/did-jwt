import { expect, assert } from "chai";

import { DIDJwt } from "../main";
import { DidJwk, getResolver } from "node-did-jwk";
import { Resolver } from "did-resolver";
import { JWK } from "node-jose";

describe("DID JWK Tests", () => {
  let jwk: JWK.Key;
  let jwk1: JWK.Key;

  let did: DidJwk;
  let did1: DidJwk;

  let jwt: string;
  let resolver: Resolver;

  before(async () => {
    //jwk = JWK.generateSync("EC", "secp256k1");
    jwk = await JWK.createKey("EC", "P-256", { alg: "ES256" });
    jwk1 = await JWK.createKey("EC", "P-256", { alg: "ES256" });

    did = new DidJwk(jwk);
    did1 = new DidJwk(jwk1);

    const jwkResolver = getResolver();
    resolver = new Resolver({
      jwk: jwkResolver
    });
  });

  it("Should create a JWT", () => {
    jwt = DIDJwt.sign({ "name": "anonymous" }, jwk, {
      issuer: did.getDidUri(),
      keyid: "keys-1",
      algorithm: "ES256"
    });
    //console.log(jwt);
    assert.isNotNull(jwt);
  });

  it("JWT should be valid", () => {
    assert.doesNotThrow(async () => {
      console.log(jwt);
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
