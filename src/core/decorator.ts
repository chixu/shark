//class can be displayed on layout
export let layoutTypes: { [key: string]: any } = {};
//properties are passed into contructor when Factory.create is called
export let consturctorProps: { [key: string]: string[] } = {};
export let consturctorAllProps: { [key: string]: number } = {};


// export function display(type: Function, properties?: string) {
//     console.log(type['name']);
//     console.log(properties);
//     displayTypes[type['name']] = type;
// }

export function display(properties?: string): ClassDecorator {
    // displayTypes[type['name']] = type;
    return function (target: any) {
        if (properties == 'all')
            consturctorAllProps[target.name] = 1;
        else if (properties)
            consturctorProps[target.name] = properties.split(',');
        // console.log(type['name']);
        // console.log(target.name, properties);
        layoutTypes[target.name] = target;
    };
}
