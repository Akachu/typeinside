/// <reference types="node" />
import http from "http";
export declare enum RequestMethod {
    GET = "GET",
    POST = "POST"
}
export interface RequestOptions {
    headers?: Record<string, string>;
    query?: Record<string, string>;
    data?: string;
    isMultipart?: boolean;
}
export declare function request(method: RequestMethod, url: string, options?: RequestOptions, responseHandler?: (res: http.IncomingMessage) => void): Promise<any>;
