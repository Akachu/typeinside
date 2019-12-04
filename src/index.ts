import crypto from "crypto";
import http from "http";
import https from "https";
import { parse as parseUrl } from "url";

const APP_CHECK_API = "http://json2.dcinside.com/json0/app_check_A_rina.php";
const APP_KET_VERIFICATION_API =
  "https://dcid.dcinside.com/join/mobile_app_key_verification_3rd.php";

const API_REQUEST_HEADER = {
  "User-Agent": "dcinside.app",
  Referer: "http://www.dcinside.com",
  Connection: "Keep-Alive"
};

const DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded; charset=UTF-8";

const DEFAULT_HEADERS = {
  ...API_REQUEST_HEADER,
  "Content-Type": DEFAULT_CONTENT_TYPE
};

async function getDate() {
  let res = await request("GET", APP_CHECK_API);

  if (res === null || res[0] === null || res[0].date === null) {
    console.error("can't get date");
    return null;
  } else {
    return res[0].date;
  }
}

async function getValueToken() {
  const time = await getDate();

  if (time === null) {
    console.log("failed to generate value token");
    return null;
  }

  const food = "dcArdchk_" + time;

  const hash = crypto
    .createHash("sha256")
    .update(Buffer.from(food, "ascii"))
    .digest("hex");

  return hash;
}

async function getToken() {
  const valueToken = await getValueToken();
  if (valueToken === null) {
    console.log("failed to get token");
    return null;
  }

  const data = {
    value_token: valueToken,
    signature: "ReOo4u96nnv8Njd7707KpYiIVYQ3FlcKHDJE046Pg6s=",
    pkg: "com.dcinside.app"
  };

  let res;

  try {
    res = await request("POST", APP_KET_VERIFICATION_API, undefined, data);
    return res[0].app_id;
  } catch (err) {
    console.error(err);
    console.log("failed to get token");
  }
}

async function request(
  method: string = "GET",
  url: string,
  headers: Record<string, string> = DEFAULT_HEADERS,
  data?: Record<string, string>
): Promise<any> {
  let formData: string = "";

  if (data) {
    const boundary = "bnd";

    headers["Content-Type"] = `multipart/form-data; boundary=${boundary}`;

    for (let key in data) {
      formData += `--${boundary}\n`;
      formData += `Content-Disposition: form-data; name="${key}"\n\n`;
      formData += `${data[key]}\n`;
    }

    formData += `--${boundary}--`;
  }

  let option: http.RequestOptions = {
    method,
    headers
  };

  let protocol = parseUrl(url).protocol === "http:" ? http : https;

  return new Promise((resolve, reject) => {
    let request = protocol.request(url, option, res => {
      let responseData = "";

      res.on("data", chunk => {
        responseData += chunk;
      });

      res.on("end", function() {
        let parsedData;
        try {
          parsedData = JSON.parse(responseData);
          resolve(parsedData);
        } catch (err) {
          reject(err);
        }
      });
    });

    if (data) request.write(formData);

    request.on("error", reject);
    request.end();
  });
}

getToken().then(console.log);
