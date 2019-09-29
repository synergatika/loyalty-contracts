const LoyaltyPoints = artifacts.require("LoyaltyPoints");
const PointsTokenStorageProxy = artifacts.require("PointsTokenStorageProxy");


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
                const initialized = await loyalty.administrator();
                assert.equal(initialized, true);
            })
        })
    });
});