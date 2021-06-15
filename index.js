const TelegramBot = require('node-telegram-bot-api')
const fetch = require('node-fetch')
const config = require('./src/config/config')

// replace the value below with the Telegram token you receive from @BotFather
const token = config.TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true})

bot.on('message', async data => {

	if(data.text === '/start') {
		bot.sendMessage(data.chat.id, 'Hi! Welcome to Merriam Webster Bot.\n\nYou can search any word. Cool yeah? :)\n\nCommands: `/search rocket`', { 'parse_mode': 'markdown' })
	}

	const query = data.text.split('/search ')

	if(query.length > 0) {

		const fetchData = await fetch(config.API_URL + query[1] + '?key=' + config.KEY)

		const res = await fetchData.json()

		let text = ''

		res.forEach( (e, index) => {

			text += (index + 1) + ') ' + e.shortdef + '\n'

		});

		bot.sendMessage(
			data.chat.id, 
			'<b>Word:</b> ' + query[1] + '\n\n<b>Dictionary: </b>\n' + text,
			{ 'parse_mode': 'html' }
		)	
	}

})