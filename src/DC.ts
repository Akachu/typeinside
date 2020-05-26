import { getAppId } from "./auth";
import {
  list as articleList,
  detail as articleDetail,
  image as articleImage,
  ArticleListOption,
} from "./article";
import { list as commentList } from "./comment";

export class DC {
  private appId?: string;
  private clientToken?: string;
  private lastTokenRefresh?: number;

  constructor(clientToken?: string) {
    this.clientToken = clientToken;
  }

  public setClientToken(clientToken: string) {
    this.clientToken = clientToken;
  }

  public async getNewAppId() {
    const newAppId = await getAppId(this.clientToken);
    this.appId = newAppId;
    this.lastTokenRefresh = Date.now();
    return newAppId;
  }

  public async getAppId() {
    if (
      !this.appId ||
      !this.lastTokenRefresh ||
      this.lastTokenRefresh - Date.now() > 1000 * 60 * 60 * 12 - 1
    ) {
      return await this.getNewAppId();
    } else {
      return this.appId;
    }
  }

  public async getArticleList(galleryId: string, option?: ArticleListOption) {
    let appId = await this.getAppId();
    return await articleList(galleryId, appId, option);
  }

  public async getArticleDetail(galleryId: string, index: number) {
    let appId = await this.getAppId();
    return await articleDetail(galleryId, index, appId);
  }

  public async getCommentList(galleryId: string, index: number, page?: number) {
    let appId = await this.getAppId();
    return await commentList(galleryId, index, appId, page);
  }

  public async getArticleImage(galleryId: string, index: number) {
    let appId = await this.getAppId();
    return await articleImage(galleryId, index, appId);
  }
}
