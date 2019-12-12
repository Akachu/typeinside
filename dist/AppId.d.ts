export declare function getAppId(): Promise<string | null>;
export default class AppId {
    private static _session;
    static readonly session: AppId;
    _value: string | undefined;
    value(): Promise<string | undefined>;
    getNewAppId(): Promise<null | undefined>;
}
