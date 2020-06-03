import * as types from '../type';

export class Xml implements types.Xml {

    public parse(str) {
        let parser = new DOMParser();
        return parser.parseFromString(str, "text/xml").documentElement;
    }

    public str(node: Element, key: string, defaultValue: string = ""): string {
        return this.attr(node, key, defaultValue);
    }

    public id(node: Element, defaultValue: string = ""): string {
        return this.attr(node, "id", defaultValue);
    }

    public attr(node: Element, key: string, defaultValue = undefined): any {
        if (!node) {
            return defaultValue;
        }
        if (node.attributes[key]) {
            return node.attributes[key].value;
        }
        return defaultValue;
    }

    public forEachElement(root: Node, handler: (curr: Element, i: number) => void) {
        if (!root) {
            return;
        }
        let nodes = root.childNodes;
        let count = nodes.length;
        for (let i = 0; i < count; i++) {
            let node = root.childNodes[i];
            if (node.nodeType === Node.ELEMENT_NODE) {
                handler(node as Element, i);
            }
        }
    }

    public forEachElementReverse(root: Node, handler: (curr: Element, i: number) => void) {
        if (!root) {
            return;
        }
        let nodes = root.childNodes;
        let count = nodes.length;
        for (let i = count - 1; i >= 0; i--) {
            let node = root.childNodes[i];
            if (node.nodeType === Node.ELEMENT_NODE) {
                handler(node as Element, i);
            }
        }
    }
}