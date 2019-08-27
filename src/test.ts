import article from "./modules/article";

const test_1 = async () => {
  let articleList_1 = await article.getList("kancolle", 244);
  if (articleList_1 == null) return;
  else {
    let articleDetail_1 = await article.getDetail(
      "kancolle",
      articleList_1.articleList[0].index
    );

    console.log(articleDetail_1);
  }
};

export default async () => {
  test_1();
};
