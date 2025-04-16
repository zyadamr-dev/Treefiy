import { getAllDirs, getAllFiles, isDir } from "../utils/index.js";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import logger from "../.config/logger.js";

export class Visualizer {
    constructor(config) {
        this._config = config;

        const {
            pth,
            fileTypes = [],
            skipDirs = [],
            showHidden,
            maxDepth,
            showSize,
            showPermission,
            showContentFile,
            showExtention,
            showLastModified,
            useColor,
            toSave,
            fileToSave,
            outputFormat
        } = this._config;

        this.pth = pth;
        this.fileTypes = fileTypes;
        this.skipDirs = skipDirs;
        this.showHidden = showHidden;
        this.maxDepth = maxDepth;
        this.showSize = showSize;
        this.showPermission = showPermission;
        this.showContentFile = showContentFile;
        this.showLastModified = showLastModified;
        this.showExtention = showExtention;
        this.toSave = toSave;
        this.fileToSave = fileToSave;
        this.useColor = useColor;
        this.outputFormat = outputFormat;
    }

    generateTree(pth = this.pth, depth = this.maxDepth) {
        if (!isDir(pth)) {
            logger.error(chalk.red("You should enter a valid directory path"));
            process.exit(1);
        }

        if (depth === 0) {
            return null;
        }

        const tree = {};
        const dirs = getAllDirs(pth);

        for (const [dirName, dirInfo] of Object.entries(dirs)) {
            if (this.skipDirs.includes(dirName)) continue;

            const fullDirPath = path.join(pth, dirName);
            tree[dirName] = {
                ...dirInfo,
                children: this.generateTree(fullDirPath, depth - 1)
            };
        }

        const files = getAllFiles(pth, this._config);
        for (const [fileName, fileData] of Object.entries(files)) {
            tree[fileName] = fileData;
        }

        if (pth === this.pth && this.toSave) {
            fs.writeFileSync(
                `${this.fileToSave}.${this.outputFormat}`,
                JSON.stringify(tree)
            );
            logger.info(
                chalk.bold.green(
                    `Tree has been saved to ${this.fileToSave}.${this.outputFormat} successfully`
                )
            );
        }

        if (pth === this.pth) {
            this.tree = tree;
        }

        return tree;
    }

    drawCliTree(pth = this.pth, prefix = "") {
        const items = fs.readdirSync(pth);
        const total = items.length;

        items.forEach((item, index) => {
            const fullPath = path.join(pth, item);
            const isDirectory = isDir(fullPath);
            const isLastItem = index === total - 1;

            const connector = isLastItem ? "└── " : "├── ";

            let name;
            if (isDir(fullPath)) {
                if (this.skipDirs.includes(path.basename(fullPath))) {
                    return;
                }
                name = chalk.bold.cyan(`📁 ${item}`);
            } else {
                if (item.startsWith(".")) {
                    if (!this.showHidden) {
                        return;
                    } else {
                        name = chalk.gray(`🔒 ${item}`);
                    }
                } else {
                    name = chalk.white(`📄 ${item}`);
                }
            }

            console.log(prefix + connector + name);

            const newPrefix = prefix + (isLastItem ? "    " : "│   ");

            if (isDirectory) {
                this.drawCliTree(fullPath, newPrefix);
            }
        });
    }

    search(searchedItem, currentDir = this.pth) {
        const foundIn = [];
        const items = fs.readdirSync(currentDir);

        for (const item of items) {
            const itemPath = path.join(currentDir, item);
            if (item === searchedItem) {
                foundIn.push(itemPath.replaceAll("\\", "/"));
            }

            if (isDir(itemPath)) {
                const results = this.search(searchedItem, itemPath);
                foundIn.push(...results);
            }
        }
        return foundIn;
    }
}
