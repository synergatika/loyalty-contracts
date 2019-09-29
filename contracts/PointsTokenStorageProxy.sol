pragma solidity >=0.5.8 <0.6.0;

import "./PointsTokenStorage.sol";
import "./OwnedUpgradeabilityProxy.sol";


/**
 * @title EternalStorageProxy
 * @dev This proxy holds the storage of the token contract and delegates every call to the current implementation set.
 * Besides, it allows to upgrade the token's behaviour towards further implementations, and provides basic
 * authorization control functionalities
 */
contract PointsTokenStorageProxy is PointsTokenStorage, OwnedUpgradeabilityProxy {}