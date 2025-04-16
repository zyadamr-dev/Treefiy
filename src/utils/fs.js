import fs from "fs";
import path from "path";

function isHidden(filePath) {
    const fileName = path.basename(filePath);
    return fileName.startsWith(".");
}

function getContent(filePath, numOfLines = 3) {
    const file = fs.readFileSync(filePath, "utf-8");
    const lines = file.split(/\r\n|\n|\r/);

    return lines.slice(0, numOfLines).join(", ").replace(",", " ");
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function formatPermission(permission) {
    const perm = permission & 0o777;

    const mapping = [
        "---", // 0
        "--x", // 1
        "-w-", // 2
        "-wx", // 3
        "r--", // 4
        "r-x", // 5
        "rw-", // 6
        "rwx" // 7
    ];

    const owner = mapping[(perm >> 6) & 7]; // highest 3 bits
    const group = mapping[(perm >> 3) & 7]; // next 3 bits
    const others = mapping[perm & 7]; // lowest 3 bits

    return owner + group + others;
}

export function isDir(dirPath) {
    return fs.lstatSync(dirPath).isDirectory();
}

export function dirContains(dirPath) {
    return fs.readdirSync(dirPath);
}

export function getAllFiles(pth = process.cwd(), config = {}) {
    const {
        fileTypes = [],
        showHidden,
        showSize,
        showExtention,
        showContentFile,
        showLastModified,
        showPermission
    } = config;

    const files = {};
    const items = fs.readdirSync(pth);
    const supportedFiles = ["pdf", "txt", "docx", "md", "markdown", "xml"];

    items.forEach((item) => {
        const fullPath = path.join(pth, item);
        const stats = fs.lstatSync(fullPath);

        if (stats.isFile()) {
            const fileName = path.basename(fullPath);
            const ext = path.extname(item).slice(1);

            if (fileTypes.length > 0 && !fileTypes.includes(ext)) {
                return;
            }

            if ((isHidden(fileName) && showHidden) || !isHidden(fileName)) {
                files[fileName] = {
                    name: !isHidden(fileName)
                        ? fileName.slice(0, fileName.lastIndexOf("."))
                        : fileName,
                    isDirectory: false,
                    ...(showExtention && { extention: ext }),
                    ...(showSize && { size: formatBytes(stats.size) }),
                    ...(showContentFile &&
                        supportedFiles.includes(ext) && {
                            content: getContent(fullPath)
                        }),
                    ...(showPermission && {
                        permission: formatPermission(stats.mode)
                    }),
                    ...(showLastModified && {
                        modified_at: stats.mtime.toString().split("T")[0]
                    })
                };
            }
        }
    });
    return files;
}

export function getAllDirs(pth = process.cwd()) {
    const dirs = {};

    const items = fs.readdirSync(pth);

    items.forEach((item) => {
        const fullPath = path.join(pth, item);
        const stats = fs.lstatSync(fullPath);

        if (stats.isDirectory()) {
            const dirName = path.basename(fullPath);
            const contents = dirContains(fullPath);

            dirs[dirName] = {
                name: dirName,
                isDirectory: true,
                children: contents || "..."
            };
        }
    });
    return dirs;
}
