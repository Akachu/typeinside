import * as dc from "../src/index";
import { expect } from "chai";
import "mocha";

const galleryId = "cat";
const articleIndex = 1193238;
const clientToken = process.env.dcApiClientToken!;
const memberId = process.env.dcApiMemberId!;
const memberPw = process.env.dcApiMemberPw!;

function delay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

describe("Typeinside run test", () => {
  let appId: string;

  it("generate app id", async () => {
    let result = await dc.getAppId(clientToken);
    expect(result).to.not.null;
    appId = result;
  });

  it("get last article index of gallery", async () => {
    let result = await dc.article.lastIndex(galleryId, appId);
    expect(result).to.not.null;
  });

  it("get article list", async () => {
    let result = await dc.article.list(galleryId, appId);
    expect(result).to.not.null;
  });

  it("get detail of article", async () => {
    let result = await dc.article.detail(galleryId, appId, articleIndex);
    expect(result).to.not.null;
  });

  it("get img urls of article", async () => {
    let result = await dc.article.image(galleryId, appId, articleIndex);
    expect(result).to.not.null;
  });

  it("download image", async () => {
    let imgUrls = await dc.article.image(galleryId, appId, articleIndex);
    let fullUrl = imgUrls[0].resized;
    let result = await dc.request.image(fullUrl);
    expect(result).to.not.null;
  });

  it("wait 5 seconds", async () => {
    await delay(5000);
  });

  let writeTestGalleryId = "programming";
  let tempArticleIndex: number;

  it("write article with guest account", async () => {
    let result = await dc.article.write(appId, {
      galleryId: writeTestGalleryId,
      title: "api 테스트",
      body: "비밀번호는 123456",
      name: "ㅇㅇ",
      password: "123456",
      clientToken
    });

    expect(result).to.not.null;
    tempArticleIndex = result;
  });

  it("delete article", async () => {
    await dc.article.delete(appId, {
      galleryId: writeTestGalleryId,
      index: tempArticleIndex,
      password: "123456",
      clientToken
    });
  });

  let userId: string;

  it("login with member account", async () => {
    let loginResult = await dc.login(memberId, memberPw);
    expect(loginResult.success).to.true;
    userId = loginResult.userInfo!.userId;
  });

  /*
  it("write article with member account", async () => {
    let result = await dc.article.write(appId, {
      galleryId: writeTestGalleryId,
      title: 'api 테스트',
      body: '고닉 테스트',
      userId,
      clientToken
    });

    expect(result).to.not.null;
    tempArticleIndex = result;
  });

  it("delete article again", async () => {
    await dc.article.delete(appId, {
      galleryId: writeTestGalleryId,
      index: tempArticleIndex,
      userId,
      clientToken
    });
  });
  */
});
