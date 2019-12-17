// Messages
const help = require("./messages/help")
const color = require("./messages/color")

module.exports = (client) => {

    client.on('message', message => {

        // Get help
        if (message.content === '!help') {
            message.reply(help())
        }

        const args = message.content.split(' ');
        const command = args.shift().toLowerCase();

        // Change color
        if (command === '!color') {
            if (args.length > 0) {
                color(client, message, args[0])
            }
        }

    })

}