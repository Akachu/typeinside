import { ArticleDetail } from "./interface";
import { getResultData, get } from "../request";
import { API } from "../api";
import { parseArticleDetailData } from "./parse";

export async function detail(
  galleryId: string,
  index: number,
  appId: string
): Promise<ArticleDetail> {
  const options = {
    query: {
      no: index.toString(),
      id: galleryId,
      app_id: appId,
    },
  };

  const result = await get.withHash(API.ARTICLE.DETAIL, options);
  const data = getResultData(result);

  if (data) {
    const viewData = { ...data.view_info, ...data.view_main, galleryId };
    return parseArticleDetailData(viewData);
  } else {
    throw new Error("failed to get article detail data");
  }
}
