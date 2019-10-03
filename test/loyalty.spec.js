const LoyaltyPoints = artifacts.require("LoyaltyPoints");
const PointsTokenStorageProxy = artifacts.require("PointsTokenStorageProxy");
const assertRevert = require('./helpers/assertRevert');

contract("Proxy", (accounts) => {
    let options = {};
    let proxy, loyalty;

    before(async () => {
        proxy = await PointsTokenStorageProxy.deployed();
        loyalty = await LoyaltyPoints.at(proxy.address);
    })

    describe('Loyalty Contract Behavior', function () {
        describe('Contract is initialized', function () {
            it('returns true', async function () {
                const initialized = await loyalty.initialized();
                assert.equal(initialized, true);
            })

            it('returns true', async function () {
                const owner = await loyalty.owner();
                assert.equal(owner, accounts[0]);
            })

            it('returns 0', async function () {
                const transactionsInfoLength = await loyalty.transactionsInfoLength();
                assert.equal(transactionsInfoLength, 0);
            })

            it('returns 0', async function () {
                const partnersInfoLength = await loyalty.partnersInfoLength();
                assert.equal(partnersInfoLength, 0);
            })
        });

        describe('Register a member', function () {
            it('success', async function () {
                const result = await loyalty.registerMember();
                assert.equal('0x01', result.receipt.status, 'valid proof creation');
            })

            it('revert', async function () {
                await assertRevert(loyalty.registerMember());
            })

            it('success', async function () {
                const result = await loyalty.registerMember({ from: accounts[1] });
                assert.equal('0x01', result.receipt.status, 'valid proof creation');
            })

            it('revert', async function () {
                await assertRevert(loyalty.registerMember({ from: accounts[1] }));
            })

            it('success', async function () {
                const result = await loyalty.registerMember(accounts[2]);
                assert.equal('0x01', result.receipt.status, 'valid proof creation');
            })
        });

        describe('Register a Partner', function () {
            it('success', async function () {
                const result = await loyalty.registerPartner(accounts[3]);
                assert.equal('0x01', result.receipt.status, 'valid proof creation');
            })

            it('success', async function () {
                const result = await loyalty.registerPartner(accounts[4]);
                assert.equal('0x01', result.receipt.status, 'valid proof creation');
            })

            it('revert', async function () {
                await assertRevert(loyalty.registerPartner(accounts[4]));
            })
            
            it('revert', async function () {
                await assertRevert(loyalty.registerPartner(accounts[5], { from: accounts[5] }));
            })
        });

        describe('Earn & Redeem tokens', function () {
            it('earn', async function () {
                const result = await loyalty.earnPoints(100, accounts[0], accounts[3]);
                assert.equal('0x01', result.receipt.status, 'valid transaction');
            });

            it('returns 100', async function () {
                const balance = await loyalty.members(accounts[0]);
                assert.equal(100, balance.points.valueOf(), '100 points')
            });

            it('revert', async function () {
                await assertRevert(loyalty.earnPoints(100, accounts[0], accounts[0]));
                const balance = await loyalty.members(accounts[0]);
                assert.equal(100, balance.points.valueOf(), '100 points')
            });

            it('revert', async function () {
                await assertRevert(loyalty.earnPoints(100, accounts[0], accounts[3], { from: accounts[1] }));
                const balance = await loyalty.members(accounts[6]);
                assert.equal(0, balance.points.valueOf(), '100 points')
            });

            it('returns 1', async function () {
                const transactionsInfoLength = await loyalty.transactionsInfoLength();
                assert.equal(transactionsInfoLength, 1);
            });

            it('earn', async function () {
                const result = await loyalty.usePoints(50, accounts[0], accounts[3]);
                assert.equal('0x01', result.receipt.status, 'valid proof creation');                
            });

            it('returns 50', async function () {
                const balance = await loyalty.members(accounts[0]);
                assert.equal(50, balance.points.valueOf(), '50 points')
            });

            it('returns 2', async function () {
                const transactionsInfoLength = await loyalty.transactionsInfoLength();
                assert.equal(transactionsInfoLength, 2);
            });


        });
    });
});