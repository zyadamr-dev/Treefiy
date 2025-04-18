import open from "open";
import { execSync } from "child_process";
import { spawn } from "child_process";
import logger from "../../.config/logger.js";
import path from "path";
import { fileURLToPath } from "url";
import { spinner } from "../../utils/index.js";
import { Visualizer } from "../../core/index.js";

// Setup for __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths to the UI and server directories
const uiDir = path.resolve(__dirname, "../../core/ui");
const serverDir = path.resolve(__dirname, "../../../");

/**
 * Runs the visualizer server and UI.
 *
 * This function:
 * 1. Generates the folder tree using the Visualizer class.
 * 2. Spawns the backend server.
 * 3. Starts the React frontend UI.
 * 4. Opens the browser to view the tree with passed configuration.
 *
 * @param {Object} config - Configuration parsed from CLI arguments. Should include fields expected by the backend and frontend.
 * @param {string[]} [args=[]] - Optional additional CLI arguments (currently unused).
 * @returns {void}
 */
export function run(config, args = []) {
    const v = new Visualizer(config);

    try {
        spinner.start("Generating folder tree...");
        const tree = v.generateTree();
        spinner.succeed("Folder tree generated.");
        console.dir(tree, { depth: config.maxDepth });
    } catch (err) {
        spinner.fail("Failed to generate folder tree.");
        logger.error(err);
        return;
    }

    const url = `http://localhost:3000`;
    const query = new URLSearchParams(config).toString();
    const urlquery = url + `/api/tree?${query}`;

    (async () => {
        try {
            spinner.start("Running server...");
            // Start the backend server
            const server = spawn("npm", ["start"], {
                cwd: serverDir,
                shell: true,
                stdio: "inherit"
            });
            spinner.succeed("Server is running.");

            spinner.start("Starting React UI...");
            // Start the frontend (React UI)
            const ui = execSync(`npm start`, {
                cwd: uiDir,
                shell: true,
                stdio: "ignore"
            });
            spinner.succeed("React UI started.");

            // Open the browser to the generated URL
            await open(urlquery);
            spinner.succeed(`Browser opened: ${url}`);
            logger.info(`Browser opened to: ${url}`);
        } catch (error) {
            spinner.fail(
                "Something went wrong while starting UI or opening the browser."
            );
            logger.error("Error executing or opening the frontend:", error);
        }
    })();
}
