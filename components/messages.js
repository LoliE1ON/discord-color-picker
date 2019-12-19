// Messages
const help = require("./messages/help")
const color = require("./messages/color")

module.exports = (client) => {

    client.on('message', message => {

        const args = message.content.split(' ');
        const command = args.shift().toLowerCase();

        // Get help
        if (message.content === '!help') {
            help(message)
        }

        // Change color
        if (command === '!color' && args.length > 0) {
            color(client, message, args[0])
        }

    })

}