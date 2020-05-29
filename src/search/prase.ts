import { SimpleGallery, SimpleArticle, Wiki } from "./interface";
import { parseTimeString } from "../parse";

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

export function parseSimpleArticleData(data: any): SimpleArticle {
  return {
    index: parseInt(data.no),
    title: data.title,
    body: data.content,
    galleryName: data.gall_name,
    galleryId: data.id,
    time: parseTimeString(data.regdate),
  };
}

export function parseWikiData(data: any): Wiki {
  return {
    galleryName: data.gall_name,
    name: data.title,
    url: data.url,
  };
}
