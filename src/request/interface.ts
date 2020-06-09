export enum RequestMethod {
  GET = "GET",
  POST = "POST",
}

export interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  data?: string;
}

export interface RequestResult {
  success: boolean;
  reason?: any;
  headers?: any;
  data?: any;
}

