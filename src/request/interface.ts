import { Transform } from "stream";

export enum RequestMethod {
  GET = "GET",
  POST = "POST"
}

export interface RequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, string>;
  data?: string;
  isMultipart?: boolean;
}

export interface RequestResult {
  success: boolean;
  reason?: any;
  headers?: any;
  data?: any;
}

export interface ImageData {
  fileName: string;
  extension: string;
  data: Transform;
  size: number;
}