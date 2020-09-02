const os = require("os");
const chalk = require("chalk");
const Table = require("cli-table3");
const hourToString = require("./calc/uptime");
const { totalMem, freeMem } = require("./calc/memory");
const formattedSpeed = require("./calc/speed");

const table = new Table({
  head: ["Info", "Results"],
  colWidths: [25, 37],
});

let platform;

switch (os.platform()) {
  case "darwin":
    platform = "Darwin OS ";
    break;
  case "freebsd":
    platform = "FreeBSD ";
    break;
  case "linux":
    platform = "Linux ";
    break;
  case "sunos":
    platform = "SunOS ";
    break;
  case "win32":
    platform = "Windows ";
    break;
}

table.push(
  ["Total Memory", chalk.blue(totalMem)],
  ["Free Memory", chalk.greenBright(freeMem)],
  ["Host Name", chalk.yellow(os.hostname())],
  ["Platform", chalk.blueBright(platform)],
  ["OS Architecture", chalk.magentaBright(os.arch())],
  ["OS Type", chalk.cyanBright(os.type())],
  ["System Uptime", chalk.redBright(hourToString)],
  ["Processor", chalk.rgb(290, 133, 57)(os.cpus()[0].model.trim())],
  ["Processor Speed", chalk.rgb(53, 198, 21)(formattedSpeed)]
);

console.log(table.toString());
