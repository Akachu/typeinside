import http from "http";
import https from "https";
import { parse as parseUrl } from "url";
import { HEADERS } from "./api";

export enum RequestMethod {
  GET = "GET",
  POST = "POST"
}

interface RequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, string>;
  data?: string;
  isMultipart?: boolean;
}

export function makeQueryString(query: Record<string, string>) {
  let queryArr = [];
  for (let key in query) {
    queryArr.push(`${key}=${query[key]}`);
  }
  let queryString = queryArr.join("&");

  return queryString;
}

function makeMultipartData(data: Record<string, string>) {
  let boundary = Math.random()
    .toFixed(4)
    .substr(2);

  let dataString = "";

  for (let key in data) {
    dataString += `--${boundary}\nContent-Disposition: form-data; name="${key}"\n\n${data[key]}\n`;
  }

  dataString += `--${boundary}--`;

  let contentType = `multipart/form-data; boundary=${boundary}`;

  return { dataString, contentType };
}

export async function request(
  method: RequestMethod,
  url: string,
  options: RequestOptions = {}
): Promise<any> {
  let { headers, data, query } = options;

  if (!headers) headers = HEADERS.API;

  let requestOptions = {
    method,
    headers
  };

  if (query) {
    let queryArr = [];
    for (let key in query) {
      queryArr.push(`${key}=${query[key]}`);
    }
    let queryString = queryArr.join("&");
    url += `?${queryString}`;
  }

  let protocol = parseUrl(url).protocol === "http:" ? http : https;

  return new Promise((resolve, reject) => {
    let request = protocol.request(url, requestOptions, response => {
      let responseData = "";

      response.on("data", chunk => {
        responseData += chunk;
      });

      response.on("end", () => {
        try {
          let parsedData = JSON.parse(responseData);
          resolve(parsedData);
        } catch (err) {
          reject(err);
        }
      });
    });

    if (data) request.write(data);

    request.on("error", reject);
    request.end();
  });
}

export function get(url: string, options: RequestOptions = {}): Promise<any> {
  return request(RequestMethod.GET, url, { headers: options.headers });
}

export function post(
  url: string,
  data: Record<string, string>,
  headers: Record<string, string> = HEADERS.API
): Promise<any> {
  const formData: string = makeQueryString(data);

  headers["Content-Length"] = Buffer.byteLength(formData).toString();

  const options = {
    headers: headers,
    data: formData
  };

  return request(RequestMethod.POST, url, options);
}

export namespace post {
  export function multipart(
    url: string,
    data: Record<string, string>,
    headers: Record<string, string> = HEADERS.API
  ): Promise<any> {
    const { dataString, contentType } = makeMultipartData(data);
    const formData = dataString;

    headers["Content-Type"] = contentType;

    const options = {
      headers: headers,
      data: formData
    };

    return request(RequestMethod.POST, url, options);
  }
}
