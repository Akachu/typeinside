import fs from "fs";
import http from "http";
import https from "https";
import { parse as parseUrl } from "url";
import { HEADERS, API } from "./api";
import { Transform } from "stream";

enum RequestMethod {
  GET = "GET",
  POST = "POST"
}

interface RequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, string>;
  data?: string;
  isMultipart?: boolean;
}

interface ImageData {
  fileName: string;
  extension: string;
  data?: any;
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
  options: RequestOptions = {},
  responseHandler?: (res: http.IncomingMessage) => void
): Promise<any> {
  let { headers, data, query } = options;

  if (!headers) headers = HEADERS.API;

  let requestOptions = {
    method,
    headers
  };

  if (query) url += `?${makeQueryString(query)}`;

  let protocol = parseUrl(url).protocol === "http:" ? http : https;

  if (responseHandler) {
    let req = protocol.request(url, requestOptions, responseHandler);
    req.on("error", err => {
      Promise.reject(err);
    });
    req.end();
    return Promise.resolve(true);
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

    if (res.statusCode === 302 || headers.location) {
      return get(headers.location!);
    } else {
      return JSON.parse(responseData);
    }
  }
}

export function get(url: string, options: RequestOptions = {}): Promise<any> {
  return request(RequestMethod.GET, url, {
    headers: options.headers,
    query: options.query
  });
}

export namespace get {
  export function withHash(
    url: string,
    options: RequestOptions = {}
  ): Promise<any> {
    let { query } = options;

    if (query) url += `?${makeQueryString(query)}`;

    let hash = Buffer.from(url).toString("base64");

    url = `${API.REDIRECT}?hash=${hash}`;

    return get(url);
  }

  // function imageHandler(res: http.IncomingMessage) {}

  export async function image(
    url: string,
    savePath?: string
  ): Promise<ImageData> {
    let imageStream: Transform = new Transform();
    let fileName: string;
    let extension: string;

    let options = {
      headers: HEADERS.IMAGE
    };

    let res: http.IncomingMessage = await new Promise(resolve =>
      request(RequestMethod.GET, url, options, resolve)
    );

    let headers = res.headers;

    let disposition = headers["content-disposition"];
    let contentType = headers["content-type"];

    fileName = disposition!.split("filename=")[1];
    extension = contentType!.split("image/")[1];
    let imageData: ImageData = {
      fileName,
      extension
    };
    res.on("data", chunk => imageStream.push(chunk));

    if (savePath) {
      let writeStream = fs.createWriteStream(
        `${savePath}/${fileName}.${extension}`
      );
      writeStream.pipe(imageStream);
      await new Promise(resolve => writeStream.on("close", resolve));
    } else {
      await new Promise(resolve => res.on("end", resolve));
      imageData.data = imageStream.read();
    }

    return imageData;
  }
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
