
import { display } from "../core/decorator";
import { Label } from "./label";
import * as shark from "../shark";

@display()
export class LangLabel extends Label {

    constructor(config) {
        super(config);
        this.value = this.value;
    }
}

Object.defineProperty(LangLabel.prototype, "value", {
    get: function () {
        return this.text.text;
    },
    set: function (txt) {
        this.text.text = shark.langManager.translate(txt);
        this.update();
    }
});