import { DisplayObject2 } from "./displayObject";
import { display } from "../core/decorator";
// import * as PIXI from 'pixi.js'

@display()
export class Scene extends PIXI.Container {
    // container;
    sceneName: string;
    maskPanel: PIXI.Graphics;
    updates = [];
    private startViewTime: number;
    constructor() {
        super();
        console.log('new scene');


        this.interactive = true;
        this.buttonMode = true;

        this.on("click", this.buttonClickedHandler)
            .on("tap", this.buttonClickedHandler)
            ;
    }

    buttonClickedHandler(e) {
        console.log("scene click", e.data.global);
    }

    enter(args?) {
        this.startViewTime = (new Date()).getTime();
    }

    exit() {
        let stayTime = (new Date()).getTime() - this.startViewTime;
        this.updates = [];
    }

    // addMask(color = 0) {
    //     if (this.maskPanel == undefined)
    //         this.maskPanel = graphic.rectangle(director.config.width, director.config.height, color);
    //     this.maskPanel.interactive = true;
    //     this.addChild(this.maskPanel);
    // }

    // removeMask() {
    //     if (this.maskPanel)
    //         this.removeChild(this.maskPanel);
    // }

}
