#!/usr/bin/env node

/**
 * @fileoverview Entry point for the CLI tool.
 * It parses command-line arguments, resolves command aliases, loads configuration,
 * and dynamically imports and executes the appropriate command module.
 */

import minimist from "minimist";
import { parseConfig } from "../utils/index.js";
import cmdAlias from "../constants/cmdAlias.js";
import chalk from "chalk";
import logger from "../.config/logger.js";

/**
 * Parses command-line arguments using `minimist`, supporting aliases defined in `cmdAlias`.
 * @type {import("minimist").ParsedArgs}
 */
const args = minimist(process.argv.slice(2), {
    alias: cmdAlias
});

(async function () {
    /**
     * The main CLI command (e.g., 'init', 'build', etc.)
     * @type {string | undefined}
     */
    const [mainCommand, ...subCommands] = args._;

    /**
     * Configuration object parsed from CLI arguments.
     * Used to pass config options to command handlers.
     * @type {Object}
     */
    const config = parseConfig(args);

    try {
        /**
         * Dynamically import the corresponding command module.
         * The command file should export a `run` function.
         * @type {{ run: function(config: Object, args: string[]): void } | undefined}
         */
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

