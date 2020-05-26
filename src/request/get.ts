import request from "./request";
import { RequestOptions, RequestMethod, RequestResult } from "./interface";
import { makeQueryString } from "../tool";
import { API } from "../api";

export function get(
  url: string,
  options: RequestOptions = {}
): Promise<RequestResult> {
  return request(RequestMethod.GET, url, {
    headers: options.headers,
    query: options.query,
  });
}

export namespace get {
  export async function withHash(
    url: string,
    options: RequestOptions = {}
  ): Promise<RequestResult> {
    let { query } = options;

    if (query) {
      url += `?${makeQueryString(query)}`;
    }

    let hash = Buffer.from(url).toString("base64");

    url = `${API.REDIRECT}?hash=${hash}`;

    let result = await get(url);

    return result;
  }
}
