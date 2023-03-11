const { Client, GatewayIntentBits } = require('discord.js')
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ],
  rest: {
		api: 'https://discordapp.com/api',
		version: '9'
	}
})

bot.login(process.env.TOKEN)
module.exports = { bot }
