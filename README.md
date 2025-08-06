# DEX Tangle Exchange (localhost setup)

**Live demo:** https://tangledex.netlify.app/ 
**Repo:** https://github.com/Niftie27/DEX-Tangle-Exchange

## Architecture
| Layer | Technology | Folder / file |
|--------|-------------|-----------------|
| Smart‑contract | Solidity 0.8 – Token.sol, Exchange.sol | /contracts |
| Test‑net deploy | Hardhat scripts (1_deploy.js, 2_seed-exchange.js) | /scripts |
| Front‑end | React + Redux, ethers.js, ApexCharts | /src |
| CI/CD | netlify |

## Prerequisites (Windows 10/11)
* Open **PowerShell as Administrator** and run the following commands:
powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart  
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart  
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All  
If the terminal asks for confirmation, type “y” and press Enter. Ignore any error messages.  
The first command enables WSL (Windows Subsystem for Linux)  
The second enables Virtual Machine Platform needed for WSL2 and Docker  
The third activates the Hyper-V hypervisor  
After completion, restart your PC.


** Ubuntu & Windows Terminal (Windows 10/11)
Download & install WSL2  
Download, install & launch Ubuntu from Microsoft Store  
 - enter a username and password (not visible), repeat the password (not visible)  
 - close the WSL2 terminal  
Download, install & launch Windows Terminal from Microsoft Store  
 - in settings (Settings → Startup), set Ubuntu as the default profile  
 - click Save and close Windows Terminal  
 - reopen Windows Terminal and paste the commands:
sudo apt-get update  
sudo apt-get install build-essential  
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash  
exec bash  
nvm install 20.10.0  
 - Enter


### WSL Installation and Local Setup (Windows 10/11)
# 1. Clone the repository
git clone https://github.com/Niftie27/dex.git  
# 2. Switch to the project folder
cd dex
# 3. Install dependencies
npm install  
# 4. Start local Ethereum node (Hardhat)
npx hardhat node
 - starts local blockchain (Hardhat Network)  
# 5. In a new terminal: Deploy contracts
npx hardhat run --network localhost scripts/1_deploy.js  
 - deploys Token and Exchange contracts
# 6. Seed data to the exchange
npx hardhat run --network localhost scripts/2_seed-exchange.js
 - creates initial token balances for 2 accounts so they can trade on the exchange
# 7. Launch the front-end
npm start
 - opens the React front-end at http://localhost:3000

Note for Linux/macOS
On Linux or macOS, skip the Prerequisites for Windows and Ubuntu & Windows Terminal,
and go straight to the Installation and local setup section.
After installing Node.js (e.g., using nvm)
nvm install 20  # latest LTS
git clone https://github.com/Niftie27/DEX-Tangle-Exchange.git  
cd DEX-Tangle-Exchange
npm install  
npx hardhat node  
npx hardhat run --network localhost scripts/1_deploy.js  
npx hardhat run --network localhost scripts/2_seed-exchange.js  
npm start

#### Metamask (Cryptocurrency Wallet)
To interact with the DEX, you need to download the Metamask Chrome extension and create a new account in Metamask.

**Features**
* 3 tokens: DAPP, mETH, mDAI
* Order book (deposit, withdraw, limit orders, cancel, fill, transaction status)
* Real-time candlestick chart based on on-chain events
* Wallet connect (MetaMask), must connect at least 2 accounts to perform trading
