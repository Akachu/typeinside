import { HEADERS, CONTENT_TYPE } from "../api";
import { makeQueryString } from "../tool";
import request from "./request";
import { RequestMethod, RequestResult } from "./interface";

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
    const { dataString, contentType } = makeMultipartData(data);
    const options = {
      headers: {
        ...headers,
        "Content-Type": contentType
      },
      data: dataString
    };

    return request(RequestMethod.POST, url, options);
  }
}
