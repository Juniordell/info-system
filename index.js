const os = require("os");
const chalk = require("chalk");
const Table = require("cli-table3");
const cliSpinners = require("cli-spinners");
const ora = require("ora");
const hourToString = require("./calc/uptime");
const {
  totalDiskMem,
  freeDiskMem,
  totalRAMMem,
  freeRAMMem,
} = require("./calc/memory");
const formattedSpeed = require("./calc/speed");
const moment = require("moment");

const now = moment().format("MMMM Do YYYY, h:mm:ss a");

const tableMem = new Table({
  head: ["Infos", "Results"],
  colWidths: [25, 37],
});

const tableProcessor = new Table({
  head: ["Infos", "Results"],
  colWidths: [25, 37],
});

const tableOS = new Table({
  head: ["Infos", "Results"],
  colWidths: [25, 37],
});

function log(any = "") {
  console.log(any);
}

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

async function showInfos() {
  const spinner = new ora({
    text: "Fetching your System Data",
    spinner: cliSpinners.random,
  });

  spinner.start();

  setTimeout(() => {
    spinner.color = "blue";
    spinner.text = "Successfully Fetched the System Data";
  }, 2000);

  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    spinner.stop();
    totalDiskMem
      .then((result) => {
        tableMem.push(["Total Disk Memory", chalk.blueBright(result)]);

        freeDiskMem
          .then((result) => {
            tableMem.push(
              ["Free Disk Memory", chalk.greenBright(result)],
              ["Total RAM Memory", chalk.blueBright(totalRAMMem)],
              ["Free RAM Memory", chalk.greenBright(freeRAMMem)]
            );

            log();
            log("=".repeat(65));
            log();
            log(" ".repeat(15) + chalk.greenBright(now));
            log();
            log("=".repeat(65));
            log();

            log();
            log(chalk.bold("                    >>> Memory Infos <<<       "));
            log("             ──────────────────────────────────");
            log(tableMem.toString());

            log();

            showProcessor();

            log();
            showOS();
          })
          .catch((err) => log(err));
      })
      .catch((err) => log(err));
  } catch (err) {
    spinner.stop();
    log(err);
  }
}

async function showMem() {
  const spinner = new ora({
    text: "Fetching your System Data",
    spinner: cliSpinners.random,
  });

  spinner.start();

  setTimeout(() => {
    spinner.color = "blue";
    spinner.text = "Successfully Fetched the System Data";
  }, 2000);

  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    spinner.stop();
    totalDiskMem
      .then((result) => {
        tableMem.push(["Total Disk Memory", chalk.blueBright(result)]);

        freeDiskMem
          .then((result) => {
            tableMem.push(
              ["Free Disk Memory", chalk.greenBright(result)],
              ["Total RAM Memory", chalk.blueBright(totalRAMMem)],
              ["Free RAM Memory", chalk.greenBright(freeRAMMem)]
            );
            log();
            log(chalk.bold("                    >>> Memory Infos <<<       "));
            log("             ──────────────────────────────────");
            log(tableMem.toString());
          })
          .catch((err) => log(err));
      })
      .catch((err) => log(err));
  } catch (err) {
    spinner.stop();
    log(err);
  }
}

function showProcessor() {
  tableProcessor.push(
    ["Processor", chalk.rgb(290, 133, 57)(os.cpus()[0].model.trim())],
    ["Processor Speed", chalk.rgb(290, 133, 57)(formattedSpeed)],
    ["Cores", chalk.rgb(290, 133, 57)(os.cpus().length)]
  );
  log();
  log(chalk.bold("                  >>> Processor Infos <<<     "));
  log("             ─────────────────────────────────");
  log(tableProcessor.toString());
}

function showOS() {
  tableOS.push(
    ["Host Name", chalk.yellow(os.hostname())],
    ["Platform", chalk.yellowBright(platform)],
    ["OS Architecture", chalk.yellowBright(os.arch())],
    ["OS Type", chalk.yellowBright(os.type())],
    ["System Uptime", chalk.yellowBright(hourToString)]
  );
  log();
  log(chalk.bold("                     >>> OS Infos <<<        "));
  log("             ────────────────────────────────");
  log(tableOS.toString());
}

module.exports = {
  showInfos,
  showMem,
  showProcessor,
  showOS,
  showMem,
};
