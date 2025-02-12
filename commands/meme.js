const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8').trim();

module.exports = {
  name: 'meme',
  description: 'Obtenez un mème aléatoire.',
  async execute(senderId) {
    try {
      const { data } = await axios.get('https://meme-api.com/gimme');
      const memeUrl = data.url || '';

      await sendMessage(senderId, { text: `🤣 **Mème du jour :**\n${memeUrl}` }, token);
    } catch (error) {
      console.error(error);
      await sendMessage(senderId, { text: '❌ Impossible de récupérer un mème.' }, token);
    }
  }
};
