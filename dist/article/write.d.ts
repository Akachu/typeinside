import { Guest, Member, ArticleWriteForm } from "./interface";
export declare function write<T extends Guest | Member>(appId: string, form: ArticleWriteForm & T): Promise<number>;
