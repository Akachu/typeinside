import crypto from "crypto";
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'querystring';

const getOptions = (time: Date = new Date()): AxiosRequestConfig => new Object({
    method: 'post',
    url: "https://dcid.dcinside.com/join/mobile_app_key_verification_3rd.php",
    headers: { "User-Agent": "dcinside.app" },
    data: qs.stringify({
        'value_token': crypto.createHash('sha256').update(Buffer.from(`dcArdchk_${[
            time.getFullYear(),
            time.getMonth() + 1,
            time.getDate(),
            time.getHours()
        ].map(a => (b => b.length == 4 ? b : b.padStart(2, '0'))(a + '')).join('')}`, 'ascii')).digest('hex'),
        'signature': 'ReOo4u96nnv8Njd7707KpYiIVYQ3FlcKHDJE046Pg6s='
    })
});

const getAppId = async (time?: Date): Promise<string | null> => {
    try {
        let result = await axios.request(getOptions(time));
        if (result.data.length == 1 && result.data[0].result) return result.data[0].app_id;
        else throw new Error();
    } catch (error) {
        console.error(`can't get app id!\n${error}`);
        return null;
    }
}

export default { getAppId };