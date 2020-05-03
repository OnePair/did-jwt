import * as JWT from "jsonwebtoken";
export interface JwtSigner {
    sign(payload: object, options?: JWT.SignOptions): Promise<string>;
}
