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
