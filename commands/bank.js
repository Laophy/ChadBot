module.exports = {
    name: 'bank',
    description: "This is a games command",
    execute(message, args, Discord){
        const username = message.member.user.tag;
        const userID = message.member.id;

        //var { cash, items, consumables } = require('../main.js')

        //Embed sent after calculations above
        const bankEmbed = new Discord.MessageEmbed()
        .setColor('#97E37F') //Green
        .setAuthor(username + 's Bank', 'https://iconomator.com/wp-content/uploads/2020/03/treasure.png')
        .setThumbnail('https://iconomator.com/wp-content/uploads/2020/03/treasure.png')
        .setDescription('Welcome to your bank.')
        .addFields(
            {name: 'Cash:', value: ':dollar: $' + global.cash},
            {name: 'Items: ' + global.items.length, value: global.items},
            {name: 'Consumables: ' + global.consumables.length, value: global.consumables}
        )
        .setFooter('User ID: ' + userID)
        
        message.channel.send(bankEmbed);
    }
}

