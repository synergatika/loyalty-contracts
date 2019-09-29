pragma solidity >=0.5.8 <0.6.0;

/**
 * @title PointsTokenStorage
 * @dev This contract holds all the necessary state variables to carry out the storage of any contract.
 */
contract PointsTokenStorage {

 // model a member
    struct Member {
        address memberAddress;
        uint points;
        bool isRegistered;
    }

    // model a partner
    struct Partner {
        address partnerAddress;
        bool isRegistered;
    }

    // model points transaction
    enum TransactionType {
        Earned,
        Redeemed
    }

    struct PointsTransaction {
        uint points;
        TransactionType transactionType;
        address memberAddress;
        address partnerAddress;
    }

    //members and partners on the network mapped with their address
    mapping(address => Member) public members;

    mapping(address => Partner) public partners;

    //public transactions and partners information
    Partner[] public partnersInfo;

    PointsTransaction[] public transactionsInfo;

    // For future proposes
    mapping(bytes32 => bool) internal boolStorage;

    mapping(bytes32 => int256) internal intStorage;

    mapping(bytes32 => bytes) internal bytesStorage;

    mapping(bytes32 => uint256) internal uintStorage;

    mapping(bytes32 => string) internal stringStorage;

    mapping(bytes32 => address) internal addressStorage;
}