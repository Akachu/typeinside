import { get } from "./request";
import { API, HEADERS } from "./api";

export namespace article {
  export async function list(
    galleryId: string,
    page: number = 1,
    appId: string
  ) {
    let data = await get.withHash(API.ARTICLE.LIST, {
      query: {
        app_id: appId,
        page: page.toString(),
        id: galleryId
      }
    });
    return data[0]["gall_list"];
  }

  export async function detail(galleryId: string, no: number, appId: string) {
    let data = await get.withHash(API.ARTICLE.IMAGE, {
      query: {
        app_id: appId,
        no: no.toString(),
        id: galleryId
      }
    });

    data.forEach((element: any) => {
      let url = element.img;
      if (!url) return;
      get(element.img, { headers: HEADERS.IMAGE });
    });
  }
}
