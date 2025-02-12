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

    const symbol = args[0].toLowerCase();

    try {
      // Étape 1 : Récupérer la liste complète des cryptos
      const { data: coins } = await axios.get('https://api.coingecko.com/api/v3/coins/list');

      // Étape 2 : Trouver l'ID correspondant au symbole
      const coin = coins.find(c => c.symbol === symbol);

      if (!coin) {
        return sendMessage(senderId, { text: '❌ Crypto introuvable. Essaye avec un autre symbole !' }, token);
      }

      // Étape 3 : Récupérer le prix
      const { data: priceData } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd`);

      await sendMessage(senderId, { text: `💰 **${coin.name} (${symbol.toUpperCase()})** : $${priceData[coin.id].usd}` }, token);

    } catch (error) {
      console.error(error);
      await sendMessage(senderId, { text: '❌ Erreur API CoinGecko.' }, token);
    }
  }
};
