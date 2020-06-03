import { display } from "../core/decorator";
import { DisplayObject2 } from "./displayObject";
import * as graphics from "../utils/graphics";
//import * as PIXI from 'pixi.js'

type CircleConfig = {
    radius: number, color?: number
}

@display()
export class Circle extends DisplayObject2 {

    circle: PIXI.Graphics;
    constructor(config: CircleConfig) {
        super(config);
        this.circle = graphics.circle(config.radius, config.color);
        this.addChild(this.circle);
    }
}
