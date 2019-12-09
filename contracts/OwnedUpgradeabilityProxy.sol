pragma solidity >=0.5.8 <0.6.0;

import './UpgradeabilityProxy.sol';
import './UpgradeabilityOwnerStorage.sol';

/**
 * @title OwnedUpgradeabilityProxy
 * @dev This contract combines an upgradeability proxy with basic authorization control functionalities
 */
contract OwnedUpgradeabilityProxy is UpgradeabilityOwnerStorage, UpgradeabilityProxy {
  /**
  * @dev Event to show ownership has been transferred
  * @param previousOwner representing the address of the previous owner
  * @param newOwner representing the address of the new owner
  */
  event ProxyOwnershipTransferred(address previousOwner, address newOwner);

  /**
  * @dev the constructor sets the original owner of the contract to the sender account.
  */
  constructor() public {
    setUpgradeabilityOwner(msg.sender);
  }

  /**
  * @dev Throws if called by any account other than the owner.
  */
  modifier onlyProxyOwner() {
    require(msg.sender == proxyOwner(), "Called only by owner");
    _;
  }

  /**
   * @dev Tells the address of the proxy owner
   * @return the address of the proxy owner
   */
  function proxyOwner() public view returns (address) {
    return upgradeabilityOwner();
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferProxyOwnership(address newOwner) public onlyProxyOwner {
    require(newOwner != address(0), "Null owner value is not allowed");
    emit ProxyOwnershipTransferred(proxyOwner(), newOwner);
    setUpgradeabilityOwner(newOwner);
  }

  /**
   * @dev Allows the upgradeability owner to upgrade the current version of the proxy.
   * @param version representing the version name of the new implementation to be set.
   * @param implementation representing the address of the new implementation to be set.
   */
  function upgradeTo(string memory version, address implementation) public onlyProxyOwner {
    _upgradeTo(version, implementation);
  }

  /**
   * @dev Allows the upgradeability owner to upgrade the current version of the proxy and call the new implementation
   * to initialize whatever is needed through a low level call.
   * @param version representing the version name of the new implementation to be set.
   * @param implementation representing the address of the new implementation to be set.
   * @param data represents the msg.data to bet sent in the low level call. This parameter may include the function
   * signature of the implementation to be called with the needed payload
   */
  function upgradeToAndCall(string memory version, address implementation, bytes memory data) public payable onlyProxyOwner {
    upgradeTo(version, implementation);
    address payable implCon = address(uint160(address(this)));
    implCon.call.value(msg.value)(data);
  }
}