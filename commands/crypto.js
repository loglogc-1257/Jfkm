const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8').trim();

module.exports = {
  name: 'crypto',
  description: 'Obtenez le prix actuel d’une crypto.',
  usage: 'crypto [symbole]',
  async execute(senderId, args) {
    if (!args.length) {
      return sendMessage(senderId, { text: 'Usage: crypto [symbole]. Exemple: crypto btc' }, token);
    }

    const coin = args[0].toLowerCase();
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
      const price = data[coin]?.usd;

      if (price) {
        await sendMessage(senderId, { text: `💰 **${coin.toUpperCase()}** : $${price}` }, token);
      } else {
        await sendMessage(senderId, { text: '❌ Crypto introuvable.' }, token);
      }
    } catch (error) {
      console.error(error);
      await sendMessage(senderId, { text: '❌ Erreur API CoinGecko.' }, token);
    }
  }
};
