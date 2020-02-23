import { JWT, JWK } from "jose";
import { Resolver } from "did-resolver";
export declare class DIDJwt {
    static sign(payload: object, key: JWK.Key, options?: JWT.SignOptions): string;
    static verify(resolver: Resolver, jwt: string, did: string): Promise<object>;
}
