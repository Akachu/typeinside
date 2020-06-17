import { post } from "../request";
import { API } from "../api";

export async function recommend(
  gallery: string,
  index: number,
  appId: string
) {
  const form = {
    app_id: appId,
    id: gallery,
    no: index.toString(),
  };

  await post(API.ARTICLE.RECOMMEND, form);
}

export async function unrecommend(
  gallery: string,
  index: number,
  appId: string
) {
  const form = {
    app_id: appId,
    id: gallery,
    no: index.toString(),
  };

  await post(API.ARTICLE.UNRECOMMEND, form);
}
