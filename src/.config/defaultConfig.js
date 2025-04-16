import outputFormats from "../constants/outFormat.js";

const defaultConfig = {
    pth: process.cwd(),
    fileTypes: [],
    skipDirs: [],
    showHidden: false,
    maxDepth: 3,
    showContentFile: false,
    showExtention: true,
    showSize: false,
    showPermission: false,
    showLastModified: false,
    toSave: false,
    fileToSave: "output",
    outputFormat: outputFormats.JSON, // TODO: support .md format
    useColor: false // TODO: show colors or not in cli
};

export default defaultConfig;
