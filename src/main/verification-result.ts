export class VerificationResult {
  issuer: string;
  payload: object;
  jwt: string;
  issuerDomainName?: string;
  certificate?: string;
}
