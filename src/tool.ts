export function makeQueryString(query: Record<string, string>) {
	let queryArr = [];
	for (let key in query) {
		queryArr.push(`${key}=${query[key]}`);
	}
	let queryString = queryArr.join("&");

	return queryString;
}
