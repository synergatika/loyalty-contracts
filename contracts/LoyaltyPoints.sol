pragma solidity >=0.5.8 <0.6.0;

import './PointsTokenStorage.sol';


contract LoyaltyPoints is PointsTokenStorage {

    function initialized() public view returns (bool) {
        return boolStorage[keccak256('loyalty_points_initialized')];
    }

    function initialize(address newAdministrator) public {
        require(!initialized(), 'Initialization already executed');
        setAdministrator(newAdministrator);
        boolStorage[keccak256('loyalty_points_initialized')] = true;
    }

    function setAdministrator (address newAdministrator) public {
        require(msg.sender == administrator, "This action is allowed only by System Administrator.");

        administrator = newAdministrator;
    }

    function registerMember () public {
        registerMember(msg.sender);
    }

    //register sender as member
    function registerMember (address member) public {
        //check msg.sender in existing members
        require(!members[member].isRegistered, "Account already registered as Member");

        //check msg.sender in existing partners
        require(!partners[member].isRegistered, "Account already registered as Partner");

        //add member account
        members[member] = Member(member, 0, true);
    }

    function registerPartner () public {
        registerPartner(msg.sender);
    }

    //register sender as partner
    function registerPartner (address partner) public {
        //check msg.sender in existing members
        require(!members[partner].isRegistered, "Account already registered as Member");

        //check msg.sender in existing partners
        require(!partners[partner].isRegistered, "Account already registered as Partner");

        //add partner account
        partners[partner] = Partner(partner, true);

        //add partners info to be shared with members
        partnersInfo.push(Partner(partner, true));

    }

    //update member with points earned
    function earnPoints (uint _points, address _partnerAddress) public {
        // only member can call
        require(members[msg.sender].isRegistered, "Sender not registered as Member");

        // verify partner address
        require(partners[_partnerAddress].isRegistered, "Partner address not found");

        // update member account
        members[msg.sender].points = members[msg.sender].points + _points;

        // add transction
        transactionsInfo.push(PointsTransaction({
            points: _points,
            transactionType: TransactionType.Earned,
            memberAddress: members[msg.sender].memberAddress,
            partnerAddress: _partnerAddress
        }));

    }

    //update member with points used
    function usePoints (uint _points, address _partnerAddress) public {
        // only member can call
        require(members[msg.sender].isRegistered, "Sender not registered as Member");

        // verify partner address
        require(partners[_partnerAddress].isRegistered, "Partner address not found");

        // verify enough points for member
        require(members[msg.sender].points >= _points, "Insufficient points");

        // update member account
        members[msg.sender].points = members[msg.sender].points - _points;

        // add transction
        transactionsInfo.push(PointsTransaction({
            points: _points,
            transactionType: TransactionType.Redeemed,
            memberAddress: members[msg.sender].memberAddress,
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