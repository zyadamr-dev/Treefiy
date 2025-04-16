#!/usr/bin/env node
import minimist from "minimist";
import { parseConfig } from "../utils/index.js";
import cmdAlias from "../constants/cmdAlias.js";
import chalk from "chalk";
import logger from "../.config/logger.js";

const args = minimist(process.argv.slice(2), {
    alias: cmdAlias
});

(async function () {
    const [mainCommand, ...subCommands] = args._;
    const config = parseConfig(args);

    try {
        const command = await import(`./commands/${mainCommand}.js`);

        if (command?.run) {
            command.run(config, subCommands);
        } else {
            logger.error(
                chalk.red(`No 'run' method found for command: ${mainCommand}`)
            );
        }
    } catch (error) {
        logger.error(chalk.red(`${error}`));
    }
})();
