const { task } = require("hardhat/config");

//define task name and description
task("block-number", "Prints the current block number").setAction(
  //anonymous function HRE: HARDHAT RUNTIME ENV
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
  }
);

module.exports = {};
