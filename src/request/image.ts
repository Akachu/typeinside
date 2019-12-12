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
  savePath?: string
): Promise<ImageData | null> {
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
    return null;
  }

  fileName = disposition!.split("filename=")[1];
  extension = contentType!.split("image/")[1].toLowerCase();

  res.on("data", chunk => imageStream.push(chunk));

  let end = new Promise(resolve => res.on("end", resolve));

  if (savePath) {
    let random = Math.random()
      .toFixed(5)
      .substr(2);

    let filePath = `${savePath}/${fileName}_${random}.${extension}`;
    let writeStream = fs.createWriteStream(filePath + "_saving");
    imageStream.pipe(writeStream);
    await end;
    imageStream.end();
    await new Promise(resolve => writeStream.on("close", resolve));
    writeStream.end();
    fs.renameSync(filePath + "_saving", filePath);
  } else {
    await end;
  }

  let imageData: ImageData = {
    fileName,
    extension,
    data: imageStream,
    size: parseInt(size)
  };

  return imageData;
}
