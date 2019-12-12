export interface GalleryHeader {
  index: number;
  name: string;
  level: number;
  selected: boolean;
}

export interface NeighborArticle {
  index: number;
  title: string;
}

export interface Article {
  index: number;
  view: number;
  recommend: number;
  hasImg: boolean;
  hasVoice: boolean;
  isRecommended: boolean;
  isBest: boolean;
  level: number;
  comment: number;
  voiceComment: number;
  isWinnerta: boolean;
  name: string;
  userId: string;
  ip: string | null;
  memberIcon: number;
  title: string;
  header: string;
  date: Date;
}

export interface ArticleDetail extends Article {
  recommendMember: number;
  unrecommend: number;
  recommendCaptcha: boolean;
  recommendCaptchaType: string;
  recommendCaptchaLength: number;
  galleryTitle: string;
  galleryCategory: number;
  body: string;
  next: NeighborArticle;
  prev: NeighborArticle;
  galleryHeaders: Array<GalleryHeader>;
  isMinor: boolean;
  isNotice: boolean;
}
