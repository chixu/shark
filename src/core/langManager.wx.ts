
import * as shark from "../shark";
import * as types from '../type';
// import * as http from "../utils/http";

export class Language {
    public static CN = 'cn';
    public static EN = 'en';
}

export class LangManager implements types.LangManager {
    private dict: any;
    public lang: string;

    constructor() {
        let lang = navigator.language;
        lang = lang.toLowerCase();
        if (lang.indexOf('zh') > -1 || lang.indexOf('cn') > -1)
            this.lang = Language.CN;
        else
            this.lang = Language.EN;
    }

    translate(str: string) {
        // this.initDict();
        if (this.dict == undefined)
            this.dict = shark.resourceManager.resource('text');
        console.log(this.dict);
        let keys = str.match(/{{.+}}/g);
        if (keys) {
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                str = str.replace(key, this.dict[key.substr(2, key.length - 4)]);
            }
        }
        return str;
    }
}
