import { RequestOptions } from "../interface";

type headers = Record<string, string>;

export type requestClient = (
  url: string,
  options: RequestOptions
) => Promise<{
  statusCode: number;
  statusMessage?: string;
  headers: headers;
  data: string;
}>;
