import { makeQueryString } from "../tool";
import { RequestOptions } from "./interface";
import { HEADERS } from "../api";

export async function xhr(url: string, options: RequestOptions) {
  const { method, data, query } = options;

  const headers = options.headers || HEADERS.API;

  const req = new XMLHttpRequest();
  if (query) url += `?${makeQueryString(query)}`;

  const responseData: string = await new Promise((resolve, reject) => {
    req.onreadystatechange = () => {
      if (req.readyState !== 4) return;

      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(req.statusText);
      }
    };

    req.open(method || "GET", url, true);

    if (headers) {
      Object.keys(headers).forEach((key) => {
        req.setRequestHeader(key, headers[key]);
      });
    }

    req.send(data);
  });

  const rawHeaders = req.getAllResponseHeaders();
  const headerArr = rawHeaders.trim().split(/[\r\n]+/);

  const responseHeaders: Record<string, string> = {};
  headerArr.forEach((line) => {
    const parts = line.split(": ");
    const header = parts.shift();
    const value = parts.join(": ");
    responseHeaders[header!] = value;
  });

  return {
    statusCode: req.status,
    statusMessage: req.statusText,
    headers: responseHeaders,
    data: responseData,
  };
}
