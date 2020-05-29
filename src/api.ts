export const CONTENT_TYPE = {
  DEFAULT: "application/x-www-form-urlencoded; charset=UTF-8"
};

/**
 * 앱의 signing signature
 */
export const SIGNATURE = "ReOo4u96nnv8Njd7707KpYiIVYQ3FlcKHDJE046Pg6s=";

export const HEADERS = {
  API: {
    "User-Agent": "dcinside.app",
    "Referer": "http://www.dcinside.com",
    "Connection": "Keep-Alive"
  },
  MOBILE: {
    "User-Agent": "Linux Android",
    "Referer": "http://m.dcinside.com"
  },
  IMAGE: {
    "Referer": "http://m.dcinside.com"
  }
};

export const API = {
  LOGIN: "https://dcid.dcinside.com/join/mobile_app_login.php",
  SEARCH: "http://app.dcinside.com/api/_total_search.php",
  APP: {
    CHECK: "http://json2.dcinside.com/json0/app_check_A_rina.php",
    KEY_VERIFICATION: "https://dcid.dcinside.com/join/mobile_app_key_verification_3rd.php",
    CODE: "http://app.dcinside.com/code.php"
  },
  GALLERY_LIST: {
    MAJOR: "http://json.dcinside.com/App/gall_name.php",
    MINOR: "http://json.dcinside.com/App/gall_name_sub.php"
  },
  REDIRECT: "http://m.dcinside.com/api/redirect.php",
  ARTICLE: {
    LIST: "http://m.dcinside.com/api/gall_list_new.php",
    DETAIL: "http://m.dcinside.com/api/gall_view.php",
    IMAGE: "http://m.dcinside.com/api/view_img.php",
    WRITE: "http://upload.dcinside.com/_app_write_api.php",
    DELETE: "http://m.dcinside.com/api/gall_del.php"
  },
  COMMENT: {
    LIST: "http://m.dcinside.com/api/comment_new.php",
    WRITE: "http://m.dcinside.com/api/comment_ok.php",
    DELETE: "http://m.dcinside.com/api/comment_del.php"
  }
};