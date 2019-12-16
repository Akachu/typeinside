import { API } from "../api";
import { post } from "../request";

interface articleWriteForm {
  // gallery
}

export async function write(
  appId: string,
  title: string,
  body: string,
  userId?: string
) {
  let data: any = {
    "id": "kancolle",
    "app_id": appId,
    "mode": "write",
    // "client_token": "vPW1USVeVvCK2cX1rULUS4I0KYDGtbwPjCeirZtqrsX_7gLrVlx4wNIPsiF4EDREDEfDNEtSQSv71YHDjev2vL4bp9SinNi-j3AK4V8B1sB9NqznqTC",
    "subject": title,
    "name": "oo", //유동
    "password": "oo", //유동비번
    "memo_block[0]": body
  };
  // let awa = "http://upload.dcinside.com/_app_write_api.php";
  return post.multipart(API.ARTICLE.WRITE, data);
}
