import { API } from "../api";
import { post, getResultData } from "../request";
import {
  Guest,
  Member,
  ArticleWriteForm,
  isGuest,
  isMember,
} from "./interface";

export async function write<T extends Guest | Member>(
  form: ArticleWriteForm & T,
  appId: string
): Promise<number> {
  const data: any = {
    id: form.galleryId,
    app_id: appId,
    mode: "write",
    client_token: form.clientToken,
    subject: form.title,
  };

  if (isGuest(form)) {
    data.name = form.name;
    data.password = form.password;
  } else if (isMember(form)) {
    data.user_id = form.userId;
  }
  const bodyList = form.body.split("\n");

  for (let i = 0; i < bodyList.length; i++) {
    data[`memo_block[${i}]`] = `<div>${bodyList[i]} </div>`;
  }

  const result = await post.multipart(API.ARTICLE.WRITE, data);
  const resultData = getResultData(result);

  if (resultData) {
    return parseInt(resultData.cause);
  } else if (result.reason) {
    throw new Error(result.reason);
  } else {
    throw new Error("failed to write article");
  }
}
