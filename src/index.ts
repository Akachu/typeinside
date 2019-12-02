import crypto from "crypto";
import http from "http";
import https from "https";

const APP_CHECK_API = "http://json2.dcinside.com/json0/app_check_A_rina.php";
const APP_KET_VERIFICATION_API =
  "https://dcid.dcinside.com/join/mobile_app_key_verification_3rd.php";

const API_REQUEST_HEADER = {
  "User-Agent": "dcinside.app",
  Referer: "http://www.dcinside.com",
  // Host: "upload.dcinside.com",
  Connection: "Keep-Alive"
};
const DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded; charset=UTF-8";

async function getDate() {
  let res;

  try {
    res = await request("GET", APP_CHECK_API);
    return res.date;
  } catch (err) {
    // console.error(err);
    throw err;
  }
}

async function getValueToken() {
  const date = await getDate();
  const food = "dcArdchk_" + date;

  const hash = crypto
    .createHash("sha256")
    .update(Buffer.from(food, "ascii"))
    .digest("hex");

  return hash;
}

async function getToken() {
  const valueToken = await getValueToken();

  const data: any = {
    value_token: valueToken,
    signature: "ReOo4u96nnv8Njd7707KpYiIVYQ3FlcKHDJE046Pg6s=",
    pkg: "com.dcinside.app"
  };

  let res;

  try {
    res = await request("POST", APP_KET_VERIFICATION_API, undefined, data);
    console.log(res);
    return res.data[0].app_id;
  } catch (err) {
    // console.error(err);
    throw err;
  }
}

getToken().then(console.log);

async function request(
  method: string = "GET",
  url: string,
  headers: { [key: string]: string } = {
    ...API_REQUEST_HEADER,
    "Content-Type": DEFAULT_CONTENT_TYPE
  },
  data?: { [key: string]: string }
): Promise<any> {
  return new Promise((resolve, reject) => {
    let option: any = {
      method,
      headers
    };

    if (data) {
      option["data"] = data;
    }

    console.log(option);

    let responseData = "";

    // const parsedData = Object.keys(data)
    //   .map(key => `${key}=${data[key]}`)
    //   .join("&");

    let request = (url.split("://")[0] == "http" ? http : https).request(
      url,
      option,
      handleResponse
    );

    if (data) {
      request.write(JSON.stringify(data), error => {
        console.log(error);
      });
    }

    request.on("error", reject).end();

    function handleResponse(res: http.IncomingMessage) {
      res.on("data", chunk => {
        responseData += chunk;
      });

      res.on("end", function() {
        let parsedData;
        try {
          parsedData = JSON.parse(responseData);
          resolve(parsedData);
        } catch (err) {
          console.log(responseData);
          // reject(err);
        }
      });
    }
  });
}
