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
  const char =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const len = char.length;
	
	for (let i = 0; i < length; i++) {
    result += char.charAt(Math.floor(Math.random() * len));
	}
	
  return result;
}
