// hardhat.config.js ─ WORKING EXAMPLE
require("@nomiclabs/hardhat-waffle");   // plugins first
require("dotenv").config();             // <-- pulls values from .env

// ────────────────────────────────────────────────────────────────
// 1.  Grab the env-vars **once** so we can use them like normal
//     JavaScript variables everywhere below.
// ────────────────────────────────────────────────────────────────
const { ALCHEMY_API_KEY, PRIVATE_KEYS } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    localhost: {},

    // ---- Polygon Amoy testnet ----
    amoy: {
      // use the API key from .env
      url: `https://polygon-amoy.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,

      // turn "key1,key2, key3" into ["key1", "key2", "key3"]
      accounts: PRIVATE_KEYS
        ? PRIVATE_KEYS.split(",").map(k => k.trim())
        : []                 // ← empty array if PRIVATE_KEYS isn't set
    },

    // ── Sepolia testnet ──
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: PRIVATE_KEYS.split(",").map(k => k.trim())
    }
  }
};
