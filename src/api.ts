export const CONTENT_TYPE = {
  DEFAULT: "application/x-www-form-urlencoded; charset=UTF-8"
};

export const HEADERS = {
  API: {
    "User-Agent": "dcinside.app",
    Referer: "http://www.dcinside.com",
    Connection: "Keep-Alive",
    "Content-Type": CONTENT_TYPE.DEFAULT
  }
};

export const API = {
  APP_CHECK:            "http://json2.dcinside.com/json0/app_check_A_rina.php",
  APP_KEY_VERIFICATION: "https://dcid.dcinside.com/join/mobile_app_key_verification_3rd.php",
  MAJOR_GALLERY_LIST:   "http://json.dcinside.com/App/gall_name.php",
  MINOR_GALLERY_LIST:   "http://json.dcinside.com/App/gall_name_sub.php",
  REDIRECT:             "http://m.dcinside.com/api/redirect.php",
};
 