import { Visualizer } from "../../core/index.js";
import { spinner } from "../../utils/index.js";
import logger from "../../.config/logger.js";
import chalk from "chalk";

/**
 * Executes the visualizer CLI command.
 * It initializes the Visualizer with the given config and attempts to draw the directory tree.
 *
 * @param {Object} config - The parsed configuration object from CLI arguments.
 * @param {string[]} [args=[]] - Additional CLI arguments passed to the command.
 * @returns {void}
 */
export function run(config, args = []) {
    const visualizer = new Visualizer(config);

    try {
        visualizer.drawCliTree();
        spinner.succeed(chalk.bold.green(`Tree drawn!`));
    } catch (error) {
        spinner.fail("Failed to draw tree");
        logger.error(error);
    }
}
