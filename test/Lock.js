const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect, assert } = require("chai");

describe("DID-certificate", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployDID() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const DIDCertification = await ethers.getContractFactory("DIDCertificate");
    const didCert = await DIDCertification.deploy();

    return { didCert,owner, otherAccount };
  }

  describe("Deployment", function () {
    it("deploy", async function () {
      const { didCert,owner } = await loadFixture(deployDID);
      await didCert.issueCertificate(owner,"0x2f38fd3885fg8g","Blockchain Developer");
      expect(await didCert.issueCerts(owner).did).to.equal("0x2f38fd3885fg8g");
    });
  });
});