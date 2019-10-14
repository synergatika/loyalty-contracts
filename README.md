# Loyalty Contract

[![Build Status](https://travis-ci.org/synergatika/loyalty-contracts.svg?branch=master)](https://travis-ci.org/synergatika/loyalty-contracts)

We use smart contract to keep track of points earned and redeem by a member of the Synergy Loyalty program. It's designed to be upgradeable to support future features.

## Model

### Entities

**Member (Participant)** 

| Type    | Name            |
| ------- | --------------- |
| address | memberAddress   |
| uint    | points          |
| bool    | isRegistered    |

**Partner (Participant)** 

| Type    | Name            |
| ------- | --------------- |
| address | partnerAddress  |
| bool    | isRegistered    |

### Types

**TransactionType (Enum)** 

| Options    |
| ---------- | 
| Earned     | 
| Redeemed   | 

### Transaction

**PointsTransaction (Transaction)** 

| Type            | Name            |
| --------------- | --------------- |
| uint            | points          |
| address         | partnerAddress  |
| address         | memberAddress   |
| TransactionType | transactionType |

## Reference 

* This contract is based on [IBM/loyalty-points-evm-fabric](https://github.com/IBM/loyalty-points-evm-fabric)