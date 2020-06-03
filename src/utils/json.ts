export function parseFromData(data: string) {
    let obj = {};
    let props = data.split(';');
    for (let k in props) {
        if (props[k].trim() == "") continue;
        let pArr = props[k].split(':');
        let name = pArr[0].trim();
        let value = pArr[1].trim();
        obj[name] = value;
    }
    return obj;
}