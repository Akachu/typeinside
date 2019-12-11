interface NeighborArticle {
    index: number;
    title: string;
}
interface GalleryHeader {
    index: number;
    name: string;
    level: number;
    selected: boolean;
}
interface Article {
    index: number;
    view: number;
    recommend: number;
    hasImg: boolean;
    hasVoice: boolean;
    isRecommended: boolean;
    isBest: boolean;
    level: number;
    comment: number;
    voiceComment: number;
    isWinnerta: boolean;
    name: string;
    userId: string;
    ip: string | null;
    memberIcon: number;
    title: string;
    header: string;
    date: Date;
}
interface ArticleDetail extends Article {
    recommendMember: number;
    unrecommend: number;
    recommendCaptcha: boolean;
    recommendCaptchaType: string;
    recommendCaptchaLength: number;
    galleryTitle: string;
    galleryCategory: number;
    body: string;
    next: NeighborArticle;
    prev: NeighborArticle;
    galleryHeaders: Array<GalleryHeader>;
    isMinor: boolean;
    isNotice: boolean;
}
export declare function list(galleryId: string, page?: number): Promise<Article[] | null>;
export declare function detail(galleryId: string, index: number): Promise<ArticleDetail | null>;
export declare function lastIndex(galleryId: string): Promise<number | null>;
interface ImageUrl {
    full: string;
    resized: string;
}
export declare function image(galleryId: string, index: number): Promise<Array<ImageUrl>>;
export {};
