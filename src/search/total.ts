import { API } from "../api";
import { post } from "../request";
import {
  SearchType,
  SearchAllResult,
  ArticleSearchResult,
  WikiSearchResult,
  GallerySearchResult,
} from "./interface";
import {
  parseSimpleArticleData,
  parseSimpleGalleryData,
  parseWikiData,
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
    return {
      articleList: data.board.map(parseSimpleArticleData),
      dailyBestArticleList: data.today.map(parseSimpleArticleData),
      majorGalleryList: data.main_gall.map(parseSimpleGalleryData),
      minorGalleryList: data.minor_gall.map(parseSimpleGalleryData),
      wikiList: data.wiki.map(parseWikiData),
    };
  }

  export async function gallery(
    keyword: string,
    appId: string
  ): Promise<GallerySearchResult> {
    const data = await total(keyword, SearchType.GALLERY, appId);
    return {
      majorGalleryList: data.main_gall.map(parseSimpleGalleryData),
      minorGalleryList: data.minor_gall.map(parseSimpleGalleryData),
      majorRecommendGalleryList: data.main_recomm_gall.map(
        parseSimpleGalleryData
      ),
      minorRecommendGalleryList: data.minor_recomm_gall.map(
        parseSimpleGalleryData
      ),
    };
  }

  export async function article(
    keyword: string,
    appId: string
  ): Promise<ArticleSearchResult> {
    const data = await total(keyword, SearchType.ARTICLE, appId);
    const info = data.info[0];
    return {
      info: { page: info.total_page, type: info.type },
      list: data.list.map(parseSimpleArticleData),
    };
  }

  export async function wiki(
    keyword: string,
    appId: string
  ): Promise<WikiSearchResult> {
    const data = await total(keyword, SearchType.WIKI, appId);
    const info = data.info[0];
    return {
      info: { page: info.total_page, type: info.type },
      list: data.list.map(parseWikiData),
    };
  }
}
