export function colorToHex(i: number) {
    var bbggrr = ("000000" + i.toString(16)).slice(-6);
    var rrggbb = bbggrr.substr(4, 2) + bbggrr.substr(2, 2) + bbggrr.substr(0, 2);
    return "#" + rrggbb;
}

export function hexToColor(rrggbb: string) {
    if (rrggbb.length == 7) rrggbb = rrggbb.substr(1);
    // var bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
    // console.log(bbggrr);
    return parseInt(rrggbb, 16);
}