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
  galleryId: string;
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

export interface Guest {
  name: string;
  password: string;
}

export interface GuestPassword {
  password: string;
}

export interface Member {
  userId: string;
}

export function isGuest(data: any): data is Guest {
  return data.userId === undefined;
}

export function isMember(data: any): data is Member {
  return data.userId !== undefined;
}

export interface ArticleWriteForm {
  galleryId: string;
  title: string;
  body: string;
  clientToken?: string;
}

export interface ArticleDeleteForm {
  galleryId: string;
  index: string;
  clientToken?: string;
}
