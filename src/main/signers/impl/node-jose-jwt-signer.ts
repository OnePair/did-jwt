
import { JwtSigner } from "../jwt-signer";
import { JWK } from "node-jose";

import JWT from "jsonwebtoken";

export class NodeJwtSigner implements JwtSigner {

  private key: JWK.Key;

  constructor(key: JWK.Key) {
    this.key = key;
  }

  sign(payload: object, options?: JWT.SignOptions): string {
    return JWT.sign(payload, this.key.toPEM(true), options);
  }
}
