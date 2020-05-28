import {
  SimpleGallery,
  SimpleArticle,
  SearchAllResult,
  Wiki,
  ArticleSearchResult,
  WikiSearchResult,
  GallerySearchResult,
} from "./interface";
import { parseTimeString } from "../parse";

export function parseSearchAllResult(data: any): SearchAllResult {
  return {
    articleList: data.board.map(parseSimpleArticle),
    dailyBestArticleList: data.today.map(parseSimpleArticle),
    majorGalleryList: data.main_gall.map(parseSimpleGalleryData),
    minorGalleryList: data.minor_gall.map(parseSimpleGalleryData),
    wikiList: data.wiki.map(parseWiki),
  };
}

export function parseSimpleGalleryData(data: any): SimpleGallery {
  const isMinor = data.gall_state !== undefined;
  const isActive = !isMinor || data.gall_state === "Y";
  return {
    id: data.id,
    name: data.title,
    isMinor,
    isActive,
  };
}

export function parseGallerySearchResult(data: any): GallerySearchResult {
  return {
    majorGalleryList: data.main_gall.map(parseSimpleGalleryData),
    minorGalleryList: data.minor_gall.map(parseSimpleGalleryData),
    majorRecommendGalleryList: data.main_recomm_gall.map(parseSimpleGalleryData),
    minorRecommendGalleryList: data.minor_recomm_gall.map(parseSimpleGalleryData),
  };
}

export function parseArticleSearchResult(data: any): ArticleSearchResult {
  const info = data.info[0];
  return {
    info: { page: info.total_page, type: info.type },
    list: data.list.map(parseSimpleArticle),
  };
}

export function parseSimpleArticle(data: any): SimpleArticle {
  return {
    index: parseInt(data.no),
    title: data.title,
    body: data.content,
    galleryName: data.gall_name,
    galleryId: data.id,
    time: parseTimeString(data.regdate),
  };
}

export function parseWiki(data: any): Wiki {
  return {
    galleryName: data.gall_name,
    name: data.title,
    url: data.url,
  };
}

export function parseWikiSearchResult(data: any): WikiSearchResult {
  const info = data.info[0];
  return {
    info: { page: info.total_page, type: info.type },
    list: data.list.map(parseWiki),
  };
}
