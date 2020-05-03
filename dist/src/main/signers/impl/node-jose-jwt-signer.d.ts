import { JwtSigner } from "../jwt-signer";
import { JWK } from "node-jose";
import * as JWT from "jsonwebtoken";
export declare class NodeJwtSigner implements JwtSigner {
    private key;
    constructor(key: JWK.Key);
    sign(payload: object, options?: JWT.SignOptions): Promise<string>;
}
