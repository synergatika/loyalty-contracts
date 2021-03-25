// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.8 <0.9.0;

import './PointsTokenStorage.sol';

/**
 * @title Ownable
 * @dev This contract has an owner address providing basic authorization control
 */
contract Ownable is PointsTokenStorage {
  /**
   * @dev Event to show ownership has been transferred
   * @param previousOwner representing the address of the previous owner
   * @param newOwner representing the address of the new owner
   */
  event OwnershipTransferred(address previousOwner, address newOwner);

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner(), "Only owner has the right");
    _;
  }

  /**
   * @dev Tells the address of the owner
   * @return the address of the owner
   */
  function owner() public view returns (address) {
    return addressStorage[keccak256("owner")];
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner the address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0), "Empty owner is not allowed");
    setOwner(newOwner);
  }

  /**
   * @dev Sets a new owner address
   */
  function setOwner(address newOwner) internal {
    emit OwnershipTransferred(owner(), newOwner);
    addressStorage[keccak256("owner")] = newOwner;
  }
}