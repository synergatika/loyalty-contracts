// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.8 <0.6.0;

import './Proxy.sol';
import './UpgradeabilityStorage.sol';

/**
 * @title UpgradeabilityProxy
 * @dev This contract represents a proxy where the implementation address to which it will delegate can be upgraded
 */
contract UpgradeabilityProxy is Proxy, UpgradeabilityStorage {
  /**
  * @dev This event will be emitted every time the implementation gets upgraded
  * @param version representing the version name of the upgraded implementation
  * @param implementation representing the address of the upgraded implementation
  */
  event Upgraded(string version, address indexed implementation);

  /**
  * @dev Upgrades the implementation address
  * @param version representing the version name of the new implementation to be set
  * @param implementation representing the address of the new implementation to be set
  */
  function _upgradeTo(string memory version, address implementation) internal {
    require(_implementation != implementation, "Implementation can't be the same");
    _version = version;
    _implementation = implementation;
    emit Upgraded(version, implementation);
  }
}