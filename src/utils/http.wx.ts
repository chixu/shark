import * as types from '../type';

declare var wx;

export class Http implements types.Http {

    public get(url) {
        let _resolve;
        console.log('wx. request ', url);
        wx.request({
            url: url,
            method: 'GET', //请求方式
            header: {
                'Content-Type': 'text/html',
            },
            // data: {
            //     activityId: options.id,  //参数
            // },
            success: function (res) {
                _resolve(res.data);
            }
        })
        return new Promise<string>(resolve => _resolve = resolve);
    }
}