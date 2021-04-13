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
    let randomNumber = Math.floor(Math.random() * 100);
    let betAmount = parseInt(message.content.substring(5));
    let coins;
    let bank;
    var backgroundColor;
    let canGamble = true;

    let totalWin;

    connection_db.query(`SELECT * FROM user_profile`, (err, profileRow) => {
      if (err) {
        throw err;
      }
      profileRow.forEach((profile) => {
        if (profile.userID == userID) {
          const diceEmbed = new Discord.MessageEmbed()
            .setColor(backgroundColor) //Green
            .setTitle("Dice Game!")
            .setDescription("Rolled a random number! You got: " + randomNumber)
            .setFooter("User ID: " + userID);
          coins = parseInt(profile.coins);

          if (coins >= betAmount) {
            //They have enought to dice
            if (randomNumber >= 52) {
              diceEmbed.setColor(colorWin); //Green
              coins += parseInt((betAmount * randomNumber) / 100);
              totalWin = parseInt((betAmount * randomNumber) / 100);
              diceEmbed.addFields({
                name: "Cash Won or Lost:",
                value:
                  ":dollar: $" +
                  totalWin
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
              });
              diceEmbed.addFields({
                name: "Total Cash:",
                value:
                  ":dollar: $" +
                  coins
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
              });
            } else {
              diceEmbed.setColor(colorLose); //Red
              coins = coins - betAmount;
              diceEmbed.addFields({
                name: "Cash Won or Lost:",
                value:
                  ":dollar: -$" +
                  betAmount
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
              });
              diceEmbed.addFields({
                name: "Total Cash:",
                value:
                  ":dollar: $" +
                  coins
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
              });
            }
          } else {
            canGamble = false;
          }

          connection_db.query(
            `UPDATE user_profile SET coins=${coins} WHERE userID='${userID}'`,
            function (err, result) {}
          );
          connection_db.query(
            `UPDATE user_exp SET gambling=gambling+${
              betAmount / 2
            } WHERE userID='${userID}'`,
            function (err, result) {}
          );
          if (canGamble) {
            message.channel.send(diceEmbed);
          } else {
            message.channel.send("Not enough coins to dice that much!");
          }
        }
      });
    });
  },
};
