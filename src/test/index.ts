import { expect, assert } from "chai";

import { DIDJwt } from "../main";
import { JWK } from "node-jose";
import { NodeJwtSigner } from "../main/signers";
import { Resolver } from "did-resolver";
import { getResolver, DidJwk } from "node-did-jwk";

import util from "util";

const DID =
  "did:jwk:ZUp3bGprMFRRa0FBUVAvTG5qT2pRdWxXYklPeWtSajIwb2dkSDV2S1JxVHB2N2VtMjN1SE4vTStnRFp2c0FKUUF4TkFpNVRqMW5tZUJuTW9MbkZvek5YYTdoNkNhVW1RVmdMRFNacFZibzdrdzY1OXZvakptL2lhamJrM2t4VnVDWHR4YzRTLzlad1hscTl2WWxoak5ZZ3o1VHduV05aOUtkb1BmVXVPVkd5Tk12QWhXZTZWeE9YRnVIS0VVVC9OdmJkMnZ6WGx1dWd5VWNJV1EyR0ZYTjBtMmpVOHNTSHhVRmRTRzN4LzNydzdoQT09";

const DID_2 =
  "did:jwk:ZUp3bGpqa09na0FBQVAreXRTYUxCQVE3UU9TV0c2UXlpM0pEUU1LcDhlOHVzWnNwSnBrUHFJWVZuSUFvZ0Iyb2lpZkdaT1pxd2VMZlM4aXJxTFpSNHF3Qm83WUZVa0tPdFNHalVKN2JpMU9VaGhBM3FNNjIzRDFRTkxaSFAyR3o5bjliTUU5a1E1dmRFVjVzNld3aFZuRnlyelNDa1kxVldkR2Q1bFpXTDFMS2ZMclRXMXhzSzI4NWlLU1U2UW5OV3VKNXpnS3p5TzlYUXZNU1F4K1lzVVU2bjBtUTlEc2VndThQaUxvNkhnPT0";

const JWT_1 =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDpqd2s6WlVwM2JHcHJNRlJSYTBGQlVWQXZURzVxVDJwUmRXeFhZa2xQZVd0U2FqSXdiMmRrU0RWMlMxSnhWSEIyTjJWdE1qTjFTRTR2VFN0blJGcDJjMEZLVVVGNFRrRnBOVlJxTVc1dFpVSnVUVzlNYmtadmVrNVlZVGRvTmtOaFZXMVJWbWRNUkZOYWNGWmliemRyZHpZMU9YWnZha3B0TDJsaGFtSnJNMnQ0Vm5WRFdIUjRZelJUTHpsYWQxaHNjVGwyV1d4b2FrNVpaM28xVkhkdVYwNWFPVXRrYjFCbVZYVlBWa2Q1VGsxMlFXaFhaVFpXZUU5WVJuVklTMFZWVkM5T2RtSmtNblo2V0d4MWRXZDVWV05KVjFFeVIwWllUakJ0TW1wVk9ITlRTSGhWUm1SVFJ6TjRMek55ZHpkb1FUMDkja2V5cy0xIn0.eyJuYW1lIjoiYW5vbnltb3VzIiwiaWF0IjoxNjA1NTcxNDEwfQ.gN5RFwdXHbwOYRHvBnIOQM_RUkAAqn5_YPNNIZDVPED1SzWM0WSAbC5QSeVMtCFldowIgbZ1SPWWKAcM6McCLg";

const JWT_2 =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDpqd2s6WlVwM2JHcHFhMDluYTBGQlFWQXJlWFJUWVV4Q1FWRTNVVTlUVjBjMlVYbHBNMHBFVVUxTGNEaGxPSFZ6V25Od1NuQnJVSEZKV1ZadVNVRnZaMEl5YjJscFprZGFUMXB4ZDJWTVpsTTRhWEp4VEZwU05IRjNRbTgzV1VaVmEwdFBkRk5IYWxWS04ySnBNVTlWYUdoQk0zRk5Oakl6UkRGUlRreGFTRkF5UjNvNWJqbGlUVVU1YTFFMWRtUkZWalZ6TmxkM2FGWnVSbmx5ZWxORGExa3hWbGRrUjJRMWJGcFhUREZNUzJaTWNsUlhNWGh6U3pJNE5XbExVMVUyVVc1T1YzVktOWHBuUzNwNVR6bFlVWFpOVTFGNEsxbHpWVlUyYmpCdFVUbEVjMlZuZFRoUWFVeHZOa2huUFQwI2tleXMtMSJ9.eyJuYW1lIjoiYW5vbnltb3VzIiwiaWF0IjoxNjA1NTcxNjc2fQ.VTBlv53bTMET3h0hVdqn1ov5B9bTpj00-1xkDYAZGQmicPc7AcbtnpiJYyNryK79Jn4XHwARr0VfelHKjKvfYQ";

