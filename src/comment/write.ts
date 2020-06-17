import { API } from "../api";
import { CommentWriteForm } from "./interface";
import { Guest, Member, isGuest, isMember } from "../interface";
import { post } from "../request";

export async function write<T extends Guest | Member>(
  form: CommentWriteForm & T,
  appId: string
) {
  const { articleId, gallery, body, clientToken } = form;
  const data: Record<string, string> = {
    app_id: appId,
    id: gallery,
    no: articleId.toString(),
    comment_memo: body,
    client_token: clientToken,
    mode: "com_write",
  };

  if (isGuest(form)) {
    data.comment_nick = form.name;
    data.comment_pw = form.password;
  } else if (isMember(form)) {
    data.user_id = form.userId;
  }

  await post.multipart(API.COMMENT.WRITE, data);
}
