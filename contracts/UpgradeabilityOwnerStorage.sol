// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.8 <0.9.0;


/**
 * @title UpgradeabilityOwnerStorage
 * @dev This contract keeps track of the upgradeability owner
 */
contract UpgradeabilityOwnerStorage {
  // Owner of the contract
  address private _upgradeabilityOwner;

  /**
   * @dev Tells the address of the owner
   * @return the address of the owner
   */
  function upgradeabilityOwner() public view returns (address) {
    return _upgradeabilityOwner;
  }

  /**
   * @dev Sets the address of the owner
   */
  function setUpgradeabilityOwner(address newUpgradeabilityOwner) internal {
    _upgradeabilityOwner = newUpgradeabilityOwner;
  }
}