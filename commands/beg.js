const connection_db = require("../database/connection_db");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "beg",
  description: "This is a beg command",
  execute(message, args, Discord) {
    //Code to run after command.
    const username = message.member.user.tag;
    const userID = message.member.id;

    let coins;
    let bank;
    let primaryKey;

    connection_db.query(`SELECT * FROM user_profile`, (err, profileRow) => {
      if (err) {
        throw err;
      }
      profileRow.forEach((profile) => {
        if (profile.userID == userID) {
          coins = parseInt(profile.coins);
          let randomBeg = Math.floor(Math.random() * 100);
          coins = coins + randomBeg;
          message.channel.send(
            `You begged a random person on the server and got $${randomBeg} you now have $${coins
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`
          );
          connection_db.query(
            `UPDATE user_profile SET coins=${coins} WHERE userID='${userID}'`,
            function (err, result) {}
          );
        }
      });
    });
  },
};
