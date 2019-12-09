import http from "http";
import https from "https";
import { parse as parseUrl } from "url";
import { HEADERS } from "../api";
import { makeQueryString } from "../tool";
import { get } from "./get";

export enum RequestMethod {
	GET = "GET",
	POST = "POST"
}

export interface RequestOptions {
	headers?: Record<string, string>;
	query?: Record<string, string>;
	data?: string;
	isMultipart?: boolean;
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
			return Promise.reject(err);
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

		if (res.statusCode === 302 && headers.location) {
			return get(headers.location);
		} else {
			return JSON.parse(responseData);
		}
	}
}
