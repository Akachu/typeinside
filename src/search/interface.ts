export enum SearchType {
  GALLERY = "gall_name",
  ARTICLE = "gall_content",
  ALL = "search_main",
  WIKI = "wiki",
}

export interface SearchListInfo {
  page: number;
  type: string;
}

export interface SearchAllResult {
  articleList: SimpleArticle[];
  dailyBestArticleList: SimpleArticle[];
  majorGalleryList: SimpleGallery[];
  minorGalleryList: SimpleGallery[];
  wikiList: Wiki[];
}

export interface ArticleSearchResult {
  info: SearchListInfo;
  list: SimpleArticle[];
}

export interface WikiSearchResult {
  info: SearchListInfo;
  list: Wiki[];
}

export interface GallerySearchResult {
  majorGalleryList: SimpleGallery[];
  minorGalleryList: SimpleGallery[];
  majorRecommendGalleryList: SimpleGallery[];
  minorRecommendGalleryList: SimpleGallery[];
}

export interface Wiki {
  name: string;
  galleryName: string;
  url: string;
}

export interface SimpleArticle {
  title: string;
  body: string;
  galleryName: string;
  galleryId: string;
  index: number;
  time: Date;
}

export interface SimpleGallery {
  name: string;
  id: string;
  isMinor: boolean;
  isActive: boolean;
}
