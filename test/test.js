"use strict";
const expect = require("chai").expect;
const dc = require("../dist/index.js");

const galleryId = "cat";
const articleIndex = 1193238;
const clientToken = '_lbrU60AFZdj11vEMS2GjUHBzOVTYxUUVmmIeVp9z0WyHsO8SoX4L7Y8YRTFYIqAXyjRu0';

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

describe("Typeinside run test", () => {
  let appId;

  it("generate app id", async () => {
    let result = await dc.getAppId();
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

  it('wait 5 seconds', async () => {
    await delay(5000);
  });

  let writeTestGalleryId = 'programming';
  let tempArticleIndex;

  it('write article', async () => {
    let result = await dc.article.write(appId, {
      galleryId: writeTestGalleryId,
      title: 'api 테스트',
      body: '비밀번호는 123456',
      name: 'ㅇㅇ',
      password: '123456',
      clientToken
    });

    expect(result).to.not.null;
    tempArticleIndex = result;
  });

  it('delete article', async () => {
    await dc.article.delete(appId, {
      galleryId: writeTestGalleryId,
      index: tempArticleIndex,
      password: '123456',
      clientToken
    });
  });
});