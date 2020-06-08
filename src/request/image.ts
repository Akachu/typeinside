import fs from "fs";
import { HEADERS } from "../api";
import { streamRequset } from "./client/http";
import { Transform } from "stream";

export interface FileData {
  fileName: string;
  extension: string;
  data: Transform;
  size: number;
}

export async function image(url: string): Promise<FileData> {
  let fileName: string;
  let extension: string;

  const options = {
    headers: HEADERS.IMAGE,
  };

  const { headers, stream } = await streamRequset(url, options);

  let disposition = headers["content-disposition"];
  let contentType = headers["content-type"];
  let size = headers["content-length"];

  if (!disposition || !contentType || !size) {
    throw new Error("failed to get image data");
  }

  fileName = disposition!.split("filename=")[1];
  extension = contentType!.split("image/")[1].toLowerCase();

  let imageData: FileData = {
    fileName,
    extension,
    data: stream,
    size: parseInt(size),
  };

  return imageData;
}

export namespace image {
  export async function save(url: string, savePath: string, fileName?: string) {
    let fileData: FileData = await image(url);

    if (!fileName) {
      let random = Math.random().toFixed(5).substr(2);

      fileName = `${fileData.fileName}_${random}`;
    }

    let pathName = `${savePath}/${fileName}`;

    let tempFilePath = `${pathName}.tydownload`;
    let filePath = `${pathName}.${fileData.extension}`;

    let writeStream = fs.createWriteStream(tempFilePath);

    fileData.data.pipe(writeStream);

    await new Promise((resolve) => writeStream.on("close", resolve));
    writeStream.end();
    fs.renameSync(tempFilePath, filePath);

    return filePath;
  }
}
