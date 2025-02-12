const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8').trim();

// Liste des cryptos les plus populaires et leur ID CoinGecko
const cryptoIDs = {
  btc: 'bitcoin',
  eth: 'ethereum',
  doge: 'dogecoin',
  bnb: 'binancecoin',
  xrp: 'ripple',
  ada: 'cardano',
  sol: 'solana',
  dot: 'polkadot',
  matic: 'matic-network'
};

module.exports = {
  name: 'crypto',
  description: 'Obtenez le prix actuel d’une crypto.',
  usage: 'crypto [symbole]',
  async execute(senderId, args) {
    if (!args.length) {
      return sendMessage(senderId, { text: 'Usage: crypto [symbole]. Exemple: crypto btc' }, token);
    }

    const symbol = args[0].toLowerCase();
    const coinID = cryptoIDs[symbol];

    if (!coinID) {
      return sendMessage(senderId, { text: '❌ Crypto non supportée. Essaye avec btc, eth, doge...' }, token);
    }

    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinID}&vs_currencies=usd`);
      const price = data[coinID].usd;

      await
