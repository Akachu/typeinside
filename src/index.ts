import FormData from "form-data";
import crypto from "crypto";
import http from "http";
import https from "https";

const APP_CHECK_API = "http://json2.dcinside.com/json0/app_check_A_rina.php";
const APP_KET_VERIFICATION_API =
  "https://dcid.dcinside.com/join/mobile_app_key_verification_3rd.php";

const API_REQUEST_HEADER = {
  "User-Agent": "dcinside.app",
  Referer: "http://www.dcinside.com",
  Connection: "Keep-Alive"
};

const DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded; charset=UTF-8";

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
    throw err;
  }
}

async function request(
  method: string = "GET",
  url: string,
  headers?: Record<string, string>,
  data?: Record<string, string>
): Promise<any> {
  if (headers === undefined) {
    headers = {
      ...API_REQUEST_HEADER,
      "Content-Type": DEFAULT_CONTENT_TYPE
    };
  }

  // let formDataString: string;
  let formData: FormData;

  return new Promise((resolve, reject) => {
    // if (data) {
    //   formDataString = "";

    //   let boundary = "----------------------------";

    //   let rn = Math.random()
    //     .toFixed(24)
    //     .substr(2);

    //   boundary += rn;

    //   for (let key in data) {
    //     let chunk = `${boundary}\nContent-Disposition: form-data; name="${key}"\n\n${data[key]}\n`;
    //     formDataString += chunk;
    //   }
    //   formDataString += boundary + "--";

    //   headers = {
    //     ...headers,
    //     "Content-Type": `multipart/form-data; boundary=${boundary}`
    //   };
    // }

    if (data) {
      formData = new FormData();

      for (let key in data) {
        formData.append(key, data[key]);
      }
      headers = {
        ...headers,
        ...formData.getHeaders()
      };
    }

    let option = {
      method,
      headers
    };

    // if (data) {
    //   option = { ...option, data: formDataString };
    //   console.log(option);
    // }

    let protocol = url.split("://")[0] == "http" ? http : https;
    let request = protocol.request(url, option, handleResponse);

    if (formData) {
      formData.pipe(request);
    }

    request.on("error", reject).end();

    function handleResponse(res: http.IncomingMessage) {
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
          console.error(err);
          console.log(responseData);
          throw err;
          resolve(null);
        }
      });
    }
  });
}

getToken().then(console.log);
