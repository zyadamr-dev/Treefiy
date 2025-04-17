import fs from "fs";
import path from "path";

/**
 * Check whether the file or directory is hidden.
 *
 * @param {string} filePath - Full path to the file or directory.
 * @returns {boolean} - True if hidden, otherwise false.
 */
function isHidden(filePath) {
    const fileName = path.basename(filePath);
    return fileName.startsWith(".");
}

/**
 * Get a preview of file content (first few lines).
 *
 * @param {string} filePath - Full path to the file.
 * @param {number} [numOfLines=3] - Number of lines to extract.
 * @returns {string} - Concatenated preview content.
 */
function getContent(filePath, numOfLines = 3) {
    const file = fs.readFileSync(filePath, "utf-8");
    const lines = file.split(/\r\n|\n|\r/);
    return lines.slice(0, numOfLines).join(", ").replace(",", " ");
}

/**
 * Format bytes into human-readable string.
 *
 * @param {number} bytes - Size in bytes.
 * @param {number} [decimals=2] - Decimal places.
 * @returns {string} - Formatted size string.
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Format Unix permission mode to readable string.
 *
 * @param {number} permission - File permission mode.
 * @returns {string} - Readable permission string.
 */
function formatPermission(permission) {
    const perm = permission & 0o777;
    const mapping = [
        "---", "--x", "-w-", "-wx", "r--", "r-x", "rw-", "rwx"
    ];
    const owner = mapping[(perm >> 6) & 7];
    const group = mapping[(perm >> 3) & 7];
    const others = mapping[perm & 7];
    return owner + group + others;
}

/**
 * Check if a given path is a directory.
 *
 * @param {string} dirPath - Path to check.
 * @returns {boolean} - True if it's a directory.
 */
export function isDir(dirPath) {
    return fs.lstatSync(dirPath).isDirectory();
}

/**
 * Return contents of a directory.
 *
 * @param {string} dirPath - Directory path.
 * @returns {string[]} - List of file and directory names.
 */
export function dirContains(dirPath) {
    return fs.readdirSync(dirPath);
}

/**
 * Get all files in a given directory with optional metadata.
 *
 * @param {string} [pth=process.cwd()] - Path to scan.
 * @param {object} [config={}] - Configuration for filters and metadata.
 * @param {string[]} [config.fileTypes=[]] - Include only specific file types (extensions).
 * @param {boolean} [config.showHidden=false] - Include hidden files.
 * @param {boolean} [config.showSize=false] - Include file size.
 * @param {boolean} [config.showExtention=false] - Include file extension.
 * @param {boolean} [config.showContentFile=false] - Include content preview for supported files.
 * @param {boolean} [config.showLastModified=false] - Include last modified date.
 * @param {boolean} [config.showPermission=false] - Include file permission string.
 * @returns {object} - Object with file names as keys and metadata as values.
 */
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

            if (fileTypes.length > 0 && !fileTypes.includes(ext)) return;

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
                        modified_at: stats.mtime.toISOString().split("T")[0]
                    })
                };
            }
        }
    });

    return files;
}

/**
 * Get all subdirectories in a given path.
 *
 * @param {string} [pth=process.cwd()] - Directory path.
 * @returns {object} - Object of directory names and basic info.
 */
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
