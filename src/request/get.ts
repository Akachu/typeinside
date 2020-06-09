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
    let { query } = options;

    if (query) {
      url += `?${makeQueryString(query)}`;
    }

    let hash = atob(url);

    url = `${API.REDIRECT}?hash=${hash}`;

    let result = await get(url);

    return result;
  }
}
