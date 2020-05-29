import { RequestOptions } from "../interface";
import { makeQueryString } from "../../tool";

export async function xhrRequest(url: string, options: RequestOptions) {
  const { method, data, headers, query } = options;
  const req = new XMLHttpRequest();
  if (query) url += `?${makeQueryString(query)}`;

  if (headers) {
    Object.keys(headers).forEach((key) => {
      req.setRequestHeader(key, headers[key]);
    });
  }

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
