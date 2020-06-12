export function makeQueryString(query: Record<string, string>) {
  let queryArr = [];
  for (let key in query) {
    queryArr.push(`${key}=${query[key]}`);
  }
  let queryString = queryArr.join("&");

  return queryString;
}

export function makeRandomString(length: number = 8) {
  let result = "";
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const len = char.length;

  for (let i = 0; i < length; i++) {
    result += char.charAt(Math.floor(Math.random() * len));
  }

  return result;
}

export function getByteSize(text: string) {
  let length = -1;

  if (typeof TextEncoder !== "undefined") {
    length = new TextEncoder().encode(text).length;
  } else if (typeof Blob !== "undefined") {
    length = new Blob([text]).size;
  } else if (typeof Buffer !== "undefined") {
    length = Buffer.byteLength(text, "utf8");
  } else {
    throw new Error("cant get text byte");
  }

  return length;
}
