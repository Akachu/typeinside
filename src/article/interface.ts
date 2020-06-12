import { User } from "../interface";

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
  title: string;
  header: string;
  time: Date;
  user: User;
}

export interface ArticleDetail extends Article {
  recommendMember: number;
  unrecommend: number;
  recommendCaptcha: boolean;
  recommendCaptchaType: string;
  recommendCaptchaLength: number;
  galleryName: string;
  galleryCategory: number;
  body: string;
  next: NeighborArticle;
  prev: NeighborArticle;
  galleryHeaders: GalleryHeader[];
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
  clientToken: string;
}

export interface ArticleDeleteForm {
  galleryId: string;
  index: number;
  clientToken: string;
}
export interface ImageUrl {
  full: string;
  resized: string;
}

export enum ArticleSearchType {
  ALL = "all",
  TITLE = "subject",
  BODY = "memo",
  TITLE_BODY = "subject_m",
  USER_NAME = "name",
}

export interface ArticleListOption {
  page?: number;
  search?: ArticleSearchOption;
}

export interface ArticleSearchOption {
  keyword: string;
  type: ArticleSearchType;
}
