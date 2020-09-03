#!/usr/bin/env node
const program = require("commander");
const showInfos = require("./index");

program.version("2.0.1").description("Show OS infos");

program
  .command("show")
  .alias("s")
  .description("show os infos")
  .action(showInfos);

program.parse(process.argv);
