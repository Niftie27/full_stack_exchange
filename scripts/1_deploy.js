require("dotenv").config();          // keep this if you don’t already have it
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  console.log("Preparing deployment...\n");

  // Contract factories
  const Token    = await ethers.getContractFactory("Token");
  const Exchange = await ethers.getContractFactory("Exchange");

  // Signers
  const [deployer] = await ethers.getSigners();
  if (!deployer) throw new Error("No deployer signer loaded – check PRIVATE_KEYS");

  console.log(`Deployer: ${deployer.address}\n`);

  // Deploy tokens
  const dapp = await Token.deploy("Dapp University", "DAPP", "1000000");
  await dapp.deployed();
  console.log(`DAPP  deployed to: ${dapp.address}`);

  const mETH = await Token.deploy("mETH", "mETH", "1000000");
  await mETH.deployed();
  console.log(`mETH  deployed to: ${mETH.address}`);

  const mDAI = await Token.deploy("mDAI", "mDAI", "1000000");
  await mDAI.deployed();
  console.log(`mDAI  deployed to: ${mDAI.address}`);

  // Deploy exchange – feeAccount is deployer for now, feePercent = 10
  const exchange = await Exchange.deploy(deployer.address, 10);
  await exchange.deployed();
  console.log(`Exchange deployed to: ${exchange.address}`);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
