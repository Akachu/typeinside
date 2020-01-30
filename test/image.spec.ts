import * as dc from "../src/index";
import { expect } from "chai";
import "mocha";

const galleryId = "cat";
const articleIndex = 1193238;

describe("image download test", () => {
  let appId: string;

  it("generate app id", async () => {
    let result = await dc.getAppId();
    expect(result).to.not.null;
    appId = result;
  });

  it("download image", async () => {
    let imgUrls = await dc.article.image(galleryId, appId, articleIndex);
    let fullUrl = imgUrls[0].resized;
    let result = await dc.request.image(fullUrl);
    expect(result).to.not.null;
	});
	
	it("download image and save it", async () => {
    let imgUrls = await dc.article.image(galleryId, appId, articleIndex);
    let fullUrl = imgUrls[0].resized;
    let result = await dc.request.image.save(fullUrl, './', 'testImage');
    expect(result).to.not.null;
  });
});
