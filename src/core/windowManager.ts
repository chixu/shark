import * as shark from "../shark";
import { Orientation } from "../type";
// @Register({ tag: "layoutService", category: "service" })
export class WindowManager {

    //   private orientationService: OrientationService;
    private prevOrientation;
    resizeChecker: number;
    windowHeight: number;
    windowWidth: number;

    constructor() {

    }

    get orientation(): Orientation {
        if (window.innerHeight <= window.innerWidth) {
            return Orientation.Landscape;
        } else {
            return Orientation.Portrait;
        }
    }

    get orientationToString() {
        return Orientation[this.orientation];
    }

    public on() {
        this.resizeChecker = setInterval(() => this.checkResize(), 30);
        this.checkResize();
    }

    private checkResize() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        if (this.windowHeight !== h || this.windowWidth !== w) {
            this.windowHeight = h;
            this.windowWidth = w;
            if (shark.config.isWx) {
                this.layoutWx();
            } else {
                this.layout();
            }

            //   director.eventBus.emit(EVENT_RESIZE);
        }
    }

    public off() {
        // window.onresize = undefined;
        clearInterval(this.resizeChecker);
    }

    // private orientationChangedHandler() {
    //   console.log("orientationChangedHandler");
    //   if (this.orientationService.mode === "both") {
    //     director.sceneManager.current.applyLayout(orientation === Orientation.PORTRAIT ? "portrait" : "landscape");
    //   }
    //   this.layout();
    // }

    private layoutWx() {
        let config = shark.config;
        let orignalWidth = config.width;
        let orignalHeight = config.height;
        let orientMode = config.orientation;
        let width = window.innerWidth;
        let height = window.innerHeight;
        if (orientMode === "portrait") {
            orignalWidth = Math.min(orignalWidth, orignalHeight);
            orignalHeight = Math.max(orignalWidth, orignalHeight);
        } else {
            orignalWidth = Math.max(orignalWidth, orignalHeight);
            orignalHeight = Math.min(orignalWidth, orignalHeight);
        }
        let ratio = Math.min(width / orignalWidth, height / orignalHeight);
        shark.stage.position.set(0, 0);
        shark.stage.pivot.set(0, 0);
        // shark.stage.position.set(width / 2, height / 2);
        shark.renderer.resize(width, height);
        shark.stage.scale.set(ratio);
        PIXI.interaction.InteractionManager.prototype.mapPositionToPoint = (point, x, y) => {
            point.x = x
            point.y = y
        }
    }


    private layoutPortrait() {
        //todo
    }

    private layoutLandscape() {
        //todo
    }

    private layoutBoth() {
        //todo
    }

    private layout() {
        let config = shark.config;
        let orignalWidth = config.width;
        let orignalHeight = config.height;
        let rotation = 0;
        let orient = this.orientation;
        let orientMode = config.orientation;
        console.log("orientMode", orient, orientMode);
        // orientMode = "portrait";
        if (orientMode === "both" && orient === Orientation.Portrait) {
            //rotation = Math.PI / 2;
            orignalWidth = config.height;
            orignalHeight = config.width;
        } else if (config.mobile &&
            ((orientMode === "portrait" && orient === Orientation.Landscape) ||
                (orientMode === "landscape" && orient === Orientation.Portrait)
            )) {
            rotation = Math.PI / 2;
            orignalWidth = config.height;
            orignalHeight = config.width;
        }

        let ratio = Math.min(window.innerWidth / orignalWidth, window.innerHeight / orignalHeight);
        let width = Math.ceil(orignalWidth * ratio);
        let height = Math.ceil(orignalHeight * ratio);

        shark.stage.scale.set(ratio);
        shark.stage.rotation = rotation;
        if (orientMode === "both") {
            shark.stage.position.set(0, 0);
            shark.stage.pivot.set(0, 0);
        } else {
            shark.stage.position.set(width / 2, height / 2);
        }
        // shark.stage.position.set(width / 2, height / 2);
        shark.renderer.resize(width, height);

        let canvas = shark.canvas;
        canvas.style.marginLeft = ((window.innerWidth - width) / 2) + "px";
        canvas.style.marginTop = ((window.innerHeight - height) / 2) + "px";

        console.log("layout", window.innerWidth, window.innerHeight, ratio, canvas.style.marginLeft, canvas.style.marginTop);
        if (this.prevOrientation != orient && orientMode == "both") {
            console.log("orientation changed");
            shark.eventBus.emit(shark.events.OrientationChange);
        }
        this.prevOrientation = orient;
        this.scrollTop();
    }

    private scrollTop() {
        let device = shark.device;
        if (device.mobile) {
            if (device.android && !device.chrome) {
                window.scrollTo(0, 1);
            } else {
                window.scrollTo(0, 0);
            }
        }
    }
}
