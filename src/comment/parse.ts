import { parseUser, parseTimeString } from "../parse";
import { User } from "../interface";
import { Comment, CommentListResult } from "./interface";

export function parseCommentData(data: any): Comment {
	const user: User = parseUser(data);
  const comment: Comment = {
    index: Number(data.comment_no),
    body: data.comment_memo,
    user: user,
    time: parseTimeString(data.date_time)
  };

  return comment;
}

export function parseCommentListResultData(data: any): CommentListResult {
  const list: Comment[] = data.comment_list.map(parseCommentData);
  const result: CommentListResult = {
    commentList: list,
    totalComment: Number(data.total_comment),
    totalPage: Number(data.total_page),
    currentPage: Number(data.re_page)
  };

  return result;
}
