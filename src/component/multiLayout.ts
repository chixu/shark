
import { Component } from "./component";
import { DisplayObject2 } from "../display/displayObject";
import * as shark from "../shark";

export class MultiLayout extends Component {
    layoutData: any;
    // gameObject:
    constructor(obj: DisplayObject2) {
        super(obj);
        console.log('MultiLayout created');
        obj.on('added', () => {
            console.log("object added");
            shark.eventBus.on(shark.events.OrientationChange, this.onOrientationChange, this);
        });
        obj.on('removed', () => shark.eventBus.off(shark.events.OrientationChange, this.onOrientationChange, this));
    }
    
    public onOrientationChange() {
        let o = shark.orientation();
        console.log("onOrientationChange ", this.layoutData, o);
        if (!this.layoutData || !this.layoutData[o]) return;
        this.gameObject.layout(this.layoutData[o]);
    }
}