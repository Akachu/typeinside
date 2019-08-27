import article from './modules/article';
(async () => console.log(await article.getList('cat')))();