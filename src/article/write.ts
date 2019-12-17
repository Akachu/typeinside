import { API } from "../api";
import { post } from "../request";
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
    client_token: form.clientToken || "N",
    subject: form.title
  };

  if (isGuest(form)) {
    data.name = form.name;
    data.password = form.password;
  } else if (isMember(form)) {
    data.user_id = form.userId;
  }

  data["memo_block[0]"] = form.body;

  let result = await post.multipart(API.ARTICLE.WRITE, data);
  if (result.success && result.data && result.data.cause) {
    return parseInt(result.data.cause);
  } else {
    throw new Error("failed to write article");
  }
}