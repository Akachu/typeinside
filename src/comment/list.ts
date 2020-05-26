import { API } from "../api";
import { get, RequestOptions, getResultData } from "../request";
import { parseCommentListResultData } from "./parse";
import { CommentListResult } from "./interface";

export async function list(
  galleryId: string,
  index: number,
  appId: string,
  page = 1
): Promise<CommentListResult> {
  const options: RequestOptions = {
    query: {
      app_id: appId,
      id: galleryId,
      no: index.toString(),
      re_page: page.toString(),
    },
  };

  const result = await get.withHash(API.COMMENT.LIST, options);
  const data = getResultData(result);

  const commentListResult: CommentListResult = parseCommentListResultData(data);

  return commentListResult;
}
