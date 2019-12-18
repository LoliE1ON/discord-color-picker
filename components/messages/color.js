module.exports = (client, message, hex) => {

    // Set global data
    global.COLOR_PICKER = {
        member: message.guild.members.get(message.author.id),
        role: message.guild.roles.find('name', `#${hex}`),
        client,
        message,
        hex
    }

    // Freeze object
    Object.freeze(COLOR_PICKER)

    // Validate hex color
    if(!validateHex(hex)) {
        return message.reply(`Color incorrect: ${hex}`)
    }

    // Checking and removes old roles
    removeRole(message.member.roles)

    // Create new role
    if(!COLOR_PICKER.role) {
        return createRole(hex)
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
    COLOR_PICKER.message.reply(`color assigned: ${COLOR_PICKER.hex}`)

}