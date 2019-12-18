import http from "http";
import https from "https";
import { parse as parseUrl } from "url";
import { HEADERS } from "../api";
import { makeQueryString } from "../tool";
import { get } from "./get";
import { RequestResult, RequestMethod, RequestOptions } from "./interface";

export default async function request(
  method: RequestMethod,
  url: string,
  options: RequestOptions = {},
  responseHandler?: (res: http.IncomingMessage) => void
): Promise<RequestResult> {
  let { headers, data, query } = options;
  if (!headers) headers = HEADERS.API;

  let requestOptions = {
    method,
    headers
  };

  let parsedUrl = parseUrl(url);
  let protocol = parsedUrl.protocol === "http:" ? http : https;

  if (query) url += `?${makeQueryString(query)}`;

  if (responseHandler) {
    let req = protocol.request(url, requestOptions, responseHandler);
    try {
      req.on("error", err => {
        throw err;
      });
    } catch (err) {
      return {
        success: false,
        reason: err
      };
    }
    req.end();
    return {
      success: true
    };
  } else {
    let res: http.IncomingMessage = await new Promise((resolve, reject) => {
      let req = protocol.request(url, requestOptions, resolve);

      if (data) req.write(data);

      req.on("error", reject);
      req.end();
    });

    const headers = res.headers;
    let responseData = "";

    res.on("data", chunk => {
      responseData += chunk;
    });

    await new Promise(resolve => res.on("end", resolve));

    if (res.statusCode === 302 && headers.location) {
      return get(headers.location);
    } else {
      let parsedData;

      try {
        parsedData = JSON.parse(responseData);
        if (parsedData[0] && parsedData[0].result === false) {
          return {
            success: false,
            headers,
            reason: parsedData[0].cause
          };
        }
        return {
          success: true,
          headers,
          data: parsedData
        };
      } catch (err) {
        return {
          success: true,
          headers,
          data: responseData
        };
      }
    }
  }
}

export function getResultData(rr: RequestResult) {
  if (rr.success && rr.data && rr.data[0]) {
    return rr.data[0];
  } else {
    return null;
  }
}
