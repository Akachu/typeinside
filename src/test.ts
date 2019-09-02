import article, { articleInfo } from "./modules/article";

const test_1 = async () => {
  let gallery = 'cat'

  let articleList_1 = await article.getList(gallery, 3);
  if (articleList_1 == null) return;
  else {
    let article_1 = articleList_1.articleList[0];
    let article_1_detail = await article.getDetail(gallery, article_1.index);
    let article_1_comment = await article.getCommentList(article_1.gallery, article_1.index);

    console.log(article_1);
    console.log(article_1_detail);
    console.log(article_1_comment);
  }
};

export default async () => {
  test_1();
};
