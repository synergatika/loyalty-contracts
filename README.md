# Loyalty Contract

[![Build Status](https://travis-ci.org/synergatika/loyalty-contracts.svg?branch=master)](https://travis-ci.org/synergatika/loyalty-contracts)
[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg?style=flat)](https://raw.githubusercontent.com/synergatika/loyalty-contracts/master/LICENSE)

We use Loyalty smart contract to keep track of points earned and redeem by a member of the Synergy Loyalty program. Besides, we hold for each Member a score on how loyal he or she is.  It's designed to be upgradeable to support future features. 

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
| uint            | timestamp       |
| address         | partnerAddress  |
| address         | memberAddress   |
| TransactionType | transactionType |

## Reference 

* This contract is based on [IBM/loyalty-points-evm-fabric](https://github.com/IBM/loyalty-points-evm-fabric)
