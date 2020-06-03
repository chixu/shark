import * as types from './type';
import { Http } from './utils/http.wx';
import { Xml } from './utils/xml.wx';
import { LangManager } from './core/langManager.wx';

declare var canvas;

export class SharkConfig implements types.SharkConfig {
    public canvas: any;
    public http: types.Http;
    public xml: types.Xml;
    public isWx: boolean = true;
    public langManager: types.LangManager;

    constructor() {
        this.canvas = canvas;
        this.http = new Http();
        this.xml = new Xml();
        this.langManager = new LangManager();
    }
}
