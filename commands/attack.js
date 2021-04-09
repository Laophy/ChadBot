module.exports = {
    name: 'attack',
    description: "This is a games command",
    execute(message, args, Discord){
        const username = message.member.user.tag;
        const userID = message.member.id;


        var randomMobId = Math.floor(Math.random() * 3)

        var mobName;
        var mobStyle;
        var mobIcon;

        var mobLevel;
        var health;
        var mana;
        var defenceLevel;
        var meleeLevel;
        var rangeLevel;
        var mageLevel;

        if(randomMobId === 0){
            mobName = "Goblin"
            mobStyle = "Melee"
            health = 100;
            mana = 100;
            defenceLevel = 5;
            meleeLevel = 5;
            mobLevel = 5;
            mobIcon = 'https://image.flaticon.com/icons/png/512/129/129097.png';
        }else if(randomMobId === 1){
            mobName = "Guard"
            mobStyle = "Melee"
            health = 100;
            mana = 100;
            defenceLevel = 5;
            meleeLevel = 5;
            mobLevel = 5;
            mobIcon = 'https://static.thenounproject.com/png/395486-200.png';
        }else if(randomMobId === 2){
            mobName = "Player Chad"
            mobStyle = "Range"
            health = 100;
            mana = 100;
            defenceLevel = 10;
            rangeLevel = 10;
            mobLevel = 9;
            mobIcon = 'https://i.pinimg.com/originals/83/1e/4c/831e4ca78b97ee3c646c8244061f0b3b.jpg';
        }   


        const attackEmbed = new Discord.MessageEmbed()
        .setColor('#A5A5A5') //Gray
        .setAuthor(username + 's Attacking!', 'https://cdn3.iconfinder.com/data/icons/glypho-travel/64/history-swords-crossed-512.png')
        .setThumbnail(mobIcon)
        .setDescription('Random mob attack!')

        .addFields(
            {name: mobName, value: mobStyle},
            {name: 'Level: ' + mobLevel, value: '\u200B'},
            {name: '\u200B', value: '\u200B' }, //Creates a space / gap
            {name: 'Health: ', value: health, inline: true},
            {name: 'Mana', value: mana, inline: true},
            {name: 'Melee: ', value: meleeLevel, inline: true},
            {name: 'Range: ', value: rangeLevel, inline: true},
            {name: 'Mage: ', value: mageLevel, inline: true},
            {name: 'Defence', value: defenceLevel, inline: true},
            {name: '\u200B', value: mobName + 's attack style is ' + mobStyle + ', so be prepared...'}
        )

        .setFooter('User ID: ' + userID)


        
        message.channel.send(attackEmbed);
    }
}

