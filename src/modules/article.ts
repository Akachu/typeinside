import request from "./request";
import qs from "querystring";

interface galleryInfo {
  title: string,
  gallery: string,
  category?: string,
  related?: Array<string>,
}

const getGalleryInfoFromRawData = (gallery: string, data: any): galleryInfo => {
  let { gall_title, category, relation_gall } = data;
  console.log(data);
  return {
    title: gall_title,
    gallery,
    category,
    related: relation_gall
  };
};

export interface articleInfo {
  gallery: string,
  index: number,
  recommend: number,
  view: number,
  comment: number,
  title: string,
  nickname: string,
  hasImage: boolean,
  userId?: string,
  ip?: string,
  time: Date,
}

const getArticleInfoFromRawData = (gallery: string, data: any): articleInfo => {
  let {
    no,
    subject,
    total_comment,
    user_id,
    ip,
    name,
    date_time,
    recommend,
    hit,
    img_icon
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
    gallery,
    index: parseInt(no),
    view: parseInt(hit),
    comment: parseInt(total_comment),
    title: subject,
    time,
    hasImage: img_icon == 'Y',
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
    let galleryInfo = getGalleryInfoFromRawData(gallery, data["gall_info"][0]);
    let articleList: Array<articleInfo> = data["gall_list"].map(
      (articleInfoData: object) => getArticleInfoFromRawData(gallery, articleInfoData)
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
  getDetail,
  getCommentList
};

async function getCommentList(gallery: string, no: number, page = 1) {
  let req = request.instance.getInstance();
  let appId = await request.instance.getAppId();
  let param = qs.stringify({
    app_id: appId.key,
    id: gallery,
    no,
    re_page: page,
  });

  try {
    let result = await req.get(
      request.redirect("http://m.dcinside.com/api/comment_new.php?" + param)
    );

    if (!result.data || result.data.length == 0)
      throw new Error("개시글 정보를 불러오지 못하였습니다");

    let data = result.data[0];
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}