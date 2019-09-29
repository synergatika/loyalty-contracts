const PointsTokenStorageProxy = artifacts.require("PointsTokenStorageProxy");

module.exports = function(deployer) {
  deployer.deploy(PointsTokenStorageProxy);
};
