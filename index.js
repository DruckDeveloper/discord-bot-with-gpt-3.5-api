require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
})

client.on('ready', _ => {
  console.log('The bot is runing')
})

client.login(process.env.TOKEN)