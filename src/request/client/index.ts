import { requestClient } from "./interface";

/**
 * 환경별 리퀘스트 클라이언트
 * 
 * from axios
 */
export function getClient(): requestClient {
  let client;
  if (typeof XMLHttpRequest !== "undefined") {
    client = require("./xhr").xhr;
  } else if (
    typeof process !== "undefined" &&
    Object.prototype.toString.call(process) === "[object process]"
  ) {
    client = require("./http").httpRequest;
  }
  return client;
}
