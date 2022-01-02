const AAGToken = artifacts.require("AAGToken");

module.exports = function (deployer) {
  let admin = process.env.HMY_ERC20_MANAGER_CONTRACT;
  let recoveryAdmin = process.env.HMY_MULTISIG_WALLET;
  let timelockPeriod = 86400; // 1 day
  let lossless = ""; // what should be the address here?
  let losslessOn = true;
  deployer.deploy(AAGToken, admin, recoveryAdmin, timelockPeriod, lossless, losslessOn);
};
