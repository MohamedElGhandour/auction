export declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface AUTH_LOGIN {
  email: string;
  password: string;
}

export interface AUTH_REGISTER extends AUTH_LOGIN {
  name: string;
  type: "client" | "organization" | string;
}

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  json?: any;
}
