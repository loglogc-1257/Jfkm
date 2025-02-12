module.exports = {
  name: 'blague',
  description: 'Obtenez une blague aléatoire.',
  usage: 'blague',
  async execute(senderId) {
    try {
      const { data } = await axios.get('https://blague.xyz/api/joke/random');

      await sendMessage(senderId, { text: `😂 ${data.joke.question}\n\n😆 ${data.joke.answer}` }, token);
    } catch (error) {
      console.error(error);
      await sendMessage(senderId, { text: '❌ Impossible de récupérer une blague.' }, token);
    }
  }
};
