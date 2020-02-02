import { API } from "../api";
import { post, getResultData } from "../request";
import { LoginResult } from "./interface";

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
