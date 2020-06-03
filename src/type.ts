
export enum Orientation {
    Landscape,
    Portrait,
    Default
}

export interface Map<T> {
    [key: string]: T;
}

export interface SharkConfig {
    canvas: any,
    http: Http,
    xml: Xml,
    isWx: boolean,
    langManager: LangManager,
    resourceManager: ResourceManager
}

export interface Http {
    get(url: string);
    getQueryString?(key: string): string;
}

export interface Xml {
    str(node: any, key: string, defaultValue?: string): string;
    id(node: Element, defaultValue?: string): string;
    attr(node: any, key: string, defaultValue?: string): string;
    parse(str: string): any;
    forEachElement(root: Node, handler: (curr: Element, i: number) => void);
    forEachElementReverse(root: Node, handler: (curr: Element, i: number) => void);
}


export interface LangManager {
    translate(key: string): string;
    lang: string;
}

export interface ResourceManager {
    init(data: Element);
    add(id: string, src: string, type?: string);
    load(ids: string[]);
    resource(name: string);
    complete(completeHandler: Function);
}