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

module.exports = Typeinside;


/*
(async () => {
  let appId = await getAppId();
  // let userId = loginResult.userInfo!.userId;
  // console.log(userId);
  setTimeout(async () => {
    let wrr = await article.write(appId!, "api테스트", "집가고싶다");
    console.log(wrr);

    setTimeout(async () => {
      let wrr = await article.write(appId!, "api테스트2", "집가고싶다");
      console.log(wrr);
    }, 6000);
  }, 6000);
})();
*/