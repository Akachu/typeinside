import { API } from "../api";
import { post } from "../request";

export async function write(
  appId: string,
  title: string,
  body: string,
  userId?: string
) {
  let data: any = {
    "app_id": appId,
    "mode": "write",
    "name": "test", //유동
    "password": "testpassword", //유동비번
    "id": "kancolle",
    "subject": title,
    "client_token": "N",
    content: "test",
    "memo_block[0]": body
  };

  if (userId) {
    // data.user_id = userId;
  } else {
    // data.name = "ㅇㅇ";
    // data.password = "superpassword";
  }

  return post.multipart(API.ARTICLE.WRITE, data);
}
