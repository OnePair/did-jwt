
import { JwtSigner } from "../jwt-signer";
import { JWK } from "node-jose";

import JWT from "jsonwebtoken";

export class NodeJwtSigner implements JwtSigner {

  private key: JWK.Key;
  private options: JWT.SignOptions;

  constructor(key: JWK.Key, options?: JWT.SignOptions) {
    this.key = key;
    this.options = options || {};
  }

  sign(payload: object): string {
    return JWT.sign(payload, this.key.toPEM(true), this.options);
  }
}
