import getAppId from "./token";
import article, { list } from "./article";

async function test2(id: string) {
  let now: number;
  let appId = await getAppId();

  let downloaded = 0;

  setInterval(() => {
    article.lastIndex(id, appId!).then(async last => {
      if (!last) {
        return;
      } else if (!now) {
        now = last;
      } else if (last > now) {
        // console.log(id, now, '->', last, 'new:', last - now);
        let from = now;
        now = last;
        for (let i = from + 1; i <= last; i++) {
          article.image(id, i, appId!);
          downloaded++;
          console.log(id, i, 'dl:', downloaded);
          await delay(100);
        }
      }
    });
  }, 500);
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
