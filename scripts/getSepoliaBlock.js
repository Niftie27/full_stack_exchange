require("dotenv").config();
const { Network, Alchemy } = require("alchemy-sdk");

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY_SEPOLIA,
  network: Network.ETH_SEPOLIA
};

const alchemy = new Alchemy(settings);

(async () => {
  const block = await alchemy.core.getBlock(15221026);
  console.log(block);
})();
