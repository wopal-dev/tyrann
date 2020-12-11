
export function formatString(str: string, args: object) {
    for (const [key, value] of Object.entries(args)) {
        str = str.replace(new RegExp(`\{${key}\}`, "gi"), value);
    }
    const restMatch = str.match(/\{[a-zA-Z0-9]+\}/ig);
    if (restMatch?.length) {
        throw new TypeError(`Unmatched params ${restMatch}`);
    }
    return str;
};
