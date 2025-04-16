import { loadDefault, saveConfigs } from "./index.js";
import { setCurrentConfig } from "../.config/cached-config/cachedConfig.js";

function toBool(val) {
    if (val === "true") {
        return true;
    }
    if (val === "false") {
        return false;
    }
    return val;
}

export function parseConfig(args) {
    const updatedConfig = loadDefault();
    const flagKeys = Object.keys(args).filter((k) => k !== "_");

    flagKeys.forEach((key) => {
        updatedConfig[key] = toBool(args[key]);
    });

    const newConfig = saveConfigs(updatedConfig);
    setCurrentConfig(newConfig);

    return newConfig;
}
