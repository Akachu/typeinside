import { User } from "../interface";

export interface CommentListResult {
  totalComment: number;
  totalPage: number;
  currentPage: number;
  commentList: Comment[];
}

export interface Comment {
  body: string;
  index: number;
  time: Date;
  user: User;
}

export interface CommentWriteForm {
  gallery: string;
  articleId: number;
  body: string;
  clientToken: string;
}

export interface CommentDeleteForm {
  articleId: string;
  index: string;
  gallery: string;
}
