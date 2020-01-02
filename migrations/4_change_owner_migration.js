const abi = require('ethereumjs-abi');
const LoyaltyPoints = artifacts.require("LoyaltyPoints");
const PointsTokenStorageProxy = artifacts.require("PointsTokenStorageProxy");

module.exports = function (deployer, network, accounts) {
  let loyalty, proxy;
  deployer
    .then((instance) => {
        return PointsTokenStorageProxy.deployed();
    })
    .then((proxy) => {
        return proxy.transferOwnership('0x627306090abaB3A6e1400e9345bC60c78a8BEf57', { from: accounts[0] });
    });
};
