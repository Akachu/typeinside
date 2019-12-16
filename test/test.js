"use strict";
const expect = require("chai").expect;
const dc = require("../dist/index.js");

describe("Typeinside run test", () => {
  it("generate app id", async () => {
    let result = await dc.getAppId();
    expect(result).to.not.null;
  });

  it("get last article index of gallery", async () => {
    let appId = await dc.getAppId();
    let result = await dc.article.lastIndex("cat", appId);
    expect(result).to.not.null;
  });

  it("get article list", async () => {
    let appId = await dc.getAppId();
    let result = await dc.article.list("cat", appId);
    expect(result).to.not.null;
  });

  it("get img urls of article", async () => {
    let appId = await dc.getAppId();
    let index = await dc.article.lastIndex("cat", appId);
    let result = await dc.article.image("cat", appId, index);
    expect(result).to.not.null;
  });

  it("download image", async () => {
    let appId = await dc.getAppId();
    let imgUrls = await dc.article.image("cat", appId, 1193238);
    let fullUrl = imgUrls[0].full;
    let result = await dc.request.image(fullUrl);
    expect(result).to.not.null;
  });
});
