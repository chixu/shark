import * as types from '../type';

declare var wx;

export class Http implements types.Http {

    public get(url) {
        return get(url);
    }
}

export function get(url) {
    let _resolve;
    console.log('wx. request ', url);
    wx.request({
        url: 'http://localhost:3001/' + url,
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

export function image(url) {
    let _resolve;
    let image: any = document.createElement('img');
    image.src = url;
    image.onload = function (e) {
        console.log("image onloaed", e);
        console.dir(image);
        // this may not run
        // especially if the image is small
        _resolve(image);
    };
    return new Promise<string>(resolve => _resolve = resolve);
}