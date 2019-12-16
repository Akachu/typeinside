import * as article from "./article";
import * as request from "./request";
import { login } from "./auth";
import { getAppId } from "./token";

const Typeinside = {
  article,
  request,
  login,
  getAppId
};
// 
module.exports = Typeinside;

// const test = async () => {
//   let appId = await getAppId();
//   // let userId = loginResult.userInfo!.userId;
//   // console.log(userId);
//   // let b = await article.list("aoegame", appId!);
//   setTimeout(async () => {
//     let wrr = await article.write(appId!, "oo", "oo");
//     console.log(wrr);

//   }, 11000);
// };

// test();