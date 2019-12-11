import { RequestOptions } from "./request";
export declare function get(url: string, options?: RequestOptions): Promise<any>;
export declare namespace get {
    function withHash(url: string, options?: RequestOptions): Promise<any>;
}
