const Discord = require('discord.js')

// Help
exports.helpEmbed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Commands for color selection:')
    .addField('Color-hex gives information about colors', '```!color Color-hex``` ```!color e80065``` ```!color #00ff15```', true)

// Color incorrect
exports.colorIncorrectEmbed = new Discord.RichEmbed()
    .setColor('#ff0000')
    .setTitle('Color incorrect')
    .addField('Color-HEX gives information about colors', 'You entered the wrong color. Need to enter Color-HEX', true)

// Successfully color
exports.assignRoleEmbed = (hex) => {
    return new Discord.RichEmbed()
        .setColor('#' + hex)
        .setTitle('Color successfully assigned')
}