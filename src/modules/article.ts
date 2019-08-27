import request from './request';
import qs from 'querystring';

async function getList(gallery: string, page: number = 0) {
    let req = request.instance.getInstance();
    let appId = await request.instance.getAppId();
    let param = qs.stringify({
        id: gallery,
        page: page,
        app_id: appId.key
    });

    try {
        let result = await req.get(request.redirect('http://m.dcinside.com/api/gall_list_new.php?' + param));
        if (!result.data || result.data.length == 0) {
            throw new Error('개시글 목록을 불러오지 못하였습니다');
        }
        return result.data[0];
    } catch (err) {
        console.error(err);
        return null;
    }

}

export default {
    getList
}