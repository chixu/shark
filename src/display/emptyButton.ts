import * as shark from "../shark";
import { display } from "../core/decorator";
import { DisplayObject2 } from "./displayObject";
import * as graphics from "../utils/graphics";
//import * as PIXI from 'pixi.js'
// type ButtonOption = {
//   up: PIXI.Texture,
//   down?: PIXI.Texture,
//   disabled?: PIXI.Texture,
//   command: string,
//   //displacement X Y when button is down.
//   dx: number,
//   dy: number
// }

@display()
export class EmptyButton extends DisplayObject2 {
    // sprite: PIXI.Sprite;
    //onClickHandler: Function;
    private _enabled: boolean = true;
    public upHandler: Function;
    public downHandler: Function;
    public clickHandler: Function;
    // private upTexture: PIXI.Texture;
    // private downTexture: PIXI.Texture;
    // private disabledTexture: PIXI.Texture;
    // command: string;

    constructor(config: { width: number, height: number }) {
        super(config);
        let rect = graphics.rectangle(config.width, config.height);
        rect.alpha = shark.config.debug ? .2 : 0;
        this.addChild(rect);
        // this.upTexture = options.up;
        // this.downTexture = options.down;
        // this.disabledTexture = options.disabled;
        // this.sprite = new PIXI.Sprite(this.upTexture);
        // this.addChild(this.sprite);
        this.interactive = true;
        // this.command = options.command;
        // this.interactiveChildren = false;
        this.buttonMode = true;

        this.on('mousedown', this.buttonDownHandler)
            .on('touchstart', this.buttonDownHandler)
            .on('mouseup', this.buttonUpHandler)
            .on('touchend', this.buttonUpHandler)
            .on('mouseupoutside', this.buttonUpHandler)
            .on('touchendoutside', this.buttonUpHandler)
            .on("click", this.buttonClickedHandler)
            .on("tap", this.buttonClickedHandler)
            ;
    }

    private buttonDownHandler(e) {
        if (!this._enabled) return;
        // if (this.downTexture) {
        //     this.sprite.texture = this.downTexture;
        // }
        // this.sprite.x = this.options.dx;
        // this.sprite.y = this.options.dy;
        // builder.callHandler('onDown', this);
        if (this.downHandler)
            this.downHandler(this);
    }

    private buttonUpHandler(e) {
        // console.log(e);
        if (!this._enabled) return;
        // this.sprite.texture = this.upTexture;
        // this.sprite.x = 0;
        // this.sprite.y = 0;
        // builder.callHandler('onUp', this);
        if (this.upHandler)
            this.upHandler(this);
    }

    private buttonClickedHandler() {
        if (!this._enabled) return;
        // if (!builder.callHandler('onClick', this) && this.command) {
        //     director.inputManager.emit(this.command, { source: InputSource.Mouse, context: this });
        // }
        // this.activate();
        if (this.clickHandler)
            this.clickHandler(this);
    }

    public set enabled(value: boolean) {
        this._enabled = value;
        this.buttonMode = value;
    }

    public get enabled() {
        return this._enabled;
    }

    public created(scene) {
        super.created(scene);
        console.log('created ', this.config);
        if (this.config) {
            if (this.config.up)
                this.upHandler = () => scene[this.config.up]();
            if (this.config.down)
                this.downHandler = () => scene[this.config.down]();
            if (this.config.click)
                this.clickHandler = () => scene[this.config.click]();
        }
    }
    // static create(node: Element, args: builder.BuildArgs) {
    //     let resources = director.resourceManager;
    //     let up = resources.resolve(xml.str(node, "up")) as PIXI.Texture;
    //     let down = undefined;
    //     if (xml.has(node, "down")) {
    //         down = resources.resolve(xml.str(node, "down")) as PIXI.Texture;
    //     }
    //     let disabled = undefined;
    //     if (xml.has(node, "disabled")) {
    //         disabled = resources.resolve(xml.str(node, "disabled")) as PIXI.Texture;
    //     }
    //     let button = new Button({
    //         up: up,
    //         down: down,
    //         disabled: disabled,
    //         command: xml.str(node, "command"),
    //         dx: xml.num(node, "dx"),
    //         dy: xml.num(node, "dy")
    //     });
    //     builder.setHandlers(button, node, args);
    //     if (xml.bool(node, "debug")) {
    //         builder.showHitArea(button);
    //     }
    //     builder.createChildren(node, {
    //         scene: args.scene,
    //         parent: button,
    //         context: args.context
    //     });
    //     builder.setProperties(button, node, args);
    //     return button;
    // }

}
