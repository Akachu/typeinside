/// <reference types="node" />
import http from "http";
import { RequestResult, RequestMethod, RequestOptions } from "./interface";
export default function request(method: RequestMethod, url: string, options?: RequestOptions, responseHandler?: (res: http.IncomingMessage) => void): Promise<RequestResult>;
export declare function getResultData(rr: RequestResult): any;
