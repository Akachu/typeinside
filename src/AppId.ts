import crypto from "crypto";
import { get, post } from "./request";
import { API } from "./api";

async function getDate() {
	let res = await get(API.APP_CHECK);

	if (!res || !res[0] || !res[0].date) {
		console.error("can't get date");
		return null;
	} else {
		let date: string = res[0].date;
		return date;
	}
}

async function getValueToken() {
	const date = await getDate();

	if (!date) {
		console.log("failed to generate value token");
		return null;
	}

	const food = "dcArdchk_" + date;

	const hash = crypto
		.createHash("sha256")
		.update(Buffer.from(food, "ascii"))
		.digest("hex");

	return hash;
}

export async function getAppId() {
	const valueToken = await getValueToken();
	if (!valueToken) {
		console.log("failed to get token");
		return null;
	}

	const data = {
		value_token: valueToken,
		signature: "ReOo4u96nnv8Njd7707KpYiIVYQ3FlcKHDJE046Pg6s=",
		pkg: "com.dcinside.app"
	};

	let res;

	try {
		res = await post.multipart(API.APP_KEY_VERIFICATION, data);

		if (!res || !res[0] || !res[0].app_id) {
			return null;
		} else {
			let appId: string = res[0].app_id;
			return appId;
		}
	} catch (err) {
		console.error(err);
		console.log("failed to get token");
		return null;
	}
}

// export default class AppId {
// 	private static _session: AppId;

// 	public static get session(): AppId {
// 		if (!AppId._session) {
// 			AppId._session = new AppId();
// 		}

// 		return AppId._session;
// 	}

// 	_value: string | undefined;

// 	public async value() {
// 		if (!this._value) {
// 			await this.getNewAppId();
// 		}
// 		return this._value;
// 	}

// 	public async getNewAppId() {
// 		let _appId = await getAppId();
// 		if (!_appId) return null;

// 		this._value = _appId;
// 	}
// }
