import { API } from "../api";
import { post, getResultData } from "../request";
import {
  Guest,
  Member,
  ArticleWriteForm,
  isGuest,
  isMember
} from "./interface";

export async function write<T extends Guest | Member>(
  appId: string,
  form: ArticleWriteForm & T
): Promise<number> {
  let data: any = {
    id: form.galleryId,
    app_id: appId,
    mode: "write",
    client_token: form.clientToken,
    subject: form.title
  };

  if (isGuest(form)) {
    data.name = form.name;
    data.password = form.password;
  } else if (isMember(form)) {
    data.user_id = form.userId;
  }
  let bodyList = form.body.split("\n");

  for (let i = 0; i < bodyList.length; i++) {
    data[`memo_block[${i}]`] = `<div>${bodyList[i]} </div>`;
  }

  let result = await post.multipart(API.ARTICLE.WRITE, data);
  let resultData = getResultData(result);

  if (resultData) {
    return parseInt(resultData.cause);
  } else if (result.reason) {
    throw new Error(result.reason);
  } else {
    throw new Error("failed to write article");
  }
}
