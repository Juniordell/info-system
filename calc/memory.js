const os = require("os");
const bytes = require("bytes");
const sys = require("systeminformation");

const totalRAMMem = bytes(os.totalmem());
const freeRAMMem = bytes(os.freemem());

async function getTotalDiskMemory() {
  const disks = await sys.fsSize();
  let total = 0;

  for (disk of disks) {
    if (disk.size) {
      total += disk.size;
    }
  }

  return bytes(total);
}

let totalDiskMem = getTotalDiskMemory()
  .then((result) => (totalDiskMem = result))
  .catch((err) => console.log(err));

async function getFreeDiskMemory() {
  const disks = await sys.fsSize();
  let totalUsed = 0;
  let total = 0;

  for (disk of disks) {
    if (disk.used) {
      totalUsed += disk.used;
    }
    if (disk.size) {
      total += disk.size;
    }
  }

  return bytes(total - totalUsed);
}

let freeDiskMem = getFreeDiskMemory()
  .then((result) => (freeDiskMem = result))
  .catch((err) => console.log(err));

module.exports = {
  totalRAMMem,
  freeRAMMem,
  totalDiskMem,
  freeDiskMem,
};
