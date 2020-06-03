import * as types from './type';
import { Http } from './utils/http';
import { Xml } from './utils/xml';
import { LangManager } from './core/langManager';


export class SharkConfig implements types.SharkConfig {
    public canvas: any;
    public http: types.Http;
    public xml: types.Xml;
    public isWx: boolean = false;
    public langManager: types.LangManager;
    constructor() {
        this.canvas = document.getElementById("stage");
        this.http = new Http();
        this.xml = new Xml();
        this.langManager = new LangManager();
    }
}
