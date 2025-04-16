import chalk from "chalk";

export function run() {
    console.log(chalk.bold("\nWelcome To Treefiy 👋❤️\n"));

    console.log(chalk.yellow("Available Commands:"));
    console.log(
        `  ${chalk.cyan("gen-tree")}                Visualize folder structure with UI`
    );
    console.log(
        `  ${chalk.cyan("draw-cli")}                Visualize folder structure in terminal`
    );
    console.log(
        `  ${chalk.cyan("search <name>")}           Search for a file or folder by name`
    );
    console.log(
        `  ${chalk.cyan("help")}                    Show this help message`
    );

    console.log(chalk.yellow("\nConfigurable Flags:"));
    console.log(
        `  ${chalk.green("--pth")}                  Root path to start (default: current dir)`
    );
    console.log(
        `  ${chalk.green("--fileTypes")}            Filter by file extensions (e.g. --fileTypes=js --fileTypes=pdf)`
    );
    console.log(
        `  ${chalk.green("--skipDirs")}             Directories to skip (e.g. --skipDirs=node_modules --skipDirs=build)`
    );
    console.log(
        `  ${chalk.green("--showHidden")}           Show hidden files (default: false)`
    );
    console.log(
        `  ${chalk.green("--maxDepth")}             Maximum depth to traverse (default: 3)`
    );
    console.log(
        `  ${chalk.green("--showContentFile")}      Show content inside files (default: false)`
    );
    console.log(
        `  ${chalk.green("--showExtention")}        Show file extensions (default: true)`
    );
    console.log(
        `  ${chalk.green("--showSize")}             Show file sizes (default: false)`
    );
    console.log(
        `  ${chalk.green("--showPermission")}       Show file permissions (default: false)`
    );
    console.log(
        `  ${chalk.green("--showLastModified")}     Show last modified date (default: false)`
    );
    console.log(
        `  ${chalk.green("--toSave")}               Save the output to a file (default: false)`
    );
    console.log(
        `  ${chalk.green("--fileToSave")}           Name of the output file (default: output)`
    );
    console.log(
        `  ${chalk.green("--outputFormat")}         Output format (json, text, tree)`
    );
    console.log(
        `  ${chalk.green("--useColor")}             Enable colored output (default: true)`
    );

    console.log(chalk.yellow("\nExamples:"));
    console.log(
        `  ${chalk.cyan("treefiy draw-cli")} --pth=./src --maxDepth=2 --showHidden=true`
    );
    console.log(
        `  ${chalk.cyan("treefiy search Note.txt")} --showLastModified=true --showSize=true`
    );
    console.log(
        `  ${chalk.cyan("treefiy gen-tree")} --toSave=true --fileToSave=tree --outputFormat=json`
    );
    console.log(
        `  ${chalk.cyan("treefiy gen-tree")} --skipDirs=node_modules --skipDirs=build`
    );

    console.log("");
}
