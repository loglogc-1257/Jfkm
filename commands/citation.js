module.exports = {
  name: 'citation',
  description: 'Obtenez une citation aléatoire.',
  usage: 'citation',
  async execute(senderId) {
    try {
      const { data } = await axios.get('https://api.quotable.io/random');

      await sendMessage(senderId, { text: `📜 "${data.content}"\n- *${data.author}*` }, token);
    } catch (error) {
      console.error(error);
      await sendMessage(senderId, { text: '❌ Erreur lors de la récupération de la citation.' }, token);
    }
  }
};
