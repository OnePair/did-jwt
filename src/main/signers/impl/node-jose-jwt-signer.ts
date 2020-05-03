
import { JwtSigner } from "../jwt-signer";
import { JWK } from "node-jose";

import JWT from "jsonwebtoken";

export class NodeJwtSigner implements JwtSigner {

  private key: JWK.Key;

  constructor(key: JWK.Key) {
    this.key = key;
  }

  public async sign(payload: object, options?: JWT.SignOptions): Promise<string> {
    return JWT.sign(payload, this.key.toPEM(true), options);
  }
}
