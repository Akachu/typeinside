import { Guest, Member, ArticleDeleteForm } from "./interface";
declare function del<T extends Guest | Member>(appId: string, form: ArticleDeleteForm & T): Promise<void>;
export { del as delete };
