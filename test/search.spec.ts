import { getAppId, search } from "../src/";
import { expect } from "chai";
import "dotenv/config";
import "mocha";

const keyword = "고양이";

describe("search test", () => {
  let appId: string;

  it("generate app id", async () => {
    let result = await getAppId();
    expect(result).to.not.null;
    appId = result;
  });

  it("search all", async () => {
    let result = await search.all(keyword, appId);

    expect(result).to.not.null;
  });

  it("search gallery", async () => {
    let result = await search.gallery(keyword, appId);

    expect(result).to.not.null;
  });

  it("search article", async () => {
    let result = await search.article(keyword, appId);

    expect(result).to.not.null;
  });

  it("search wiki", async () => {
    let result = await search.wiki(keyword, appId);

    expect(result).to.not.null;
  });
});
