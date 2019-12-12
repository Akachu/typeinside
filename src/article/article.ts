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
    let gallList: Array<any> = data.gall_list;
    return gallList.map(d => parseArticleData(d));
  } else {
    return null;
  }
}

export async function lastIndex(galleryId: string, appId: string) {
  let articleList = await list(galleryId, appId, 1);
  if (!articleList) return null;
  return articleList[0].index;
}
