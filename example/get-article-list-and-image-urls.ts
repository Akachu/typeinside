import { DC, getAppId, article } from "../src";

getImgUrls("cat").then(console.log);
getImgUrls2("dog").then(console.log);

async function getImgUrls(gallery: string) {
  const dc = new DC();

  const articles = await dc.getArticleList(gallery);
  const articleImgIds = articles
    .filter((article) => article.hasImg)
    .map((article) => article.index);

  let imgUrls: string[] = [];

  for (let id of articleImgIds) {
    const articleImgUrls = await dc.getArticleImage(gallery, id);
    imgUrls = [...imgUrls, ...articleImgUrls.map((url) => url.full)];
  }

  return imgUrls;
}

async function getImgUrls2(gallery: string) {
  const appId = await getAppId();

  const articles = await article.list(gallery, appId);
  const articleImgIds = articles
    .filter((article) => article.hasImg)
    .map((article) => article.index);

  let imgUrls: string[] = [];

  for (let id of articleImgIds) {
    const articleImgUrls = await article.image(gallery, id, appId);
    imgUrls = [...imgUrls, ...articleImgUrls.map((url) => url.full)];
  }

  return imgUrls;
}
