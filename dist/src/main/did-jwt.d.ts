import { Resolver } from "did-resolver";
import { JwtSigner } from "./signers";
import { pki } from "node-forge";
import * as JWT from "jsonwebtoken";
export declare class DIDJwt {
    static sign(payload: object, signer: JwtSigner, options?: JWT.SignOptions): Promise<string>;
    static verify(resolver: Resolver, jwt: string): Promise<object>;
    static verify(resolver: Resolver, jwt: string, caStore?: pki.CAStore): Promise<object>;
}
