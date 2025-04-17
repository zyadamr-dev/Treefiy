import path from "path";
import fs from "fs";
import defaultConfig from "../.config/defaultConfig.js";
import { fileURLToPath } from "url";
import logger from "../.config/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load the default config
 * 
 * @returns {object|null}
 */

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

/**
 * Merge default config with updated config
 * 
 * @param {object} updatedUserConfig 
 * @returns {object}
 */

export function saveConfigs(updatedUserConfig) {
    return { ...defaultConfig, ...updatedUserConfig };
}
