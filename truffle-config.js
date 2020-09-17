// const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "dinner filter frozen verify mix alone mountain onion leisure physical tennis shuffle";

module.exports = {
  compilers: {
    solc: {
      settings: {
        evmVersion: "byzantium"
      },
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    onlyCalledMethods: true,
    rst: true
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gasPrice: 0,
      network_id: "*" // Match any network id
    },
    production: {
      host: "localhost",
      port: 22000, // was 8545
      network_id: "*", // Match any network id
      gasPrice: 0,
      // gas: 10000000,
      type: "quorum" // needed for Truffle to support Quorum
    }
  }
};