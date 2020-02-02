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