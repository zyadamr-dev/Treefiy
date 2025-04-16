import path from "path";
import fs from "fs";
import defaultConfig from "../.config/defaultConfig.js";
import { fileURLToPath } from "url";
import logger from "../.config/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadDefault() {
    const configPath = path.join(__dirname, "../.config/defaultConfig.js");

    if (fs.existsSync(configPath)) {
        try {
            return defaultConfig;
        } catch (err) {
            logger.error(`⚠️ Failed to load user config: ${err.message}`);
        }
    }
}

export function saveConfigs(updatedUserConfig) {
    return { ...defaultConfig, ...updatedUserConfig };
}
