import { API } from "../api";
import { get } from "../request";
import { ImageUrl } from "./interface";

export async function image(
  galleryId: string,
  index: number,
  appId: string
): Promise<ImageUrl[]> {
  const options = {
    query: {
      no: index.toString(),
      id: galleryId,
      app_id: appId,
    },
  };

  const result = await get.withHash(API.ARTICLE.IMAGE, options);

  if (result.success && result.data) {
    const data = result.data;

    return data.map((item: any) => ({
      full: item.img,
      resized: item.img_clone,
    }));
  } else if (result.success) {
    return [];
  } else {
    throw new Error("failed to get article image urls");
  }
}
