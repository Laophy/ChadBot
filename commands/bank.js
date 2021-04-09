const connection_db = require("../database/connection_db");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
    name: 'bank',
    description: "This is a games command",
    execute(message, args, Discord){
        const username = message.member.user.tag;
        const userID = message.member.id;

        var newUsername = username.substring(0, username.length - 5);
        let coins;

        connection_db.query("SELECT * FROM user_profile", (err, rows) => {
            //if (err) throw err;
            rows.forEach((row) => {
              if (row.userID == userID) {
                coins = row.coins;
                console.log(coins + " " + username);
                bankEmbed.addFields(
                    {name: 'Coins:', value: ':dollar: $' + coins},
                );
                if(row.isAdmin == 1){
                    bankEmbed.setAuthor(newUsername + "(Admin)" + ' Bank', 'https://iconomator.com/wp-content/uploads/2020/03/treasure.png')
                    bankEmbed.setColor('#FFFF00') //Green
                }
                message.channel.send(bankEmbed);
              }
            });

          });


        //Embed sent after calculations above
        const bankEmbed = new Discord.MessageEmbed()
        .setColor('#97E37F') //Green
        .setAuthor(newUsername + ' Bank', 'https://iconomator.com/wp-content/uploads/2020/03/treasure.png')
        .setThumbnail('https://iconomator.com/wp-content/uploads/2020/03/treasure.png')
        .setDescription(`Welcome to your bank ${newUsername}.`)
        .setFooter('User ID: ' + userID)

    }
}

