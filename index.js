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

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== process.env.DISCORD_CHANNEL_ID) return;
  if (message.content.startsWith('!')) return;

  const conversationLog = [{ role: 'system', content: 'Eres ChatGPT, un modelo de lenguaje grande entrenado por OpenAI. Sigue las instrucciones del usuario cuidadosamente. ' }]

  conversationLog.push({
    role: 'user',
    content: message.content
  })

  await message.channel.sendTyping()

  const result = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: conversationLog
  })

  message.reply(result.data.choices[0].message)
})

client.login(process.env.TOKEN)