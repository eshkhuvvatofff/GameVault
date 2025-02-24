import figlet from "figlet";
import chalk from "chalk";

console.log(
  chalk.cyan(
    figlet.textSync("GameVault", {
      font: "Small",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  )
);

console.log(chalk.green("Welcome to GameVault! 🚀"));
console.log(chalk.magenta("A new era of gaming begins here. 🔥"));
console.log(chalk.blue("Unleash, explore, and conquer. 🎮"));