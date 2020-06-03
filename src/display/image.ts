import { display } from "../core/decorator";
import { DisplayObject2 } from "./displayObject";
import * as shark from "../shark";
// import * as PIXI from 'pixi.js'

@display()
export class Image extends DisplayObject2 {

    private sprite: PIXI.Sprite;

    constructor(config: { [src: string]: string }) {
        super(config);
        console.log('image ', config.src);
        console.log(typeof shark.resource(config.src));
        let texture: PIXI.Texture = shark.resource(config.src);
        this.sprite = new PIXI.Sprite(texture);
        this.addChild(this.sprite);
    }
}
