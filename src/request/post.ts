import { HEADERS } from "../api";
import { makeQueryString } from "../tool";
import { request, RequestMethod } from "./request";

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
