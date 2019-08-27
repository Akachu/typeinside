import { AxiosRequestConfig } from 'axios';
import qs from 'querystring';
import crypto from "crypto";
import request from './request';
import { dateFormat } from './tool';

export interface appIdInfo {
    key: string,
    expire: number
}

function getOptions(time: Date): AxiosRequestConfig {
    let token = crypto.createHash('sha256').update(Buffer.from('dcArdchk_' + dateFormat(time), 'ascii')).digest('hex');

    let data = qs.stringify({
        'value_token': token,
        'signature': 'ReOo4u96nnv8Njd7707KpYiIVYQ3FlcKHDJE046Pg6s='
    });

    return {
        method: 'post',
        url: "https://dcid.dcinside.com/join/mobile_app_key_verification_3rd.php",
        data
    };
};

async function generateAppId(time: Date = new Date()): Promise<appIdInfo> {
    let req = request.instance.getInstance();
    try {
        let result = await req.request(getOptions(time));
        if (result.data.length == 1 && result.data[0].result) return {
            expire: Number.parseInt(dateFormat(time)),
            key: result.data[0].app_id
        };
        else throw new Error();
    } catch (error) {
        console.error(`can't get app id!\n${error}`);
        return { expire: 0, key: '' };
    }
}

export default { generateAppId };