import chalk from "chalk";
import logger from "../../.config/logger.js";
import { Visualizer } from "../../core/index.js";
import { spinner } from "../../utils/index.js";

export function run(config, args = []) {
    const visualizer = new Visualizer(config);
    const target = args[0];

    spinner.start(`Searching for "${target}"...`);

    try {
        const result = visualizer.search(target);

        spinner.succeed(
            chalk.bold.green(
                `Found "${target}" in ${result.length} location(s).`
            )
        );
        console.log(result.join("\n"));

        logger.info(chalk.green(`${target} has been found.`));
    } catch (error) {
        spinner.fail(chalk.bold.red(`Failed to search for "${target}".`));
        logger.error(error);
    }
}
