export interface Error {
  field: string;
  msg: string;
}

export interface CheckoutResponse {
  msg?: string;
  errors?: Array<Error>;
}
