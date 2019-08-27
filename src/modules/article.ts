import request from "./request";
import qs from "querystring";

interface galleryInfo {
  title: string;
  category?: string;
  related?: Array<string>;
}

const getGalleryInfoFromRawData = (data: any): galleryInfo => {
  let { gall_title, category, relation_gall } = data;
  return {
    title: gall_title,
    category,
    related: relation_gall
  };
};

interface article {
  index: number;
  recommend: number;
  view: number;
  comment: number;
  title: string;
  nickname: string;
  userId?: string;
  ip?: string;
  time: Date;
}

const getArticleFromRawData = (data: any): article => {
  let {
    no,
    subject,
    total_comment,
    user_id,
    ip,
    name,
    date_time,
    recommend,
    hit
  } = data;

  let time: Date;

  if (date_time.split(".").length == 3) {
    time = new Date(date_time);
  } else {
    let hourMinute = date_time.split(":");
    let now = new Date();
    time = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hourMinute[0],
      hourMinute[1]
    );
  }

  return {
    index: parseInt(no),
    view: parseInt(hit),
    comment: parseInt(total_comment),
    title: subject,
    time,
    nickname: name,
    userId: user_id || undefined,
    ip: ip || undefined,
    recommend: parseInt(recommend)
  };
};

async function getList(gallery: string, page: number = 0) {
  let req = request.instance.getInstance();
  let appId = await request.instance.getAppId();
  let param = qs.stringify({
    id: gallery,
    page: page,
    app_id: appId.key
  });

  try {
    let result = await req.get(
      request.redirect("http://m.dcinside.com/api/gall_list_new.php?" + param)
    );
    if (!result.data || result.data.length == 0)
      throw new Error("개시글 목록을 불러오지 못하였습니다");

    let data = result.data[0];
    let galleryInfo = getGalleryInfoFromRawData(data["gall_info"][0]);
    let articleList: Array<article> = data["gall_list"].map(
      (articleData: object) => getArticleFromRawData(articleData)
    );

    return {
      galleryInfo,
      articleList
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getDetail(gallery: string, index: number) {
  let req = request.instance.getInstance();
  let appId = await request.instance.getAppId();
  let param = qs.stringify({
    id: gallery,
    no: index,
    app_id: appId.key
  });

  try {
    let result = await req.get(
      request.redirect("http://m.dcinside.com/api/view2.php?" + param)
    );

    if (!result.data || result.data.length == 0)
      throw new Error("개시글 정보를 불러오지 못하였습니다");

    let data = result.data[0];

    return data;
  } catch (err) {
    return null;
  }
}

export default {
  getList,
  getDetail
};
