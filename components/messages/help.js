const Discord = require('discord.js')

module.exports = (message) => {

    const helpEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Commands for color selection:')
        .addField('Color-hex gives information about colors', '```!color Color-hex``` ```!color e80065``` ```!color #00ff15```', true)

    message.guild.channels.find(channel => channel.id === message.channel.id).send(helpEmbed);

}

