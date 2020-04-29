import JWT from "jsonwebtoken";
export interface JwtSigner {
    sign(payload: object, options?: JWT.SignOptions): string;
}