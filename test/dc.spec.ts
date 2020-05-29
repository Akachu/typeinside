import { DC } from "../src/";
import { expect } from "chai";
import "dotenv/config";
import "mocha";

const galleryId = "cat";
const articleIndex = 1193238;

describe("dc class test", () => {
  let dc: DC;

  it("initialize dc instance", async () => {
    dc = new DC();

    const appId = await dc.getAppId();

    expect(appId).to.not.null;
  });

  it("get article list", async () => {
    const result = await dc.getArticleList(galleryId);

    expect(result).to.not.null;
	});
	
  it("get article image list", async () => {
    const result = await dc.getArticleImage(galleryId, articleIndex);

    expect(result).to.not.null;
	});
	
  it("get article detail", async () => {
    const result = await dc.getArticleDetail(galleryId, articleIndex);

    expect(result).to.not.null;
  });

  it("get comment list", async () => {
    const result = await dc.getCommentList(galleryId, articleIndex);

    expect(result).to.not.null;
  });
});
