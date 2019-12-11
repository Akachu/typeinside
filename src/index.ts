import * as article from "./article";
import * as request from "./request";

module.exports = {
  article,
  request
};

class typeinside {
  public _appId!: string;

  async initialize(info?: AuthInfo): Promise<any> {

	}

	async login(info: AuthInfo) {
		// if(!info) this._appId = await 
	}
}

interface AuthInfo {
  id: string;
  pw: string;
  isMember: boolean;
}
