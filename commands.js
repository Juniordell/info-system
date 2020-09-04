#!/usr/bin/env node
const program = require("commander");
const { showInfos, showMem, showProcessor, showOS } = require("./index");

program.version("2.0.4").description("show OS infos");

program
  .option("-m, --memory", "show only the memory infos", showMem)
  .option("-p, --processor", "show only the processor infos", showProcessor)
  .option("-os, --operational", "show only the OS infos", showOS)
  .description("show os infos")
  .action(() => {
    if (
      !program.opts().memory &&
      !program.opts().all &&
      !program.opts().processor &&
      !program.opts().operational
    ) {
      showInfos();
    }
  });

program.parse(process.argv);
