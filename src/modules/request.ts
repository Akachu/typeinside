import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import auth, { appIdInfo } from './auth';
import { dateFormat } from './tool';

const defaultConfig: AxiosRequestConfig = {
    headers: {
        "User-Agent": "dcinside.app",
        "Referer": "http://m.dcinside.com",
        "Content-Type": "application/x-www-form-urlencoded"
    },
};

class instance {
    private static instance: AxiosInstance;
    private static appId: appIdInfo;

    static getInstance() {
        if (!this.instance) this.instance = axios.create(defaultConfig);
        return this.instance;
    }

    static async getAppId() {
        let now = parseInt(dateFormat(new Date()));
        if (!this.appId || this.appId.expire < now) this.appId = await auth.generateAppId();
        return this.appId;
    }
}

const redirect = (url: string) => `http://m.dcinside.com/api/redirect.php?hash=${Buffer.from(url).toString('base64')}`;

export default { instance, redirect };