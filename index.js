require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
})

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

client.on('ready', _ => {
  console.log('The bot is runing')
})

client.on('messageCreate', (message) => {
  console.log(message.content)
})

client.login(process.env.TOKEN)