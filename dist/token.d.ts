/**
 * 일부 요청시에 사용되는 appId를 발급 받습니다
 *
 * 발급된 appId는 12시간 뒤 만료 됩니다
 *
 * @export
 * @returns appId
 */
export declare function getAppId(): Promise<string>;
