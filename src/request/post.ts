import { HEADERS, CONTENT_TYPE } from "../api";
import { makeQueryString } from "../tool";
import request from "./request";
import { RequestMethod, RequestResult } from "./interface";
import { parse as parseUrl } from "url";

function makeMultipartData(data: Record<string, string>) {
  let boundary = Math.random()
    .toFixed(12)
    .substr(2);

  let dataString = "";

  for (let key in data) {
    let value = data[key].toString();
    if (key.match(/memo_block\[\d+\]/) || key === "subject") {
      value = encodeURIComponent(value);
      value = value.replace(/%20/g, "+");
    } else {
      value = encodeURI(value);
    }

    let length = Buffer.from(value).byteLength;
    dataString +=
      `--${boundary}\n` +
      `Content-Disposition: form-data; name="${key}"\n` +
      `Content-Length: ${length}\n` +
      `\n${value}\n`;
  }

  dataString += `--${boundary}--`;
  
  let contentType = `multipart/form-data; boundary=${boundary}`;
  let contentLength = Buffer.from(dataString).byteLength;
  let multipartHeaders = {
    "Content-Type": contentType,
    "Content-Length": contentLength.toString()
  };

  return { dataString, multipartHeaders };
}

export function post(
  url: string,
  data: Record<string, string>,
  headers: Record<string, string> = HEADERS.API
): Promise<RequestResult> {
  const formData: string = makeQueryString(data);

  const options = {
    headers: {
      ...headers,
      "Content-Type": CONTENT_TYPE.DEFAULT,
      "Content-Length": Buffer.byteLength(formData).toString()
    },
    data: formData
  };

  return request(RequestMethod.POST, url, options);
}

export namespace post {
  export function multipart(
    url: string,
    data: Record<string, string>,
    headers: Record<string, string> = HEADERS.API
  ): Promise<RequestResult> {
    const { dataString, multipartHeaders } = makeMultipartData(data);
    const options = {
      headers: {
        ...headers,
        ...multipartHeaders,
        Host: parseUrl(url).host!
      },
      data: dataString
    };

    return request(RequestMethod.POST, url, options);
  }
}
