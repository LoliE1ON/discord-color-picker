// Validate hex value
function validateHex(hex) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
}

// Remove old roles
function removeRole(member, roles, hex) {

    roles.forEach(function(item) {

        let roleName = item.name.replace('#', '')
        if(validateHex(roleName) && roleName !== hex) {
            member.removeRole(item.id)
            console.log(`Remove old role ${item.id}`)
        }
    });

}

// Create new role
function createRole(message, member, hex) {

    // Create a new role
    message.guild.createRole({
        name: `#${hex}`,
        color: hex,
    })
        .then(role => {

            // Assign role
            assignRole(message, member, role, hex)
            console.log(`Created new role with color ${role.color} ${role.id}`)

        })
        .catch(console.error)

}

// Assign role
function assignRole(message, member, role, hex) {

    if(member.roles.has(role.id)) return;
    member.addRole(role.id);
    message.reply(`color assigned: ${hex}`)

}

module.exports = (client, message, hex) => {

    // Validate hex color
    if(!validateHex(hex)) {
        message.reply(`Color incorrect: ${hex}`)
        return
    }

    let member = message.guild.members.get(message.author.id);
    let role = message.guild.roles.find('name', `#${hex}`);

    // Checking and removes old roles
    removeRole(member, message.member.roles, hex)

    // Create new role
    if(!role) {
        createRole(message, member, hex)
        return
    }

    // Assign role
    assignRole(message, member, role, hex)

}