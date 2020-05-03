import { Resolver } from "did-resolver";
import { JwtSigner } from "./signers";
import * as JWT from "jsonwebtoken";
export declare class DIDJwt {
    static sign(payload: object, signer: JwtSigner, options?: JWT.SignOptions): Promise<string>;
    static verify(resolver: Resolver, jwt: string, did: string): Promise<object>;
}
