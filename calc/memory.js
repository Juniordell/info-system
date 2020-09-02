const os = require("os");
const bytes = require("bytes");

const totalMem = bytes(os.totalmem());
const freeMem = bytes(os.freemem());

module.exports = {
  totalMem,
  freeMem,
};
