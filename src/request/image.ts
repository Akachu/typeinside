import { Transform } from "stream";
import request from "./request";
import { ImageData, RequestMethod } from "./interface";
import { HEADERS } from "../api";
import fs from "fs";
import http from "http";

export async function image(url: string): Promise<ImageData> {
  let imageStream: Transform = new Transform();
  let fileName: string;
  let extension: string;

  let options = {
    headers: HEADERS.IMAGE
  };

  let res: http.IncomingMessage = await new Promise(resolve =>
    request(RequestMethod.GET, url, options, resolve)
  );

  let headers = res.headers;

  let disposition = headers["content-disposition"];
  let contentType = headers["content-type"];
  let size = headers["content-length"];

  if (!disposition || !contentType || !size) {
    throw new Error("failed to get image data");
  }

  fileName = disposition!.split("filename=")[1];
  extension = contentType!.split("image/")[1].toLowerCase();

  res.on("data", chunk => imageStream.push(chunk));
  res.on("end", () => {
    imageStream.end();
  });

  let imageData: ImageData = {
    fileName,
    extension,
    data: imageStream,
    size: parseInt(size)
  };

  return imageData;
}

export namespace image {
  export async function save(url: string, savePath: string, fileName?: string) {
    let imgData: ImageData = await image(url);

    if (!fileName) {
      let random = Math.random()
        .toFixed(5)
        .substr(2);

      fileName = `${imgData.fileName}_${random}`;
    }

    let pathName = `${savePath}/${fileName}`;

    let tempFilePath = `${pathName}.tydownload`;
    let filePath = `${pathName}.${imgData.extension}`;

    let writeStream = fs.createWriteStream(tempFilePath);

    imgData.data.pipe(writeStream);

    await new Promise(resolve => writeStream.on("close", resolve));
    writeStream.end();
    fs.renameSync(tempFilePath, filePath);
  }
}
