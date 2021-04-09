const connection_db = require("../database/connection_db");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "dice",
  description: "This is a dice command",
  execute(message, args, Discord) {
    const username = message.member.user.tag;
    const userID = message.member.id;

    var colorWin = "#97E37F";
    var colorLose = "#E38B7F";
    var randomNumber = (Math.random(1, 100) * 100).toFixed(2);
    var backgroundColor;

    diceAmount = 100;

    var cashWon;

    if (randomNumber >= 50) {
      backgroundColor = colorWin;
      cashWon = diceAmount + (diceAmount * randomNumber) / 100;
      global.cash = global.cash + cashWon;
    } else if (randomNumber <= 50) {
      backgroundColor = colorLose;
      global.cash = global.cash - diceAmount;
      cashWon = -diceAmount;
    }
    if (global.cash < 0) {
      global.cash = 0;
      cashWon = 0;
    }

    connection_db.query("SELECT * FROM user_profile", (err, rows) => {
      //if (err) throw err;
      rows.forEach((row) => {
        if (row.userID == userID) {
          coins = row.coins;
          bank = row.bank;
          console.log(coins + " " + username);
          bankEmbed.addFields({
            name: "Coins:",
            value:
              ":dollar: $" +
              coins.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
          });

          message.channel.send(bankEmbed);
        }
      });
    });

    //Embed sent after calculations above
    const diceEmbed = new Discord.MessageEmbed()
      .setColor(backgroundColor) //Green
      .setTitle("Dice Game!")
      .setDescription("Rolled a random number! You got: " + randomNumber)
      /*.addFields(
            {name: 'Cash:', value: ':dollar: $' + cash},
        )
        */
      .addFields({ name: "Cash Won or Lost:", value: ":dollar: $" + cashWon })
      .setFooter("User ID: " + userID);

    message.channel.send(diceEmbed);
  },
};
