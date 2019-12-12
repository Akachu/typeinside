export interface ImageUrl {
    full: string;
    resized: string;
}
export declare function image(galleryId: string, appId: string, index: number): Promise<Array<ImageUrl>>;
