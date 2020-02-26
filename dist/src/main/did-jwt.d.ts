import { JWK } from "node-jose";
import JWT from "jsonwebtoken";
import { Resolver } from "did-resolver";
export declare class DIDJwt {
    static sign(payload: object, key: JWK.Key, options?: JWT.SignOptions): string;
    static verify(resolver: Resolver, jwt: string, did: string): Promise<object>;
}
