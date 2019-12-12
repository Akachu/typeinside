import { RequestOptions, RequestResult } from "./interface";
export declare function get(url: string, options?: RequestOptions): Promise<RequestResult>;
export declare namespace get {
    function withHash(url: string, options?: RequestOptions): Promise<RequestResult>;
}
