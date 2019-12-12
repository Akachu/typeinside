import { ArticleDetail } from "./interface";
import { getResultData, get } from "../request";
import { API } from "../api";
import { parseArticleDetailData } from "./parse";

export async function detail(
  galleryId: string,
  appId: string,
  index: number
): Promise<ArticleDetail | null> {
  let options = {
    query: {
      no: index.toString(),
      id: galleryId,
      app_id: appId
    }
  };

  let result = await get.withHash(API.ARTICLE.DETAIL, options);
  let data = getResultData(result);

  if (data) {
    let viewData = { ...data.view_info, ...data.view_main };
    return parseArticleDetailData(viewData);
  } else {
    return null;
  }
}
