import request from "./request";
import { RequestOptions, RequestResult } from "./interface";
import { makeQueryString } from "../tool";
import { API } from "../api";

export function get(
  url: string,
  options?: RequestOptions
): Promise<RequestResult> {
  return request(url, options);
}

export namespace get {
  export async function withHash(
    url: string,
    options: RequestOptions
  ): Promise<RequestResult> {
    const { query } = options;

    if (query) {
      url += `?${makeQueryString(query)}`;
    }

    const hash = Buffer.from(url).toString("base64");

    url = `${API.REDIRECT}?hash=${hash}`;

    const result = await get(url);

    return result;
  }
}
