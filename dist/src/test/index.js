"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var main_1 = require("../main");
var node_jose_1 = require("node-jose");
var signers_1 = require("../main/signers");
var did_resolver_1 = require("did-resolver");
var node_did_jwk_1 = require("node-did-jwk");
var util_1 = __importDefault(require("util"));
var DID = "did:jwk:ZUp3bGprMFRRa0FBUVAvTG5qT2pRdWxXYklPeWtSajIwb2dkSDV2S1JxVHB2N2VtMjN1SE4vTStnRFp2c0FKUUF4TkFpNVRqMW5tZUJuTW9MbkZvek5YYTdoNkNhVW1RVmdMRFNacFZibzdrdzY1OXZvakptL2lhamJrM2t4VnVDWHR4YzRTLzlad1hscTl2WWxoak5ZZ3o1VHduV05aOUtkb1BmVXVPVkd5Tk12QWhXZTZWeE9YRnVIS0VVVC9OdmJkMnZ6WGx1dWd5VWNJV1EyR0ZYTjBtMmpVOHNTSHhVRmRTRzN4LzNydzdoQT09";
var DID_2 = "did:jwk:ZUp3bGpqa09na0FBQVAreXRTYUxCQVE3UU9TV0c2UXlpM0pEUU1LcDhlOHVzWnNwSnBrUHFJWVZuSUFvZ0Iyb2lpZkdaT1pxd2VMZlM4aXJxTFpSNHF3Qm83WUZVa0tPdFNHalVKN2JpMU9VaGhBM3FNNjIzRDFRTkxaSFAyR3o5bjliTUU5a1E1dmRFVjVzNld3aFZuRnlyelNDa1kxVldkR2Q1bFpXTDFMS2ZMclRXMXhzSzI4NWlLU1U2UW5OV3VKNXpnS3p5TzlYUXZNU1F4K1lzVVU2bjBtUTlEc2VndThQaUxvNkhnPT0";
var JWT_1 = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDpqd2s6WlVwM2JHcHJNRlJSYTBGQlVWQXZURzVxVDJwUmRXeFhZa2xQZVd0U2FqSXdiMmRrU0RWMlMxSnhWSEIyTjJWdE1qTjFTRTR2VFN0blJGcDJjMEZLVVVGNFRrRnBOVlJxTVc1dFpVSnVUVzlNYmtadmVrNVlZVGRvTmtOaFZXMVJWbWRNUkZOYWNGWmliemRyZHpZMU9YWnZha3B0TDJsaGFtSnJNMnQ0Vm5WRFdIUjRZelJUTHpsYWQxaHNjVGwyV1d4b2FrNVpaM28xVkhkdVYwNWFPVXRrYjFCbVZYVlBWa2Q1VGsxMlFXaFhaVFpXZUU5WVJuVklTMFZWVkM5T2RtSmtNblo2V0d4MWRXZDVWV05KVjFFeVIwWllUakJ0TW1wVk9ITlRTSGhWUm1SVFJ6TjRMek55ZHpkb1FUMDkja2V5cy0xIn0.eyJuYW1lIjoiYW5vbnltb3VzIiwiaWF0IjoxNjA1NTcxNDEwfQ.gN5RFwdXHbwOYRHvBnIOQM_RUkAAqn5_YPNNIZDVPED1SzWM0WSAbC5QSeVMtCFldowIgbZ1SPWWKAcM6McCLg";
var JWT_2 = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDpqd2s6WlVwM2JHcHFhMDluYTBGQlFWQXJlWFJUWVV4Q1FWRTNVVTlUVjBjMlVYbHBNMHBFVVUxTGNEaGxPSFZ6V25Od1NuQnJVSEZKV1ZadVNVRnZaMEl5YjJscFprZGFUMXB4ZDJWTVpsTTRhWEp4VEZwU05IRjNRbTgzV1VaVmEwdFBkRk5IYWxWS04ySnBNVTlWYUdoQk0zRk5Oakl6UkRGUlRreGFTRkF5UjNvNWJqbGlUVVU1YTFFMWRtUkZWalZ6TmxkM2FGWnVSbmx5ZWxORGExa3hWbGRrUjJRMWJGcFhUREZNUzJaTWNsUlhNWGh6U3pJNE5XbExVMVUyVVc1T1YzVktOWHBuUzNwNVR6bFlVWFpOVTFGNEsxbHpWVlUyYmpCdFVUbEVjMlZuZFRoUWFVeHZOa2huUFQwI2tleXMtMSJ9.eyJuYW1lIjoiYW5vbnltb3VzIiwiaWF0IjoxNjA1NTcxNjc2fQ.VTBlv53bTMET3h0hVdqn1ov5B9bTpj00-1xkDYAZGQmicPc7AcbtnpiJYyNryK79Jn4XHwARr0VfelHKjKvfYQ";
var JWK_1 = {
    kty: "EC",
    kid: "FPsTzIzibaXH39qMwp-IJ4Ekm-rZcdgmQhN5OKusveI",
    alg: "ES256",
    crv: "P-256",
    x: "7JUDBaEqZ9Vag6_3eZ5DU4YLzxueRk0uHjVUEe8L6cQ",
    y: "REYx1hSyContjAiwg04ZJrNXmNQDMeClXTrzcSNwjkM",
    d: "KVqyXXDtmSYaakBvHgDWZyubxG8V4x5KCdlBoyhek3c",
};
var JWK_2 = {
    kty: "EC",
    kid: "ewAlCPBzxWBJalQaeRyV8JoiaIWA9Q08I5TSrEvYfW0",
    alg: "ES256",
    crv: "P-256",
    x: "v3m6Op70FQGDPa9IRhTjMVu9bJHILRmXjkq3GgU6pLo",
    y: "zHVYGf8r1KPxbwwgVOih_N1KTeMLt8uoaLBgG03UpB0",
    d: "RBGAajC2mBVoB9aLG0HJgn1eBz7lqw0PYq8bMjolQHs",
};
describe("DID JWT Tests", function () {
    var jwk1;
    var jwk2;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_jose_1.JWK.asKey(JWK_1)];
                case 1:
                    jwk1 = _a.sent();
                    return [4 /*yield*/, node_jose_1.JWK.asKey(JWK_2)];
                case 2:
                    jwk2 = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should create jwt", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signer, jwt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signer = new signers_1.NodeJwtSigner(jwk1);
                    return [4 /*yield*/, main_1.DIDJwt.sign({ name: "anonymous" }, signer, {
                            //  issuer: DID,
                            keyid: util_1.default.format("%s#keys-1", DID),
                            algorithm: "ES256",
                        })];
                case 1:
                    jwt = _a.sent();
                    chai_1.assert.isNotNull(jwt);
                    return [2 /*return*/];
            }
        });
    }); });
    it("JWT verification pass", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jwkResolver, resolver;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jwkResolver = node_did_jwk_1.getResolver();
                    resolver = new did_resolver_1.Resolver({
                        jwk: jwkResolver,
                    });
                    return [4 /*yield*/, main_1.DIDJwt.verify(resolver, JWT_1, DID)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // Verify with x5c
    // Verification should fail
    it("JWT verification should throw invalid signature error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jwkResolver, resolver, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jwkResolver = node_did_jwk_1.getResolver();
                    resolver = new did_resolver_1.Resolver({
                        jwk: jwkResolver,
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, main_1.DIDJwt.verify(resolver, JWT_2, DID_2)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    chai_1.assert.equal(err_1.message, "invalid signature");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("JWT verification should throw invalid issuer error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jwkResolver, resolver, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jwkResolver = node_did_jwk_1.getResolver();
                    resolver = new did_resolver_1.Resolver({
                        jwk: jwkResolver,
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, main_1.DIDJwt.verify(resolver, JWT_1, DID_2)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    chai_1.assert.isNotNull(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
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
