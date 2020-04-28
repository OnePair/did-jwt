import { expect, assert } from "chai";

import { DIDJwt } from "../main";
import { DidJwk, getResolver } from "node-did-jwk";
import { Resolver } from "did-resolver";
import { JWK } from "node-jose";
import { JwtSigner, NodeJwtSigner } from "../main/signers";

import fs from "fs";
import path from "path";

describe("DID JWK Tests", () => {
  let jwk: JWK.Key;
  let jwk1: JWK.Key;

  let did: DidJwk;
  let did1: DidJwk;

  let signer1: JwtSigner;
  let signer2: JwtSigner;

  let jwt: string;
  let resolver: Resolver;

  before(async () => {
    jwk = await JWK.asKey(fs.readFileSync(path.join(__dirname, "resources/jwk1.json")));
    jwk1 = await JWK.asKey(fs.readFileSync(path.join(__dirname, "resources/jwk2.json")));

    did = new DidJwk(jwk);
    did1 = new DidJwk(jwk1);

    signer1 = new NodeJwtSigner(jwk);

    signer2 = new NodeJwtSigner(jwk);

    const jwkResolver = getResolver();
    resolver = new Resolver({
      jwk: jwkResolver
    });
  });

  it("Should create a JWT", () => {
    jwt = DIDJwt.sign({ "name": "anonymous" }, signer1, {
      issuer: did.getDidUri(),
      keyid: "keys-1",
      algorithm: "ES256"
    });
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
