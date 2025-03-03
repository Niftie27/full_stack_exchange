//import ethers library from HH library
const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Token', () => {
	let token,
		accounts,
		deployer,
		receiver

	beforeEach(async () => {
		const Token = await ethers.getContractFactory('Token')
		token = await Token.deploy('My Token', 'MYT', '1000000')

		accounts = await ethers.getSigners() //connect HH network with ethers
		deployer = accounts[0]
		receiver = accounts[1]
	}) 

	describe('Deployment', () => {
		const name = 'My Token'
		const symbol = 'MYT'
		const decimals = '18'
		const totalSupply = tokens('1000000')

	it('has correct name', async () => {
		expect(await token.name()).to.equal(name)
	})

	it('has correct symbol', async () => {
		expect(await token.symbol()).to.equal(symbol)
	})

	it('has correct decimals', async () => {
		expect(await token.decimals()).to.equal(decimals)
	})

	it('has correct total supply', async () => {
		expect(await token.totalSupply()).to.equal(totalSupply)
	})

	it('assigns total supply to the deployer', async () => {
		expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)
	})

	})



	describe('Sending Tokens', () => {
		let amount, transaction, result

			describe('Success', () => {
				beforeEach(async () => {
				amount = tokens(100)
				transaction = await token.connect(deployer).transfer(receiver.address, amount)
				result = await transaction.wait()
			})
			
			it('transfers token balances', async() => {

			//Log balance before transfer
			console.log("deployer balance before transfer", await token.balanceOf(deployer.address))
			console.log("receiver balance before transfer", await token.balanceOf(receiver.address))

			//Transfer tokens
			expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
			expect(await token.balanceOf(receiver.address)).to.equal(amount)

			//Log balance after transfer
			console.log("deployer balance after transfer", await token.balanceOf(deployer.address))
			console.log("receiver balance after transfer", await token.balanceOf(receiver.address))
			
			// Ensure that tokens were transfered (balance change)

			})

			it('emits a Transfer event', async () => {
				const event = result.events[0]
				expect(event.event).to.equal('Transfer')

				const args = event.args
				expect(args.from).to.equal(deployer.address)
				expect(args.to).to.equal(receiver.address)
				expect(args.value).to.equal(amount)
			})
		})

		describe('Failure', () => {
			it('rejects insufficient balances', async () => {
				// Transfer more tokens than deployer has - 10M
				const invalidAmount = tokens(100000000)
				await expect(token.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted
			})



		})



	})
})