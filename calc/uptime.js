const os = require("os");

let hour = (
  Math.floor(os.uptime() / 60 / 60) +
  Number(((os.uptime() / 60 / 60 - Math.floor(os.uptime() / 60 / 60)) * 6) / 10)
)
  .toString()
  .split(".");

let hourToString = `${hour[0]}hrs ${hour[1].slice(0, 2)}min`;

module.exports = hourToString;
