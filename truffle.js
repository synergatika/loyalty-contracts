// const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "dinner filter frozen verify mix alone mountain onion leisure physical tennis shuffle";

module.exports = {
  mocha: {
    reporter: 'eth-gas-reporter',
    onlyCalledMethods: true,
    rst: true
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};