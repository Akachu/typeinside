import { API } from "../api";
import { post, getResultData } from "../request";

function parseLoginResult(data: any) {}

export interface LoginResult {
  success: boolean;
  reason?: string;
  userInfo?: UserInfo;
}

export interface UserInfo {
  userId: string;
  userNo: string;
  name: string;
  stype: string;
  isAdult: boolean;
  isDormancy: boolean;
}

export async function login(id: string, pw: string): Promise<LoginResult> {
  let formData = {
    user_id: id,
    user_pw: pw
  };

  let result = await post(API.LOGIN, formData);
  let data = getResultData(result);

  if (data && data.result) {
    return {
      success: true,
      userInfo: {
        userId: data.user_id,
        userNo: data.user_no,
        name: data.name,
        stype: data.stype,
        isAdult: data.is_adult === "1",
        isDormancy: data.is_dormancy === "1"
      }
    };
  } else {
    return {
      success: false
    };
  }
}
