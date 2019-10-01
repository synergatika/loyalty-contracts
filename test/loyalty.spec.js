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
        })

        describe('Register a member', function () {
            // it('success', async function () {
            //     const result = await loyalty.registerMember();
            //     assert.equal('0x01', result.receipt.status, 'valid proof creation');
            // })

            // it('revert', async function () {
            //     await assertRevert(loyalty.registerMember());
            // })

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
        })

        describe('Register a Partner', function () {
            it('success', async function () {
                const result = await loyalty.registerPartner();
                assert.equal('0x01', result.receipt.status, 'valid proof creation');
            })

            it('success', async function () {
                const result = await loyalty.registerPartner(accounts[6]);
                assert.equal('0x01', result.receipt.status, 'valid proof creation');
            })

            it('success', async function () {
                const result = await loyalty.registerPartner(accounts[5]);
                assert.equal('0x01', result.receipt.status, 'valid proof creation');
            })

            it('revert', async function () {
                await assertRevert(loyalty.registerPartner(accounts[5]));
            })
        })

    });
});