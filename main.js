const Discord = require('discord.js');
const env = require('dotenv').config().parsed;
const client = new Discord.Client();
const messages  = require('./components/messages');

// Run
client.on('ready', () => messages(client));

// Login
client.login(env.BOT_TOKEN);