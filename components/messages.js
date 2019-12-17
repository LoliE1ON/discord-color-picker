// Messages
const help = require("./messages/help")
const color = require("./messages/color")

module.exports = (client) => {

    client.on('message', msg => {

        // Get help
        if (msg.content === '!help') {
            msg.reply(help())
        }

        // Change user role color
        if (msg.content === '!color') {
            color(client, msg)
        }

    })

}