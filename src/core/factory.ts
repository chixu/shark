import { layoutTypes, consturctorProps, consturctorAllProps } from "../core/decorator";
import * as colorUtils from "../utils/color";
import { Orientation } from "../type";
import { DisplayObject2 } from "../display/displayObject";
import { MultiLayout } from "../component/multiLayout";
import { SingleEventEmitter } from "./singleEventEmitter";
import * as shark from "../shark";
import { Scene } from "../display/scene";

export class Platform {
  static desktop: string = "desktop";
  static web: string = "web";
  static mini: string = "mini";
  static mobile: string = "mobile";
}

let postConstructorProperties = "x,y,alpha,pivot,scale,rotation,visible".split(',');
let numberProperties = "x,y,alpha,pivot,scale,rotation".split(',');

export class Factory {
  // constructor() {
  //   super();
  // }

  public create(classs: string | Function, data?: string, scene?: Scene) {
    let className;
    if (typeof classs == "string") {
      className = classs;
    } else
      className = classs['name'];
    if (layoutTypes[className]) {
      let obj;
      if (data) {
        obj = this.instantiateClassByParams(className, data);
      } else
        obj = new layoutTypes[className]();
      if (obj.created && scene)
        obj.created(scene);
      // this.emit(shark.events.Created, obj);
      return obj;
    } else {
      console.warn("class " + className + " is not defined");
    }
  }

  private instantiateClassByParams(className: string, data: string) {

    let props = data.split(';');
    let preProps = {};
    let postProps = {};
    let multiLayout = false;
    let layoutData = [{}, {}, {}];
    for (let k in props) {
      if (props[k].trim() == "") continue;
      let pArr = props[k].split(':');
      let propName = pArr[0].trim();
      let propValue = pArr[1].trim();
      let orient = Orientation.Default;
      if (propName.indexOf('-p') > -1) {
        orient = Orientation.Portrait;
        propName = propName.substr(0, propName.length - 2);
        multiLayout = true;
      } else if (propName.indexOf('-l') > -1) {
        orient = Orientation.Landscape;
        propName = propName.substr(0, propName.length - 2);
        multiLayout = true;
      }
      // console.log(propName, propValue);
      // if (consturctorAllProps[className] ||
      //   (consturctorProps[className] && consturctorProps[className].indexOf(propName) > -1)) {
      //   preProps[propName] = this.parseValue(propName, propValue);
      // } else {
      //   postProps[propName] = this.parseValue(propName, propValue);
      // }
      if (postConstructorProperties.indexOf(propName) == -1)
        preProps[propName] = this.parseValue(propName, propValue);
      else {
        layoutData[orient][propName] = this.parseValue(propName, propValue);
        // postProps[propName] = this.parseValue(propName, propValue);
      }
    }
    // console.log(preProps);
    let obj = new layoutTypes[className](preProps);
    if (obj instanceof DisplayObject2)
      obj.layout(layoutData[Orientation.Default]);
    if (multiLayout) {
      let multi: MultiLayout = obj.addComponent(MultiLayout);
      multi.layoutData = layoutData;
      multi.onOrientationChange();
    }
    // for (let k in postProps) {
    //   obj[k] = postProps[k];
    // }
    return obj;
  }

  private parseValue(name: string, value: string) {
    if (name == "color")
      return colorUtils.hexToColor(value);
    else if (name === "scale") {
      if (value.indexOf(",") !== -1) {
        return value.split(',').map(str => parseFloat(str));
      } else {
        return [value, value];
      }
    } else if (name === "pivot") {
      let arr = [value, value];
      if (value.indexOf(",") !== -1) {
        arr = value.split(',');
      }
      return arr;
    }
    return numberProperties.indexOf(name) > -1 ? parseFloat(value) : value;
  }
};
