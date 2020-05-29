import { RequestResult, RequestOptions } from "./interface";
import { getClient } from "./client";
export default async function request(
  url: string,
  options: RequestOptions = {}
): Promise<RequestResult> {
  const req = getClient();
  const { data, headers, statusCode } = await req(url, options);

  if (statusCode === 302 && headers.location) {
    return request(headers.location);
  }

  try {
    const parsedData = JSON.parse(data);
    if (parsedData[0] && parsedData[0].result === false) {
      return {
        success: false,
        headers,
        reason: parsedData[0].cause,
      };
    }
    return {
      success: true,
      headers,
      data: parsedData,
    };
  } catch (err) {
    return {
      success: true,
      headers,
      data: data,
    };
  }
}

export function getResultData(rr: RequestResult) {
  if (rr.success && rr.data && rr.data[0]) {
    return rr.data[0];
  } else {
    return null;
  }
}
