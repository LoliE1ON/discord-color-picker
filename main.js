const Discord = require('discord.js');
const env = require('dotenv').config().parsed;
const messages  = require('./components/messages');
const client = new Discord.Client();

// Run bot
client.on('ready', () => messages(client));

// Login bot
client.login(env.BOT_TOKEN);