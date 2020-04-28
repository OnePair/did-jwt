"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var NodeJwtSigner = /** @class */ (function () {
    function NodeJwtSigner(key) {
        this.key = key;
    }
    NodeJwtSigner.prototype.sign = function (payload, options) {
        return jsonwebtoken_1.default.sign(payload, this.key.toPEM(true), options);
    };
    return NodeJwtSigner;
}());
exports.NodeJwtSigner = NodeJwtSigner;
