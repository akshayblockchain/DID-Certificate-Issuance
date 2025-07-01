require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    polygon_amoy:{
      url: process.env.POLYGON_AMOY_RPC,
      accounts: [process.env.PRIVATE_KEY],
      chainId:80002,
    },
    ganache:{
      url: "http://127.0.0.1:7545",
      accounts: ["0x1a757de3450f62f0278f07855f8664c80ae5ae2380a21dbd0cfde4edf847b3aa"],
      chainId:1337,
    }
  }
};
