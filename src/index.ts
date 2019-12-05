import { article } from "./article";
import getAppId from "./token";

async function test(id: string) {
  let no = 0;
  let appId = await getAppId();

  setInterval(() => {
    article.list(id, 1, appId!).then(list => {
      if (!list) return;
      let newest = list[0].no;
      if (newest > no) {
				no = newest;
        console.log(id, no, list[0].subject);
        article.detail(id, no, appId!);
      }
    });
  }, 500);
}
