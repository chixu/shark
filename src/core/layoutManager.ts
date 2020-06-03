// import * as xml from "../utils/xml";
import * as shark from "../shark";
import { Scene } from "../display/scene";

export class LayoutManager {
    public components = {};
    public scenes = {};
    public resouces = {};
    public startSceneName: string;

    constructor(public main: Element) {
        let comps = main.getElementsByTagName('component')[0];
        let scenes = main.getElementsByTagName('scene')[0];
        shark.xml.forEachElement(comps, e => {
            this.components[e.tagName] = e;
        });
        shark.xml.forEachElement(scenes, e => {
            // console.log('scene ', e);
            if (shark.xml.attr(e, 'start') == 'true') {
                this.startSceneName = e.tagName;
                // console.log('start scene ', this.startSceneName);
            }
            this.scenes[e.tagName] = e;
        })
    }

    public component(name: string) {
        return this.components[name];
    }

    public scene(name: string): any {
        return this.create(this.scenes[name]);
    }

    public create(layout: Element, scene?: Scene) {
        // console.log('layout create ', layout);
        let className = layout.tagName;
        className = className[0].toUpperCase() + className.substr(1);
        let obj = shark.factory.create(className, shark.xml.attr(layout, 'data'), scene);
        if (obj instanceof Scene)
            scene = obj;
        shark.xml.forEachElementReverse(layout, e => {
            let child = this.create(e, scene);
            // console.log(e, child);
            obj.addChild(child);
        })
        return obj;
    }
}
