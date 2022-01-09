require("dotenv").config();
const BN = require("bn.js");
const Web3 = require("web3");

(async function () {
  const web3 = new Web3(process.env.HMY_NODE_URL);
  let ethMasterAccount = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(ethMasterAccount);
  web3.eth.defaultAccount = ethMasterAccount.address;

  let mintingAdmin = process.env.HMY_ERC20_MANAGER_CONTRACT;
  let admin = "0xf536ab9e042d414c8e54bff40147f34f0926e244";
  let recoveryAdmin = "0x9accdb69d8757dd9ceb7f69e985cbca879c0ddf6";
  let timelockPeriod = 86400; // 1 day
  let lossless = "0xDBB5125CEEaf7233768c84A5dF570AeECF0b4634"; // what should be the address here?
  let losslessOn = true;

  const contractJson = require("./build/contracts/AAGToken.json");
  const contract = new web3.eth.Contract(contractJson.abi);
  const txContract = await contract
    .deploy({
      data: contractJson.bytecode,
      arguments: [
        admin,
        recoveryAdmin,
        timelockPeriod,
        lossless,
        losslessOn,
        mintingAdmin,
      ],
    })
    .send({
      from: ethMasterAccount.address,
      gas: process.env.GAS_LIMIT,
      gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
    });
  console.log("Deployed contract to", `${txContract.options.address}`);

  // admin is harmony side bridge contract
  // recoveryAdmin is harmony side multisig wallet
  // call claimTokens upon deploying AAGToken contract, which moves the supply to harmony side bridge contract
  // mint() is called by harmony side bridge contract for lock on the ethereum side. the mint basically transfer from admin to user
  // burn is called by harmony side bridge contract for unlock on the ethereum side. needs approve called before burn. the burn moves back the amount to admin
  // need to know the lossless contract address and any special things it does while calling mint() and burn()
})();
