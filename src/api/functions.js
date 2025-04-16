export function parseBoolean(value, fallback = false) {
    if (value === undefined) return fallback;
    return value === "true";
}

export function parseArray(value) {
    return typeof value === "string" && value.length > 0
        ? value.split(",").map((v) => v.trim())
        : [];
}
