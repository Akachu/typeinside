import { HEADERS, CONTENT_TYPE } from "../api";
import { makeQueryString, getByteSize } from "../tool";
import request from "./request";
import { RequestMethod, RequestResult, RequestOptions } from "./interface";

function makeMultipartData(data: Record<string, string>) {
  const boundary = Math.random().toFixed(12).substr(2);

  let dataString = "";

  for (let key in data) {
    let value = data[key].toString();
    if (key.match(/memo_block\[\d+\]/) || key === "subject") {
      value = encodeURIComponent(value);
      value = value.replace(/%20/g, "+");
    } else {
      value = encodeURI(value);
    }

    dataString +=
      `--${boundary}\n` +
      `Content-Disposition: form-data; name="${key}"\n` +
      `Content-Length: ${getByteSize(value)}\n` +
      `\n${value}\n`;
  }

  dataString += `--${boundary}--`;

  const contentType = `multipart/form-data; boundary=${boundary}`;
  const contentLength = getByteSize(dataString);

  const multipartHeaders = {
    "Content-Type": contentType,
    "Content-Length": contentLength.toString(),
  };

  return { dataString, multipartHeaders };
}

export function post(
  url: string,
  data: Record<string, string>,
  headers: Record<string, string> = HEADERS.API
): Promise<RequestResult> {
  const formData: string = makeQueryString(data);

  const options: RequestOptions = {
    method: RequestMethod.POST,
    headers: {
      ...headers,
      "Content-Type": CONTENT_TYPE.DEFAULT,
      "Content-Length": getByteSize(formData).toString(),
    },
    data: formData,
  };

  return request(url, options);
}

export namespace post {
  export function multipart(
    url: string,
    data: Record<string, string>,
    headers: Record<string, string> = HEADERS.API
  ): Promise<RequestResult> {
    const { dataString, multipartHeaders } = makeMultipartData(data);
    const options = {
      method: RequestMethod.POST,
      headers: {
        ...headers,
        ...multipartHeaders,
      },
      data: dataString,
    };

    return request(url, options);
  }
}
