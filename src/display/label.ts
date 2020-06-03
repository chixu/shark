import { display } from "../core/decorator";
import { DisplayObject2 } from "./displayObject";
//import * as PIXI from 'pixi.js'

export type LabelConfig = {
    fontFamily?: any,
    fontSize?: any,
    fill?: any,
    value?: string,
    bitmap?: boolean,
    align?: string,
    case?: string,
    // comma?: boolean,
    // duration?: number,
    // decimalPlace?: number,
}

let nonStyleField = ['value', 'bitmap', 'align', 'case'];
@display()
export class Label extends DisplayObject2 {
    text: PIXI.Text;
    // text: PIXI.Text | PIXI.BitmapText;
    // hasComma: boolean = true;
    //decimal: number = 2;
    // _align: string = "left";
    // _anchorX: number = 0;
    // config: LabelConfig;

    constructor(config: LabelConfig) {
        super(config);
        // this.config = config;
        this.initText();
        this.update();
    }

    private initText() {
        let style: any = { fill: 0xffffff };
        let value = this.config.value || "";
        for (let k in this.config) {
            if (nonStyleField.indexOf(k) == -1)
                style[k] = this.config[k];
        }
        style.fontSize = 30;
        style.align = 'center';
        console.log('initText', style, value);
        if (this.config.bitmap) {
            // this.text = new PIXI.BitmapText(value, { font: { size: style.fontSize, name: style.fontFamily } });
            this.text.tint = style.fill;
        } else {
            this.text = new PIXI.Text(value, style);
        }
        console.log(this.text);
        this.addChild(this.text);
    }

    set value(txt: string) {
        this.text.text = txt;
        this.update();
    }

    set align(txt: string) {
        this.config.align = txt;
        this.update();
    }

    get value() {
        return this.text.text;
    }

    get anchorX(): number {
        if (this.config.align === "center") return 0.5;
        else if (this.config.align === "right") return 1;
        return 0;
    }

    update() {
        if (this.config.case === "upper")
            this.text.text = this.text.text.toUpperCase();
        else if (this.config.case === "lower")
            this.text.text = this.text.text.toLowerCase();
        // if (Number(this.text.text) !== NaN && this.hasComma)
        //     this.text.text = toComma(this.text.text);
        console.log(this.text.width);
        this.text.x = -this.text.width * this.anchorX;
    }

}
