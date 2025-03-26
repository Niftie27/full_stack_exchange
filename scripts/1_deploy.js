async function main() {

  console.log(`preparing deployment...\n`)

  // Fetch contract to deploy
  const Token = await ethers.getContractFactory("Token")
  const Exchange = await ethers.getContractFactory("Exchange")

  const accounts = await ethers.getSigners()

  console.log(`Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`)

  // Deploy contract
  const MYT = await Token.deploy('My Token', 'MYT', '1000000')
  await MYT.deployed()
  console.log(`MYT deployed to: ${MYT.address}`)

  const mETH = await Token.deploy('mETH', 'mETH', '1000000')
  await mETH.deployed()
  console.log(`mETH Deployed to: ${mETH. address}`)

  const mDAI = await Token.deploy('mDAI', 'mDAI', '1000000')
  await mDAI.deployed()
  console.log(`mDAI Deployed to: ${mDAI. address}`)    

  const exchange = await Exchange.deploy(accounts[1].address, 10)
  await exchange.deployed()
  console.log(`Exchange Deployed to: ${exchange.address}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
