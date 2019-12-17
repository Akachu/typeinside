import {
  Guest,
  Member,
  isGuest,
  isMember,
  ArticleDeleteForm
} from "./interface";
import { post } from "../request";
import { API } from "../api";

async function del<T extends Guest | Member>(
  appId: string,
  form: ArticleDeleteForm & T
) {
  let data: any = {
    client_token: form.clientToken || "N",
    id: form.galleryId,
    no: form.index,
    mode: "board_del",
    app_id: appId
  };

  if (isGuest(form)) {
    data.write_pw = form.password;
  } else if (isMember(form)) {
    data.user_id = form.userId;
  }

  let requset = await post.multipart(API.ARTICLE.DELETE, data);

  if (!requset.success) throw new Error("Failed to delete article");
}

export { del as delete };