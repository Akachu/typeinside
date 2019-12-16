import { Article, ArticleDetail, GalleryHeader } from "./interface";

export function parseDateString(data: string) {
  let yearRegexp = /\d+\.\d+\.\d+/;
  let timeRegexp = /\d+:\d+/;

  let year = data.match(yearRegexp);
  let time = data.match(timeRegexp);

  let date: Date;
  if (year && time) {
    date = new Date(data);
  } else if (year) {
    date = new Date(year[0]);
  } else if (time) {
    date = new Date();
    let timeArr = data.split(":").map(num => parseInt(num));
    date.setHours(timeArr[0], timeArr[1]);
  } else {
    date = new Date();
  }

  return date;
}

export function parseArticleData(data: any) {
  let parsed: Article = {
    galleryId: data.galleryId,
    index: parseInt(data.no),
    view: parseInt(data.hit),
    recommend: parseInt(data.recommend),
    hasImg: data.img_icon === "Y",
    hasVoice: data.voice_icon === "Y",
    isRecommended: data.recommend_icon || data.recommend_chk === "Y",
    isBest: data.best_chk === "Y",
    level: parseInt(data.level),
    comment: parseInt(data.total_comment),
    voiceComment: data.voice_chk !== "N" ? parseInt(data.total_voice) : 0,
    isWinnerta: data.winnerta_icon === "Y",
    name: data.name,
    userId: data.user_id || null,
    ip: data.ip !== "" ? data.ip : null,
    memberIcon: parseInt(data.member_icon),
    title: data.subject,
    header: data.headtitle || null,
    date: parseDateString(data.date_time)
  };

  return parsed;
}

export function parseBodyData(data: string) {
  let body: string = data;

  body = body.replace(/&gt;/g, ">");
  body = body.replace(/&lt;/g, "<");
  body = body.replace(/&quot;/g, '"');
  body = body.replace(/&amp;/g, "&");

  return body;
}

export function parseArticleDetailData(data: any) {
  let article = parseArticleData(data);

  let headers: Array<GalleryHeader> = [];

  if (data.head_text) {
    headers = data.head_text.map(
      (ht: any): GalleryHeader => ({
        index: parseInt(ht.no),
        name: ht.name,
        level: parseInt(ht.level),
        selected: ht.selected
      })
    );
  }

  let hasCaptcha = false;
  let captchaType = null;
  let captchaLength = 0;

  if (data.recommend_captcha) {
    captchaType = data.recommend_captcha_type;
    captchaLength = data.recommend_code_count;
  }

  let parsedDetail: ArticleDetail = {
    ...article,
    recommendMember: parseInt(data.recommend_member),
    unrecommend: parseInt(data.nonrecommend),
    recommendCaptcha: hasCaptcha,
    recommendCaptchaType: captchaType,
    recommendCaptchaLength: captchaLength,
    galleryTitle: data.galltitle,
    galleryCategory: parseInt(data.category),
    body: parseBodyData(data.memo),
    next: { index: parseInt(data.next_link), title: data.next_subject },
    prev: { index: parseInt(data.prev_link), title: data.prev_subject },
    galleryHeaders: headers,
    isMinor: data.is_minor || false,
    isNotice: data.isNotice === "Y"
  };

  return parsedDetail;
}
