import crypto from "crypto";
import { get, post, getResultData } from "../request";
import { API, SIGNATURE } from "../api";
import { makeRandomString as rs } from "../tool";

export function getRandomClientToken() {
  return `${rs(11)}:${rs(139)}`;
}

async function getDate() {
  let result = await get(API.APP.CHECK);
  let data = getResultData(result);

  if (data) {
    let date: string = data.date;
    return date;
  } else {
    throw new Error("can't get date");
  }
}

async function getValueToken() {
  const date = await getDate();

  if (!date) {
    throw new Error("failed to generate value token");
  }

  const food = "dcArdchk_" + date;

  const hash = crypto
    .createHash("sha256")
    .update(Buffer.from(food, "ascii"))
    .digest("hex");

  return hash;
}

/**
 * 일부 요청시에 사용되는 appId를 발급 받습니다
 *
 * 발급된 appId는 12시간 뒤 만료 됩니다
 *
 * @export
 * @returns appId
 */
export async function getAppId(clientToken?: string) {
  const valueToken = await getValueToken();
  if (!valueToken) {
    throw new Error("failed to get token");
  }

  if (!clientToken) clientToken = getRandomClientToken();

  const formData = {
    client_token: clientToken,
    value_token: valueToken,
    signature: SIGNATURE
  };

  try {
    let result = await post.multipart(API.APP.KEY_VERIFICATION, formData);
    let data = getResultData(result);

    if (data) {
      let appId: string = data.app_id;
      return appId;
    } else {
      throw new Error("failed to verify token");
    }
  } catch (err) {
    throw err;
  }
}
