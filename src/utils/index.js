// utils/index.js
export * from "./fs.js";
export * from "./handleConfigs.js";
export * from "./parseConfig.js";
export * from "./spinner.js";
import * as fsUtils from "./fs.js";
import * as loadConfigUtils from "./fs.js";
import * as handleFlagsUtils from "./parseConfig.js";
import * as spinnerUtils from "./spinner.js";

export default {
    ...fsUtils,
    ...loadConfigUtils,
    ...handleFlagsUtils,
    ...spinnerUtils
};
