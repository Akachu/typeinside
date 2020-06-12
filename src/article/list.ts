import { get, getResultData, RequestOptions } from "../request";
import { API } from "../api";
import { parseArticleData } from "./parse";
import { ArticleListOption } from "./interface";

export async function list(
  galleryId: string,
  appId: string,
  options: ArticleListOption = {}
) {
  const { page, search } = options;

  const requestOption: RequestOptions = {
    query: {
      page: (page || 1).toString(),
      id: galleryId,
      app_id: appId,
    },
  };

  if (search) {
    const { type, keyword } = search;
    requestOption.query = {
      ...requestOption.query,
      s_type: type,
      serVal: keyword || "",
    };
  }

  const result = await get.withHash(API.ARTICLE.LIST, requestOption);
  const data = getResultData(result);
  if (data) {
    const gallList: any[] = data.gall_list;
    return gallList.map((article) => {
      article.galleryId = galleryId;
      return parseArticleData(article);
    });
  } else {
    throw new Error("failed to get article data");
  }
}

export async function lastIndex(galleryId: string, appId: string) {
  let articleList = await list(galleryId, appId);
  if (!articleList) throw new Error("failed to get gallery info");
  return articleList[0].index;
}
