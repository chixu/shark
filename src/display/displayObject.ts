import { Map } from "../type";
import { Component } from "../component/component";
//import * as PIXI from 'pixi.js'
// @display()
export class DisplayObject2 extends PIXI.Container {
    // 
    components: Map<Component> = {};
    // config: any;
    public config: any;
    constructor(_config: any) {
        super();
        this.config = _config;
    }

    addComponent(comp: Function | Component) {
        if (comp instanceof Component) {
            this.components[typeof comp] = comp;
            return comp;
        } else {
            let type: any = comp;
            this.components[type.name] = new type(this);
            return this.components[type.name];
        }
    }

    getComponent<T extends Component>(comp: Function | string) {
        let compName;
        if (typeof comp == "string") {
            compName = comp;
        } else
            compName = comp['name'];
        return this.components[compName];
    }

    // addChild(obj: DisplayObject | any) {
    //     super.addChild(obj);
    //     return obj;
    // }

    // removeChild(obj: DisplayObject) {
    //     super.removeChild(obj);
    //     return obj;
    // }

    public created(scene) {
        if (this.config && this.config.id) {
            let id = this.config.id;
            let ids = id.split('.');
            let obj = scene;
            for (let i = 0; i < ids.length - 1; i++) {
                if (obj[ids[i]] == undefined) {
                    console.warn('id: ', id, ' is not found');
                    return;
                } else
                    obj = obj[ids[i]];
            }
            obj[ids[ids.length - 1]] = this;
        }
    }

    public layout(layout) {
        for (let k in layout) {
            let v = layout[k];
            if (k === "scale") {
                this.scale.set(v[0], v[1]);
            } else if (k === "pivot") {
                v = v.map((str, idx) => {
                    if (str.indexOf('%') > -1) {
                        let bound = this.getLocalBounds();
                        return parseFloat(str.substr(0, str.length - 1)) / 100 * (idx == 0 ? bound.width : bound.height);
                    } else
                        return parseFloat(str);
                });
                this.pivot.set(v[0], v[1]);
            } else
                this[k] = v;
        }
    }
}
