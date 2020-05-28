import { getAppId, search } from "../src";

searchArticle("고구마").then(console.log);

async function searchArticle(keyword: string) {
  const appId = await getAppId();
  return await search.all(keyword, appId);
}
