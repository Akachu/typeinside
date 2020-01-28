import { Transform } from "stream";
import request from "./request";
import { RequestMethod } from "./interface";
import { HEADERS } from "../api";
import fs from "fs";
import http from "http";

interface ImageData {
  fileName: string;
  extension: string;
  data: Transform;
  size: number;
}

export async function image(
  url: string,
  handler?: (
    imageStream: Transform,
    fileName: string,
    extension: string
  ) => void
): Promise<ImageData> {
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

  if (handler) {
    handler(imageStream, fileName, extension);
  }

  await new Promise(resolve => res.on("end", resolve));

  imageStream.end();

  let imageData: ImageData = {
    fileName,
    extension,
    data: imageStream,
    size: parseInt(size)
  };

  return imageData;
}

export namespace image {
  export async function save(url: string, savePath: string) {
    let random = Math.random()
      .toFixed(5)
      .substr(2);

    await new Promise(async (resolve, reject) => {
      image(url, async (imageStream, name, extension) => {
        let fileFullName = `${name}_${random}.${extension}`;
        let filePath = `${savePath}/${fileFullName}`;
        let writeStream = fs.createWriteStream(filePath + "_saving");

        imageStream.pipe(writeStream);

        await new Promise(resolve => writeStream.on("close", resolve));
        writeStream.end();
        fs.renameSync(filePath + "_saving", filePath);
        resolve();
      });
    });
  }
}
