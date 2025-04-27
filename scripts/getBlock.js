// scripts/getBlock.js
require("dotenv").config();               // <- loads .env values
const { Network, Alchemy } = require("alchemy-sdk");

// ---------- Config ----------
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,    // pulled from your .env
  network: Network.MATIC_AMOY,            // Polygon Amoy testnet
};

// ---------- Init client ----------
const alchemy = new Alchemy(settings);

// ---------- Fetch and print a block ----------
(async () => {
  const block = await alchemy.core.getBlock(15221026);
  console.log(block);
})();
