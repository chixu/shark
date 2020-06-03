import { display } from "../core/decorator";
import { DisplayObject2 } from "./displayObject";
import * as graphics from "../utils/graphics";
// import * as PIXI from 'pixi.js'

type RectangleConfig = {
    width: number, height: number, color?: number
}

@display()
export class Rectangle extends DisplayObject2 {

    rect: PIXI.Graphics;
    constructor(config: RectangleConfig) {
        super(config);
        this.rect = graphics.rectangle(config.width, config.height, config.color);
        this.addChild(this.rect);
    }
}
