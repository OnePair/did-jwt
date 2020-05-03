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
var node_did_jwk_1 = require("node-did-jwk");
var did_resolver_1 = require("did-resolver");
var node_jose_1 = require("node-jose");
var signers_1 = require("../main/signers");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
describe("DID JWT Tests", function () {
    var jwk1;
    var jwk2;
    var did1;
    var did2;
    var signer1;
    var signer2;
    var jwt;
    var resolver;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        var jwkResolver;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_jose_1.JWK.asKey(fs_1.default.readFileSync(path_1.default.join(__dirname, "resources/jwk1.json")))];
                case 1:
                    jwk1 = _a.sent();
                    return [4 /*yield*/, node_jose_1.JWK.asKey(fs_1.default.readFileSync(path_1.default.join(__dirname, "resources/jwk2.json")))];
                case 2:
                    jwk2 = _a.sent();
                    did1 = new node_did_jwk_1.DidJwk(jwk1);
                    did2 = new node_did_jwk_1.DidJwk(jwk2);
                    signer1 = new signers_1.NodeJwtSigner(jwk1);
                    signer2 = new signers_1.NodeJwtSigner(jwk2);
                    jwkResolver = node_did_jwk_1.getResolver();
                    resolver = new did_resolver_1.Resolver({
                        jwk: jwkResolver
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should create a JWT without an exception", function () {
        chai_1.assert.doesNotThrow(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, main_1.DIDJwt.sign({ "name": "anonymous" }, signer1, {
                            issuer: did1.getDidUri(),
                            keyid: "keys-1",
                            algorithm: "ES256"
                        })];
                    case 1:
                        jwt = _a.sent();
                        chai_1.assert.isNotNull(jwt);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it("JWT verification against the right issuer should pass", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, main_1.DIDJwt.verify(resolver, jwt, did1.getDidUri())];
                case 1:
                    result = _a.sent();
                    chai_1.expect(result["iss"]).equal(did1.getDidUri());
                    return [2 /*return*/];
            }
        });
    }); });
    it("JWT verification against the wrong issuer should faild", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, main_1.DIDJwt.verify(resolver, jwt, did2.getDidUri())];
                case 2:
                    _a.sent();
                    chai_1.assert.fail("Verification should of failed!");
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    error = err_1;
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(error["name"]).equal("JsonWebTokenError");
                    return [2 /*return*/];
            }
        });
    }); });
    it("JWT verification against a null issuer should fail", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, main_1.DIDJwt.verify(resolver, jwt, null)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    error = err_2;
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(error).to.not.be.a("null");
                    return [2 /*return*/];
            }
        });
    }); });
    it("JWT verification against an undefined issuer should fail", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, main_1.DIDJwt.verify(resolver, jwt, undefined)];
                case 2:
                    _a.sent();
                    chai_1.assert.fail("Verification should of failed!");
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    error = err_3;
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(error).to.not.be.a("null");
                    return [2 /*return*/];
            }
        });
    }); });
    it("JWT verification against a undefined unsupported should fail", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, main_1.DIDJwt.verify(resolver, jwt, "did:example:1234")];
                case 2:
                    _a.sent();
                    chai_1.assert.fail("Verification should of failed!");
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    error = err_4;
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(error).to.not.be.a("null");
                    return [2 /*return*/];
            }
        });
    }); });
});
