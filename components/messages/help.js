const { helpEmbed } = require('../reply')

module.exports = (message) => message.guild.channels.find(channel => channel.id === message.channel.id).send(helpEmbed)