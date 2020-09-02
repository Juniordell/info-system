const os = require("os");

const speed = os.cpus()[0].speed;

const formattedSpeed = `${speed
  .toString()
  .slice(0, 2)
  .split("")
  .join(".")} GHz`;

module.exports = formattedSpeed;
