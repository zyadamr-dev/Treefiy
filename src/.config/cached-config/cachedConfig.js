import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import defaultConfig from "../defaultConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cachePath = path.join(__dirname, "cachedConfig.json");

export function setCurrentConfig(config) {
    fs.writeFileSync(cachePath, JSON.stringify(config, null, 2));
}

export function getCurrentConfig() {
    if (fs.existsSync(cachePath)) {
        const data = fs.readFileSync(cachePath, "utf-8");
        return JSON.parse(data);
    }
    return defaultConfig;
}
