pragma solidity >=0.5.8 <0.6.0;

import './PointsTokenStorage.sol';
import './Ownable.sol';


contract LoyaltyPoints is PointsTokenStorage, Ownable {

    modifier newUser(address account) {
        //check account in existing members
        require(!members[account].isRegistered, "Account already registered as Member");

        //check account in existing partners
        require(!partners[account].isRegistered, "Account already registered as Partner");
        _;
    }

    modifier isMember(address account) {
        // only member can call
        require(members[account].isRegistered, "Sender not registered as Member");
        _;
    }

    modifier isPartners(address account) {
        // verify partner address
        require(partners[account].isRegistered, "Partner address not found");
        _;
    }

    modifier hasPoints(address member, uint _points) {
        // verify enough points for member
        require(members[member].points >= _points, "Insufficient points");
        _;
    }

    function initialized() public view returns (bool) {
        return boolStorage[keccak256('loyalty_points_initialized')];
    }

    function initialize(address newAdministrator) public {
        require(!initialized(), 'Initialization already executed');
        setOwner(newAdministrator);
        boolStorage[keccak256('loyalty_points_initialized')] = true;
    }

    function registerMember () public {
        registerMember(msg.sender);
    }

    //register sender as member
    function registerMember (address member) public newUser(member) {
        //add member account
        members[member] = Member(member, 0, true);
    }

    function registerPartner (address partner) public onlyOwner newUser(partner)  {
        //add partner account
        partners[partner] = Partner(partner, true);

        //add partners info to be shared with members
        partnersInfo.push(Partner(partner, true));
    }

    //update member with points earned
    function earnPoints (uint _points, address _memberAddress, address _partnerAddress) public
        onlyOwner
        isMember(_memberAddress)
        isPartners(_partnerAddress)
    {
        // update member account
        members[_memberAddress].points = members[_memberAddress].points + _points;

        // add transction
        transactionsInfo.push(PointsTransaction({
            points: _points,
            transactionType: TransactionType.Earned,
            memberAddress: members[_memberAddress].memberAddress,
            partnerAddress: _partnerAddress
        }));

    }

    //update member with points used
    function usePoints (uint _points, address _memberAddress, address _partnerAddress) public
        onlyOwner
        isMember(_memberAddress)
        isPartners(_partnerAddress)
        hasPoints(_memberAddress, _points)
    {
        // update member account
        members[_memberAddress].points = members[_memberAddress].points - _points;

        // add transction
        transactionsInfo.push(PointsTransaction({
            points: _points,
            transactionType: TransactionType.Redeemed,
            memberAddress: members[_memberAddress].memberAddress,
            partnerAddress: _partnerAddress
        }));
    }

    //get length of transactionsInfo array
    function transactionsInfoLength() public view returns(uint256) {
        return transactionsInfo.length;
    }

    //get length of partnersInfo array
    function partnersInfoLength() public view returns(uint256) {
        return partnersInfo.length;
    }

}