# Loyalty Contract

[![Build Status](https://travis-ci.org/synergatika/loyalty-contracts.svg?branch=master)](https://travis-ci.org/synergatika/loyalty-contracts)
[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg?style=flat)](https://raw.githubusercontent.com/synergatika/loyalty-contracts/master/LICENSE)

We use Loyalty smart contract to keep track of points earned and redeem by a member of the Synergy Loyalty program. Besides, we hold for each Member a score on how loyal he or she is.  It's designed to be upgradeable to support future features. 

## Getting started

### Development steps

```
# Install package
$ npm install

# Start the Ethereum emulator
$ npx ganache-cli --gasPrice 0 -l 100000000 -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

# Then open a new terminal, first run the contracts migrations
$ px truffle migrate

# Last, run all the tests
$ npx truffle test
```

### Go to production 

```

# Update your settings on truffle-config.js according your prouduction enviroment. e.g., mine was: 
# 
#    production: {
#      host: "localhost",
#      port: 22000, // was 8545
#      network_id: "*", // Match any network id
#      gasPrice: 0,
#      // gas: 10000000,
#      type: "quorum" // needed for Truffle to support Quorum
#    }

$ npx truffle migrate --network production

# Now, you can run tests into the production

$ npx truffle test --network production
```

## Model

The description of every structure is used by the Loyalty Contract.

**Member (Participant)**: it is represents a buyer in the loyalty network.

| Type    | Name            |
| ------- | --------------- |
| address | memberAddress   |
| uint    | points          |
| bool    | isRegistered    |

**Partner (Participant)**: it is represents a COOP company which offers discounts or perks in the loyalty network.

| Type    | Name            |
| ------- | --------------- |
| address | partnerAddress  |
| bool    | isRegistered    |

**TransactionType (Enum)**: it is the type of transaction, a buyer either can earn or redeem points.

| Options    |
| ---------- | 
| Earned     | 
| Redeemed   | 

**PointsTransaction (Transaction)**: it is the description of every transaction in the loyalty network.

| Type            | Name            |
| --------------- | --------------- |
| uint            | points          |
| uint            | timestamp       |
| address         | partnerAddress  |
| address         | memberAddress   |
| TransactionType | transactionType |

**RecoverAction (Wallet)**: in case of lost digital wallet we provide the option to recover your loyalty point, with this structure we keep track every recovery try.
| Type            | Name            |
| --------------- | --------------- |
| newMemberAddress| address         |
| oldMemberAddress| address         |

## Reference 

* This contract is based on [IBM/loyalty-points-evm-fabric](https://github.com/IBM/loyalty-points-evm-fabric)
