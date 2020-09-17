const LoyaltyPoints = artifacts.require("LoyaltyPoints");
const PointsTokenStorageProxy = artifacts.require("PointsTokenStorageProxy");
const assertRevert = require("./helpers/assertRevert");

contract("Proxy", (accounts) => {
  let options = {};
  let proxy, loyalty;

  before(async () => {
    proxy = await PointsTokenStorageProxy.deployed();
    loyalty = await LoyaltyPoints.at(proxy.address);
  });

  describe("Loyalty Contract Behavior", function () {
    describe("Contract is initialized", function () {
      it("returns true", async function () {
        const initialized = await loyalty.initialized();
        assert.equal(initialized, true);
      });

      it("returns true", async function () {
        const owner = await loyalty.owner();
        assert.equal(owner, accounts[0]);
      });

      it("returns 0", async function () {
        const transactionsInfoLength = await loyalty.transactionsInfoLength();
        assert.equal(transactionsInfoLength, 0);
      });

      it("returns 0", async function () {
        const partnersInfoLength = await loyalty.partnersInfoLength();
        assert.equal(partnersInfoLength, 0);
      });
    });

    describe("Register a Member", function () {
      it("success", async function () {
        const result = await loyalty.registerMember();
        assert.equal("0x01", result.receipt.status, "register Member");
      });

      it("revert", async function () {
        await assertRevert(loyalty.registerMember());
      });

      it("success", async function () {
        const result = await loyalty.methods[
          "registerMember()"
        ].sendTransaction({ from: accounts[1] });
        assert.equal("0x01", result.receipt.status, "register Member");
      });

      it("revert", async function () {
        await assertRevert(
          loyalty.methods["registerMember()"].sendTransaction({
            from: accounts[1],
          })
        );
      });

      it("success", async function () {
        const result = await loyalty.registerMember(accounts[2]);
        assert.equal("0x01", result.receipt.status, "register Member");
      });
    });

    describe("Register a Partner", function () {
      it("success", async function () {
        const result = await loyalty.registerPartner(accounts[3]);
        assert.equal("0x01", result.receipt.status, "register Member");
      });

      it("success", async function () {
        const result = await loyalty.registerPartner(accounts[4]);
        assert.equal("0x01", result.receipt.status, "register Member");
      });

      it("revert", async function () {
        await assertRevert(loyalty.registerPartner(accounts[4]));
      });

      it("revert", async function () {
        await assertRevert(
          loyalty.registerPartner(accounts[5], { from: accounts[5] })
        );
      });
    });

    describe("Earn & Redeem tokens", function () {
      it("earn", async function () {
        const result = await loyalty.earnPoints(100, accounts[0], accounts[3]);
        assert.equal("0x01", result.receipt.status, "valid Transaction");
      });

      it("returns 100", async function () {
        const balance = await loyalty.members(accounts[0]);
        assert.equal(100, balance.points.valueOf(), "100 points");
      });

      it("revert", async function () {
        await assertRevert(loyalty.earnPoints(100, accounts[0], accounts[0]));
        const balance = await loyalty.members(accounts[0]);
        assert.equal(100, balance.points.valueOf(), "100 points");
      });

      it("revert", async function () {
        await assertRevert(
          loyalty.earnPoints(100, accounts[0], accounts[3], {
            from: accounts[1],
          })
        );
        const balance = await loyalty.members(accounts[6]);
        assert.equal(0, balance.points.valueOf(), "0 points");
      });

      it("returns 1", async function () {
        const transactionsInfoLength = await loyalty.transactionsInfoLength();
        assert.equal(transactionsInfoLength, 1);
      });

      it("earn", async function () {
        const result = await loyalty.usePoints(50, accounts[0], accounts[3]);
        assert.equal("0x01", result.receipt.status, "register Member");
      });

      it("returns 50", async function () {
        const balance = await loyalty.members(accounts[0]);
        assert.equal(50, balance.points.valueOf(), "50 points");
      });

      it("returns 2", async function () {
        const transactionsInfoLength = await loyalty.transactionsInfoLength();
        assert.equal(transactionsInfoLength, 2);
      });

      it("loyalty expiration timespan returns 0", async function () {
        const timespan = await loyalty.getScoreTimespan();
        assert.equal(0, timespan.valueOf(), "0");
      });

      it("return loyalty score", async function () {
        const balance = await loyalty.members(accounts[0]);
        assert.equal(50, balance.points.valueOf(), "50 points");

        const score = await loyalty.getLoyaltyScore(accounts[0]);
        assert.equal(0, score.valueOf(), "0 points");
      });

      it("set loyalty expiration timespan", async function () {
        const result = await loyalty.setScoreTimespan(86400);
        assert.equal("0x01", result.receipt.status, "set it to 86400");
      });

      it("loyalty expiration timespan returns 86400", async function () {
        const timespan = await loyalty.getScoreTimespan();
        assert.equal(86400, timespan.valueOf(), "1");
      });

      it("return loyalty score", async function () {
        const balance = await loyalty.members(accounts[0]);
        assert.equal(50, balance.points.valueOf(), "50 points");

        const score = await loyalty.getLoyaltyScore(accounts[0]);
        assert.equal(100, score.valueOf(), '100 points')
      });
    });

    describe("Recover account", function () {
      it("returns 0", async function () {
        const balance = await loyalty.members(accounts[5]);
        assert.equal(0, balance.points.valueOf(), "0 points");
      });

      it("returns 50", async function () {
        const balance = await loyalty.members(accounts[0]);
        assert.equal(50, balance.points.valueOf(), "50 points");
      });

      it("success", async function () {
        const result = await loyalty.registerMember(accounts[5]);
        assert.equal("0x01", result.receipt.status, "register Member");
      });

      it("recover account", async function () {
        const result = await loyalty.recoverPoints(accounts[0], accounts[5]);
        assert.equal("0x01", result.receipt.status, "recover");
      });

      it("returns 50", async function () {
        const balance = await loyalty.members(accounts[5]);
        assert.equal(50, balance.points.valueOf(), "50 points");
      });

      it("returns 0", async function () {
        const balance = await loyalty.members(accounts[0]);
        assert.equal(0, balance.points.valueOf(), "50 points");
      });

      it("returns recoverActions 0", async function () {
        const balance = await loyalty.recoverActions(0);
        assert.equal(
          accounts[5],
          balance.newMemberAddress.valueOf(),
          "Retrieve newMemberAddress"
        );
        assert.equal(
          accounts[0],
          balance.oldMemberAddress.valueOf(),
          "Retrieve oldMemberAddress"
        );
      });
    });
  });
});
