/// <reference types="node" />
import { Transform } from "stream";
interface ImageData {
    fileName: string;
    extension: string;
    data: Transform;
    size: number;
}
export declare function image(url: string, savePath?: string): Promise<ImageData>;
export {};
