import { API } from "../api";
import { get } from "../request";

export interface ImageUrl {
  full: string;
  resized: string;
}

export async function image(
  galleryId: string,
  appId: string,
  index: number
): Promise<Array<ImageUrl>> {
  let options = {
    query: {
      no: index.toString(),
      id: galleryId,
      app_id: appId
    }
  };

  let result = await get.withHash(API.ARTICLE.IMAGE, options);

  if (result.success && result.data) {
    let data = result.data;

    return data.map((item: any) => ({
      full: item.img,
      resized: item.img_clone
    }));
  } else if (result.success) {
    return [];
  } else {
    throw new Error("failed to get article image urls");
  }
}
