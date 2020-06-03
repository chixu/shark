
// import * as http from "./utils/http";
// import * as xml from "./utils/xml";
import * as json from "./utils/json";
import * as graphics from "./utils/graphics";
import { ResourceManager } from "./core/resourceManager";
import { WindowManager } from "./core/windowManager";
import { LayoutManager } from "./core/layoutManager";
import { SceneManager } from "./core/sceneManager";
import { KeyboardManager } from "./core/keyboardManager";
// import { LangManager } from "./core/langManager";
import EventEmitter from "./core/eventEmitter";
import { Device } from "./core/device";
import { Factory } from "./core/factory";
import { Orientation, SharkConfig, Http, Xml, LangManager } from "./type";
import { Scene } from "./display/scene";
//import * as PIXI from 'pixi.js'

export let renderer;
// export let resources: any = {};
export let config: any = {};
export let stage;
export let eventBus = new EventEmitter();
export let events = {
    OrientationChange: "oc",
    Created: "created"
};
export let langManager: LangManager;
export const sceneManager: SceneManager = new SceneManager();
export let resourceManager: ResourceManager;
export const windowManager: WindowManager = new WindowManager();
export let layoutManager: LayoutManager;
export let keyboardManager: KeyboardManager = new KeyboardManager();
export const device: Device = new Device();
export const factory: Factory = new Factory();
export let http: Http;
export let xml: Xml;
export let canvas: any;
let _ready: any;

export function ready(fn) {
    _ready = fn;
}

export function resource(id: string): any {
    return resourceManager.resource(id);
}

export function orientation(): Orientation {
    return windowManager.orientation;
}

export function orientationToString(): string {
    return windowManager.orientationToString;
}

export async function run(_config: SharkConfig) {
    canvas = _config.canvas;
    http = _config.http;
    xml = _config.xml;
    langManager = _config.langManager;
    let response = await http.get('http://localhost:3001/layout/main.xml');
    // console.log(response);
    let layout: Element = xml.parse(response);
    console.log(layout);
    console.log(xml.str(layout, 'data'));
    layoutManager = new LayoutManager(layout);
    let resource = layout.getElementsByTagName("resource")[0];
    resourceManager = new ResourceManager(resource);
    console.log("langManager", langManager.lang);
    // resourceManager.add('text', `assets/${langManager.lang}.json`);
    // resourceManager.add('text', `assets/en.json`);
    let data: any = json.parseFromData(xml.str(layout, 'data'));
    config.width = parseInt(data.width);//xml.num(app, "width", 800);
    // config.debug = data.debug;//xml.num(app, "width", 800);
    config.height = parseInt(data.height);//xml.num(app, "height", 600);
    config.resolution = data.resolution || 2;//xml.num(app, "resolution", 1);
    if (_config.isWx)
        config.orientation = data.wxorientation || 'portrait';
    else
        config.orientation = data.orientation || 'portrait';
    config.mobile = true;
    config.isWx = _config.isWx;
    // config.env = http.getQueryString('env');
    // config.platform = http.getQueryString('platform') || 'mobile';
    console.log(config.width, config.height);
    let opt = {
        view: canvas,
        backgroundColor: 0xffffff,
        // autoResize: true,
        autoDensity: true,
        antialias: true,
        resolution: 1,
        width: config.width,
        height: config.height,
    };
    renderer = PIXI.autoDetectRenderer(config.width, config.height, opt);
    stage = new PIXI.Container();
    // stage.name = "global";
    stage.addChild(sceneManager.sceneContainer);
    stage.pivot.set(config.width / 2, config.height / 2);
    console.log("layoutManager.startSceneName ", layoutManager.startSceneName);
    if (layoutManager.startSceneName)
        sceneManager.replace(layoutManager.startSceneName);

    // serviceManager.register('layout', new LayoutService());
    // serviceManager.startup();

    // request.send('test', { data: 'aaa' });
    let ticker: any = PIXI.ticker;
    ticker.shared.add(update);
    windowManager.on();
    // console.log(orientation());
    if (_ready) _ready();
}

function update(elapsedFrames: number) {
    renderer.render(stage);
    if (sceneManager.current) {
        let updates = sceneManager.current.updates;
        for (let k in updates) {
            updates[k].func.apply(updates[k].obj);
        }
    }
}

export function create<T>() {
    console.log("created");
}