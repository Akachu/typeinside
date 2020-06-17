import { API } from "../api";
import { isGuest, isMember, GuestPassword, Member } from "../interface";
import { CommentDeleteForm } from "./interface";
import { post } from "../request";

async function del<T extends GuestPassword | Member>(
  form: CommentDeleteForm & T,
  appId: string
) {
  const { articleId, gallery, index } = form;
  const data: Record<string, string> = {
    app_id: appId,
    id: gallery,
    no: articleId,
    mode: "comment_del",
    comment_no: index,
  };

  if (isGuest(form)) {
    data.comment_pw = form.password;
  } else if (isMember(form)) {
    data.user_id = form.userId;
  }

  await post.multipart(API.COMMENT.DELETE, data);
}

export { del as delete };
