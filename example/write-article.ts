import { article } from "../src";
import { getRandomClientToken, getAppId } from "../src/auth";

writeArticle().then(console.log);

async function writeArticle() {
  const appId = await getAppId();
  return await article.write(
    {
      galleryId: "programming",
      title: "ㅇㅇ",
      body: "ㅇㅇ",
      name: "ㅇㅇ",
      password: "123456",
      clientToken: getRandomClientToken(),
    },
    appId
  );
}
