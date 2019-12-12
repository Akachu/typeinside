import crypto from "crypto";
import { get, post, getResultData } from "./request";
import { API } from "./api";

async function getDate() {
  let result = await get(API.APP.CHECK);
  let data = getResultData(result);

  if (data) {
    let date: string = data.date;
    return date;
  } else {
    console.error("can't get date");
    return null;
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

  const formData = {
    value_token: valueToken,
    signature: "ReOo4u96nnv8Njd7707KpYiIVYQ3FlcKHDJE046Pg6s=",
    pkg: "com.dcinside.app"
  };

  try {
    let result = await post.multipart(API.APP.KEY_VERIFICATION, formData);
    let data = getResultData(result);

    if (data) {
      let appId: string = data.app_id;
      return appId;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    console.log("failed to get token");
    return null;
  }
}