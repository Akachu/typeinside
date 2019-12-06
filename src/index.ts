import { article } from "./article";
import getAppId from "./token";

async function test(id: string) {
  let now = 0;
  let appId = await getAppId();

  setInterval(() => {
    article.list(id, 1, appId!).then(list => {
      if (!list) return;
      let last = list[0].no;
      if (last > now) {
        now = last;
        console.log(id, now, list[0].subject);
        article.detail(id, now, appId!);
      }
    });
  }, 500);
}

// test('cat');
