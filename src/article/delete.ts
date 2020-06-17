import { ArticleDeleteForm } from "./interface";
import { GuestPassword, Member, isGuest, isMember } from "../interface";
import { post } from "../request";
import { API } from "../api";

async function del<T extends GuestPassword | Member>(
  form: ArticleDeleteForm & T,
  appId: string
) {
  const data: any = {
    app_id: appId,
    client_token: form.clientToken,
    id: form.galleryId,
    mode: "board_del",
    no: form.index,
  };

  if (isGuest(form)) {
    data.write_pw = form.password;
  } else if (isMember(form)) {
    data.user_id = form.userId;
  }

  const result = await post.multipart(API.ARTICLE.DELETE, data);

  if (!result.success) {
    if (result.reason) {
      throw new Error(result.reason);
    } else {
      throw new Error("Failed to delete article");
    }
  }
}

export { del as delete };
