import * as dc from "../src/";
import { expect } from "chai";
import "dotenv/config";
import "mocha";

const galleryId = "cat";
const articleIndex = 1193238;
const clientToken = process.env.dcApiClientToken!;
const memberId = process.env.dcApiMemberId!;
const memberPw = process.env.dcApiMemberPw!;

function delay(ms: number) {
  return new Promise((resolve) => {
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
    let result = await dc.article.detail(galleryId, articleIndex, appId);
    expect(result).to.not.null;
  });

  it("get img urls of article", async () => {
    let result = await dc.article.image(galleryId, articleIndex, appId);
    expect(result).to.not.null;
  });

  it("get comments of article", async () => {
    let result = await dc.comment.list(galleryId, articleIndex, appId);
    expect(result).to.not.null;
  });

  let writeTestGalleryId = "programming";
  let tempArticleIndex: number;

  it("write article with guest account", async () => {
    appId = await dc.getAppId(clientToken);

    await delay(1500);

    let result = await dc.article.write(
      {
        galleryId: writeTestGalleryId,
        title: "ㅇㅇ",
        body: "ㅇㅇ",
        name: "ㅇㅇ",
        password: "123456",
        clientToken: clientToken,
      },
      appId
    );

    expect(result).to.not.null;
    tempArticleIndex = result;
  });

  it("delete article", async () => {
    appId = await dc.getAppId(clientToken);

    await delay(1500);

    await dc.article.delete(
      {
        galleryId: writeTestGalleryId,
        index: tempArticleIndex,
        password: "123456",
        clientToken,
      },
      appId
    );
  });

  let userId: string;

  it("login with member account", async () => {
    let loginResult = await dc.auth.login(memberId, memberPw);
    expect(loginResult.success).to.true;
    userId = loginResult.userInfo!.userId;
  });
  
  it("write article with member account", async () => {
    let result = await dc.article.write(
      {
        galleryId: writeTestGalleryId,
        title: "ㅇㅇ",
        body: Date.now() + "",
        userId,
        clientToken,
      },
      appId
    );

    expect(result).to.not.null;
    tempArticleIndex = result;
  });

  it("delete article again", async () => {
    await dc.article.delete(
      {
        galleryId: writeTestGalleryId,
        index: tempArticleIndex,
        userId,
        clientToken,
      },
      appId
    );
  });
});
