"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatString = void 0;
function formatString(str, args) {
    for (var _i = 0, _a = Object.entries(args); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        str = str.replace(new RegExp("{" + key + "}", "gi"), value);
    }
    var restMatch = str.match(/\{[a-zA-Z0-9]+\}/ig);
    if (restMatch === null || restMatch === void 0 ? void 0 : restMatch.length) {
        throw new TypeError("Unmatched params " + restMatch);
    }
    return str;
}
exports.formatString = formatString;
;
