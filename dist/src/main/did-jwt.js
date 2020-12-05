"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIDJwt = void 0;
var node_jose_1 = require("node-jose");
var errors_1 = require("./errors");
var node_forge_1 = require("node-forge");
var JWT = __importStar(require("jsonwebtoken"));
var KEY_ID_FRAGMENT_PATTERN = /^(?<did>(did):(.+):(.+))#(?<fragment>.+)$/;
var DIDJwt = /** @class */ (function () {
    function DIDJwt() {
    }
    DIDJwt.sign = function (payload, signer, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, signer.sign(payload, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DIDJwt.verify = function (resolver, jwt, caStore, options) {
        return __awaiter(this, void 0, void 0, function () {
            var decodedJwt, keyId, did, didDoc, publicKey, jwk, verifiedPayload, verificationResult, certificate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        decodedJwt = JWT.decode(jwt, { complete: true });
                        keyId = decodedJwt["header"]["kid"];
                        did = KEY_ID_FRAGMENT_PATTERN.exec(keyId).groups.did;
                        return [4 /*yield*/, resolver.resolve(did)];
                    case 1:
                        didDoc = _a.sent();
                        // 5) Check the issuer
                        if (didDoc.id != did)
                            throw new errors_1.WrongIssuerError("Wrong issuer!");
                        publicKey = didDoc.publicKey.find(function (_a) {
                            var id = _a.id;
                            return id === keyId;
                        });
                        return [4 /*yield*/, node_jose_1.JWK.asKey(publicKey.publicKeyPem, "pem")];
                    case 2:
                        jwk = _a.sent();
                        verifiedPayload = JWT.verify(jwt, jwk.toPEM(false), options);
                        verificationResult = {
                            issuer: did,
                            payload: verifiedPayload,
                        };
                        //verificationResult["issuer"] = did;
                        // 7) Verify the issuer's cert
                        if ("rootCertificate" in publicKey && caStore != undefined) {
                            certificate = node_forge_1.pki.certificateFromPem(publicKey["rootCertificate"]);
                            // Verify the certificate chain
                            node_forge_1.pki.verifyCertificateChain(caStore, [certificate]);
                            // Get the issuer's domain name
                            verificationResult.issuerDomainName = certificate.issuer.getField("CN").value;
                        }
                        return [2 /*return*/, verificationResult];
                }
            });
        });
    };
    return DIDJwt;
}());
exports.DIDJwt = DIDJwt;
