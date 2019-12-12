import { RequestResult } from "./interface";
export declare function post(url: string, data: Record<string, string>, headers?: Record<string, string>): Promise<RequestResult>;
export declare namespace post {
    function multipart(url: string, data: Record<string, string>, headers?: Record<string, string>): Promise<RequestResult>;
}
