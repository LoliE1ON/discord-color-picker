const Discord = require('discord.js')

module.exports = (client, message, hex) => {

    // Set global data
    global.COLOR_PICKER = {
        member: message.guild.members.get(message.author.id),
        role: message.guild.roles.find('name', `#${hex.replace('#', '')}`),
        hex: hex.replace('#', ''),
        client,
        message
    }

    // Freeze object
    Object.freeze(COLOR_PICKER)

    // Run bot
    handle()

}

// Handle message
function handle() {

    // Validate hex color
    if(!validateHex(COLOR_PICKER.hex)) {

        const colorincorrectEmbed = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setTitle('Color incorrect')
            .addField('Color-HEX gives information about colors', 'You entered the wrong color. Need to enter Color-HEX', true)

        return COLOR_PICKER.message.guild.channels.find(channel => channel.id === COLOR_PICKER.message.channel.id).send(colorincorrectEmbed)

    }

    // Checking and removes old roles
    removeRole(COLOR_PICKER.message.member.roles)

    // Create new role
    if(!COLOR_PICKER.role) {
        return createRole(COLOR_PICKER.hex)
    }

    // Assign role
    assignRole(COLOR_PICKER.role)

}

// Validate hex value
function validateHex(hex) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
}

// Remove old roles
function removeRole(roles) {

    roles.forEach(function(item) {

        let roleName = item.name.replace('#', '')
        if(validateHex(roleName) && roleName !== COLOR_PICKER.hex) {
            COLOR_PICKER.member.removeRole(item.id)
            console.log(`Remove old role ${item.id}`)
        }
    });

}

// Create new role
function createRole(hex) {

    // Create a new role
    COLOR_PICKER.message.guild.createRole({
        name: `#${hex}`,
        color: hex,
    })
        .then(role => {

            // Assign role
            assignRole(role)
            console.log(`Created new role with color ${role.color} ${role.id}`)

        })
        .catch(console.error)

}

// Assign role
function assignRole(role) {

    if(COLOR_PICKER.member.roles.has(role.id)) return;
    COLOR_PICKER.member.addRole(role.id);

    const assignRoleEmbed = new Discord.RichEmbed()
        .setColor('#' + COLOR_PICKER.hex)
        .setTitle('Color successfully assigned')

    return COLOR_PICKER.message.guild.channels.find(channel => channel.id === COLOR_PICKER.message.channel.id).send(assignRoleEmbed)


}