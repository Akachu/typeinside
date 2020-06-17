import http, { IncomingMessage } from "http";
import https from "https";
import { makeQueryString } from "../tool";
import { parse as parseUrl } from "url";
import { RequestOptions } from "./interface";
import { HEADERS } from "../api";
import { Transform } from "stream";

async function request(url: string, options: RequestOptions) {
  const { method, data, headers, query } = options;
  const parsedUrl = parseUrl(url);
  const protocol = parsedUrl.protocol === "http:" ? http : https;
  if (query) url += `?${makeQueryString(query)}`;

  const requestOptions: http.RequestOptions = {
    method,
    headers: headers || HEADERS.API,
  };

  const res: IncomingMessage = await new Promise((resolve, reject) => {
    const req = protocol.request(url, requestOptions, resolve);
    if (data) req.write(data);

    req.on("error", reject);
    req.end();
  });

  return {
    headers: res.headers,
    res,
  };
}

export async function httpRequest(url: string, options: RequestOptions) {
  const { headers, res } = await request(url, options);
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  await new Promise((resolve) => res.on("end", resolve));

  return {
    statusCode: res.statusCode!,
    statusMessage: res.statusMessage!,
    headers,
    data,
  };
}

export async function streamRequset(url: string, options: RequestOptions) {
  const { headers, res } = await request(url, options);

  const stream: Transform = new Transform();

  res.on("data", (chunk) => stream.push(chunk));
  res.on("end", () => stream.end());

  return {
    statusCode: res.statusCode,
    statusMessage: res.statusMessage,
    headers,
    stream,
  };
}
