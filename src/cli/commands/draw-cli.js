import { Visualizer } from "../../core/index.js";
import { spinner } from "../../utils/index.js";
import logger from "../../.config/logger.js";
import chalk from "chalk";

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
