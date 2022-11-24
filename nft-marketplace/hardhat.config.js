require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle")
require("dotenv").config({ path: ".env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
//  unused configuration commented out for now
  mumbai: {
    url: "https://polygon-mumbai.g.alchemy.com/v2/WJvRKv3wt9vjHdf8um2vrGuwy0Ltsu6d",
    accounts: [PRIVATE_KEY],
  }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}