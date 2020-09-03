#!/usr/bin/env node

const program = require("commander");
const showInfos = require(".");

program.version("1.1.0").description("Show OS infos");

program
  .command("show")
  .alias("s")
  .description("show os infos")
  .action(showInfos);

program.parse(process.argv);
