import { Resolver } from "did-resolver";
import { JwtSigner } from "./signers";
export declare class DIDJwt {
    static sign(payload: object, signer: JwtSigner): string;
    static verify(resolver: Resolver, jwt: string, did: string): Promise<object>;
}
