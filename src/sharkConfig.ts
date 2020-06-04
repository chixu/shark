import * as types from './type';
import { Http, getQueryString } from './utils/http';
import { Xml } from './utils/xml';
import { LangManager } from './core/langManager';
import { ResourceManager } from './core/resourceManager';


export class SharkConfig implements types.SharkConfig {
    public canvas: any;
    public http: types.Http;
    public xml: types.Xml;
    public isWx: boolean = false;
    public langManager: types.LangManager;
    public resourceManager: types.ResourceManager;
    public isMobile: boolean;

    constructor() {
        this.canvas = document.getElementById("stage");
        this.http = new Http();
        this.xml = new Xml();
        this.langManager = new LangManager();
        this.resourceManager = new ResourceManager();
        this.isMobile = getQueryString('platform') !== 'web';
    }
}
