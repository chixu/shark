import * as shark from "../shark";
import * as types from "../type";
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
  // public loader: PIXI.loaders.Loader;
  public loader: any;
  private _progress;
  private _complete;
  // constructor(data: Element) {
  //   // super();
  // }

  public init(data: Element) {
    shark.xml.forEachElement(data, e => this.add(shark.xml.id(e), shark.xml.attr(e, 'src'), e.tagName));
    this.loader = PIXI.loader;
    this.loader.on('progress', (_, data: any) => {
      console.log("loader progress", typeof (data), data);
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
      console.log("loader complete");
      this.loader.reset();
      if (this._complete) this._complete();
    });
    console.log(this.resources);
  }
  //add resource
  public add(id: string, src: string, type: string = 'json') {
    if (this.resources[id]) {
      console.warn('resource ', id, ' has been taken');
      return;
    }
    this.resources[id] = {
      id: id,
      src: src,
      type: type
    }
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
    for (let k in ids) {
      let id = ids[k];
      console.log(k, id);
      if (this.resources[id]) {
        this.loader.add(id, this.resources[id].src);
      } else {
        console.log('no such resource ', id);
      }
    }
    this.loader.load();
  }
}
