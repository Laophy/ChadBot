module.exports = {
    name: 'stats',
    description: "This is a stats command",
    execute(message, args, Discord){
        const username = message.member.user.tag;
        const userID = message.member.id;

        global.level = 1;
        global.health = 100;
        global.mana = 100;
        global.melee = 1;
        global.strength = 1;
        global.defence = 1;
        global.agility = 1;
        global.range = 1;
        global.mage = 1;


        const statsEmbed = new Discord.MessageEmbed()
        .setColor('#97E37F') //Green
        .setAuthor(username + 's Stats', 'https://cdn3.iconfinder.com/data/icons/glypho-travel/64/history-swords-crossed-512.png', "")
        .setThumbnail('https://cdn3.iconfinder.com/data/icons/glypho-travel/64/history-swords-crossed-512.png')
        .addFields(
            {name: 'Player Name:', value: username},
            {name: 'Player Level:', value: global.level},
            { name: '\u200B', value: '\u200B' } //Creates a space / gap
        )
        .addFields(
            {name: 'Health: ', value: global.health, inline: true},
            {name: 'Mana: ', value: global.mana, inline: true},
            {name: 'Melee: ', value: global.melee, inline: true},
            {name: 'Range: ', value: global.range, inline: true},
            {name: 'Mage: ', value: global.mage, inline: true},
            {name: 'Strength: ', value: global.strength, inline: true},
            {name: 'Defence: ', value: global.defence, inline: true},
            {name: 'Agility: ', value: global.agility, inline: true}
        )
        .setFooter('User ID: ' + userID)
        
        message.channel.send(statsEmbed);
    }
}

