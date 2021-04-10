const connection_db = require("../database/connection_db");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "give",
  description: "This is a give command",
  execute(message, args, Discord) {
    //Code to run after command.
    const username = message.member.user.tag;
    const userID = message.member.id;
    let coins;
    let bank;

    let giveAmount = parseInt(message.content.substring(6));
    let isAdmin = false;

    connection_db.query(`SELECT * FROM user_profile`, (err, profileRow) => {
      if (err) {
        throw err;
      }
      profileRow.forEach((profile) => {
        if (profile.userID == userID) {
          coins = profile.coins;
          if (profile.isAdmin == 1) {
            connection_db.query(
              `UPDATE user_profile SET coins=${
                coins + giveAmount
              } WHERE userID='${userID}'`,
              function (err, result) {}
            );
            message.channel.send(
              "Gave " +
                username +
                " $" +
                giveAmount
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
                "."
            );
          } else {
            message.channel.send("Not and admin...");
          }
        }
      });
    });
  },
};
