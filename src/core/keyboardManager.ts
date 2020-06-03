import * as shark from "../shark";

export class KeyboardManager {
    keys: string[] = [];

    private keyUpHandler(event) {
        if (event && event.key) {
            let key = event.key.toLowerCase();
            shark.eventBus.emit('key-up-' + key);
        }
    }

    private keyDownHandler(event) {
        if (event && event.key) {
            let key = event.key.toLowerCase();
            shark.eventBus.emit('key-down-' + key);
        }
    }

    constructor(data?: { [keys: string]: string }) {
        if (data) this.keys = data.keys.split(',');
        window.addEventListener("keydown", (e) => this.keyDownHandler(e));
        window.addEventListener("keyup", (e) => this.keyUpHandler(e));
    }

    public addListener(key: string, callback, context?) {
        shark.eventBus.on('key-' + key, callback, context);
    }

    public removeListeners() {
        let events = shark.eventBus.eventNames();
        for (let k in events) {
            let event: string = events[k];
            console.log(event);
            if (event.substr(0, 4) == 'key-')
                shark.eventBus.removeAllListeners(event);
        }
    }
}
