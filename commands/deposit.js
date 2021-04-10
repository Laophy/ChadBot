const connection_db = require("../database/connection_db");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "deposit",
  description: "This is a deposit command",
  execute(message, args, Discord) {
    //Code to run after command.
    let amount = parseInt(message.content.substring(9));
    const username = message.member.user.tag;
    const userID = message.member.id;

    var coins;
    var bank;

    connection_db.query("SELECT * FROM user_profile", (err, userProfiles) => {
      userProfiles.forEach((user) => {
        if (user.userID == userID) {
          bank = user.bank;
          coins = user.coins;

          if (amount <= coins) {
            bank += amount;
            coins -= amount;
            message.channel.send(
              "Depsoted $" +
                amount
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            );
            connection_db.query(
              `UPDATE user_profile SET coins=${coins} WHERE userID='${userID}'`,
              function (err, result) {}
            );
            connection_db.query(
              `UPDATE user_profile SET bank=${bank} WHERE userID='${userID}'`,
              function (err, result) {}
            );
          } else if (amount > coins) {
            message.channel.send(
              "Something went wrong... Do you have enough coins?"
            );
          }
        }
      });
    });
  },
};
