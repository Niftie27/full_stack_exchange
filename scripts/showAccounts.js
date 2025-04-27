require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const signers = await ethers.getSigners();
  console.log("Loaded signers:", signers.map(s => s.address));
}
main();
