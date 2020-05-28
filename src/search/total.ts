import { API } from "../api";
import {
  SearchType,
  SearchAllResult,
  ArticleSearchResult,
  WikiSearchResult,
  GallerySearchResult,
} from "./interface";
import { post } from "../request";
import {
  parseSearchAllResult,
  parseArticleSearchResult,
  parseWikiSearchResult,
  parseGallerySearchResult,
} from "./prase";

export async function total(keyword: string, type: SearchType, appId: string) {
  const { success, data } = await post(API.SEARCH, {
    keyword,
    appId,
    search_type: type,
  });

  if (!success || !data) {
    throw new Error("failed to get search data");
  }

  return data;
}

export namespace total {
  export async function all(
    keyword: string,
    appId: string
  ): Promise<SearchAllResult> {
    const data = await total(keyword, SearchType.ALL, appId);
    return parseSearchAllResult(data);
  }

  export async function gallery(
    keyword: string,
    appId: string
  ): Promise<GallerySearchResult> {
    const data = await total(keyword, SearchType.GALLERY, appId);
    return parseGallerySearchResult(data);
  }

  export async function article(
    keyword: string,
    appId: string
  ): Promise<ArticleSearchResult> {
    const data = await total(keyword, SearchType.ARTICLE, appId);
    return parseArticleSearchResult(data);
  }

  export async function wiki(
    keyword: string,
    appId: string
  ): Promise<WikiSearchResult> {
    const data = await total(keyword, SearchType.WIKI, appId);
    return parseWikiSearchResult(data);
  }
}
