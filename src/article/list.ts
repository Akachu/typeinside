import { get, getResultData } from "../request";
import { API } from "../api";
import { parseArticleData } from "./parse";

export async function list(galleryId: string, appId: string, page = 1) {
  let options = {
    query: {
      page: page.toString(),
      id: galleryId,
      app_id: appId
    }
  };

  let result = await get.withHash(API.ARTICLE.LIST, options);
  let data = getResultData(result);
  if (data) {
    let gallList: any[] = data.gall_list;
    return gallList.map(article => {
      article.galleryId = galleryId;
      return parseArticleData(article);
    });
  } else {
    throw new Error("failed to get article data");
  }
}

export async function lastIndex(galleryId: string, appId: string) {
  let articleList = await list(galleryId, appId, 1);
  if (!articleList) throw new Error("failed to get gallery info");
  return articleList[0].index;
}
