import * as shark from "../shark";
import * as types from "../type";
import { get, image } from "../utils/http.wx";
//import * as PIXI from 'pixi.js'


export class ResourceManager implements types.ResourceManager {
  private resources: {
    [id: string]: {
      id: string,
      src: string,
      type: string,
      data?: any
    }
  } = {};
  private txtresources;
  public loader: PIXI.loaders.Loader;
  // public loader: any;
  // private items = []
  private _progress;
  private _complete;
  public init(data: Element) {
    // super();
    shark.xml.forEachElement(data, e => this.add(shark.xml.id(e), shark.xml.attr(e, 'src'), e.tagName));
    this.loader = PIXI.loader;
    this.loader.on('progress', (_, data: any) => {
      console.log("loader progress");
      for (let k in this.resources) {
        let d = this.resources[k];
        if (d.src == data.url) {
          if (d.type == 'image')
            d.data = data.texture;
          else if (d.type == 'json')
            d.data = data.data;
          // console.log(data);
        }
      }
      if (this._progress) this._progress();
    });
    this.loader.on('complete', () => {
      console.log("load images complete");
      this.loader.reset();
      this.loadTexts();
    });
    console.log(this.resources);
  }

  //add resource
  public add(id: string, src: string, type: string = 'json') {
    if (this.resources[id]) {
      console.warn('resource ', id, ' has been taken');
      return;
    }
    let data = {
      id: id,
      src: src,
      type: type
    };
    this.resources[id] = data;
  }

  public progress(func) {
    this._progress = func;
  }

  public complete(func) {
    this._complete = func;
  }

  public resource(name: string) {
    return this.resources[name] ? this.resources[name].data : undefined;
  }

  public load(ids: string[]) {
    this.txtresources = [];
    for (let k in ids) {
      let id = ids[k];
      console.log(k, id);
      if (this.resources[id]) {
        // this.items.push({ id, src: this.resources[id].src });
        if (isImage(this.resources[id].src)) {
          this.loader.add(id, this.resources[id].src);
        } else {
          this.txtresources.push({ id, src: this.resources[id].src });
        }
      } else {
        console.warn('no such resource ', id);
      }
    }
    this.loader.load();
    // return this.loadItems();
  }

  private loadTexts() {
    let promise = Promise.resolve();
    for (let i = 0; i < this.txtresources.length; i++) {
      let item = this.txtresources[i];
      let id = item.id;
      promise = promise.then(() => {
        return get(item.src).then(data => {
          console.log("loadTexts", id, data);
          for (let k in this.resources) {
            let d = this.resources[k];
            if (d.id == id) {
              // if (d.type == 'json')
              //   d.data = JSON.parse(data);
              // else
              d.data = data;
            }
          }
        });
      })
    }
    promise.then(() => {
      // this.items = [];
      console.log("all completed");
      if (this._complete) this._complete();
    })
    return promise;
  }
}

function getExtension(str: string): string {
  let idx = str.lastIndexOf('.');
  if (idx > -1) {
    return str.substr(idx + 1);
  } else
    return '';
}

function isImage(str: string): boolean {
  let ext = getExtension(str);
  return ["jpg", "png", "jpeg"].indexOf(ext) > -1;
}