const JWK_1 = {
  kty: "EC",
  kid: "FPsTzIzibaXH39qMwp-IJ4Ekm-rZcdgmQhN5OKusveI",
  alg: "ES256",
  crv: "P-256",
  x: "7JUDBaEqZ9Vag6_3eZ5DU4YLzxueRk0uHjVUEe8L6cQ",
  y: "REYx1hSyContjAiwg04ZJrNXmNQDMeClXTrzcSNwjkM",
  d: "KVqyXXDtmSYaakBvHgDWZyubxG8V4x5KCdlBoyhek3c",
};

const JWK_2 = {
  kty: "EC",
  kid: "ewAlCPBzxWBJalQaeRyV8JoiaIWA9Q08I5TSrEvYfW0",
  alg: "ES256",
  crv: "P-256",
  x: "v3m6Op70FQGDPa9IRhTjMVu9bJHILRmXjkq3GgU6pLo",
  y: "zHVYGf8r1KPxbwwgVOih_N1KTeMLt8uoaLBgG03UpB0",
  d: "RBGAajC2mBVoB9aLG0HJgn1eBz7lqw0PYq8bMjolQHs",
};

describe("DID JWT Tests", () => {
  let jwk1: JWK.Key;
  let jwk2: JWK.Key;

  before(async () => {
    jwk1 = await JWK.asKey(JWK_1);
    jwk2 = await JWK.asKey(JWK_2);
  });

  it("Should create jwt", async () => {
    const signer = new NodeJwtSigner(jwk1);

    const jwt = await DIDJwt.sign({ name: "anonymous" }, signer, {
      //  issuer: DID,
      keyid: util.format("%s#keys-1", DID),
      algorithm: "ES256",
    });

    assert.isNotNull(jwt);
  });

  it("JWT verification pass", async () => {
    const jwkResolver = getResolver();
    const resolver = new Resolver({
      jwk: jwkResolver,
    });

    await DIDJwt.verify(resolver, JWT_1, DID);
  });

  // Verify with x5c

  // Verification should fail
  it("JWT verification should throw invalid signature error", async () => {
    const jwkResolver = getResolver();
    const resolver = new Resolver({
      jwk: jwkResolver,
    });

    try {
      await DIDJwt.verify(resolver, JWT_2, DID_2);
    } catch (err) {
      assert.equal(err.message, "invalid signature");
    }
  });

  it("JWT verification should throw invalid issuer error", async () => {
    const jwkResolver = getResolver();
    const resolver = new Resolver({
      jwk: jwkResolver,
    });

    try {
      await DIDJwt.verify(resolver, JWT_1, DID_2);
    } catch (err) {
      assert.isNotNull(err);
    }
  });
});

/*
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
    assert.doesNotThrow(async () => {
      jwt = await DIDJwt.sign({ "name": "anonymous" }, signer1, {
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
    var error = null

    try {
      await DIDJwt.verify(resolver, jwt, did2.getDidUri());
      assert.fail("Verification should of failed!");
    } catch (err) {
      error = err;
    }

    expect(error["name"]).equal("JsonWebTokenError");
  });

  it("JWT verification against a null issuer should fail", async () => {
    var error = null;

    try {
      await DIDJwt.verify(resolver, jwt, null);
    } catch (err) {
      error = err;
    }

    expect(error).to.not.be.a("null");
  });

  it("JWT verification against an undefined issuer should fail", async () => {
    var error = null;
    try {
      await DIDJwt.verify(resolver, jwt, undefined);
      assert.fail("Verification should of failed!");
    } catch (err) {
      error = err;
    }

    expect(error).to.not.be.a("null");
  });

  it("JWT verification against a undefined unsupported should fail", async () => {
    var error = null;
    try {
      await DIDJwt.verify(resolver, jwt, "did:example:1234");
      assert.fail("Verification should of failed!");
    } catch (err) {
      error = err;
    }

    expect(error).to.not.be.a("null");
  });
});*/
