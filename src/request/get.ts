import { request, RequestOptions, RequestMethod } from "./request";
import { makeQueryString } from "../tool";
import AppId from "../AppId";
import { API } from "../api";

export function get(url: string, options: RequestOptions = {}): Promise<any> {
	return request(RequestMethod.GET, url, {
		headers: options.headers,
		query: options.query
	});
}

export namespace get {
	export async function withHash(
		url: string,
		options: RequestOptions = {}
	): Promise<any> {
		let { query } = options;

		if (query) {
			let appId = await AppId.session.value();
			if (!appId) return null;

			query.app_id = appId;
			url += `?${makeQueryString(query)}`;
		}

		let hash = Buffer.from(url).toString("base64");

		url = `${API.REDIRECT}?hash=${hash}`;

		let data = await get(url);

		if (data && data[0] && data[0].cause === "bad") {
			await AppId.session.getNewAppId();

			return await withHash(url, options);
		}

		return data;
	}
}
