const connection_db = require("../database/connection_db");
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  name: "profile",
  description: "Creates or views a profile",
  execute(message, args, Discord) {
    //Code to run after command.
    const username = message.member.user.tag;
    const userID = message.member.id;
    var hasProfile = true;

    var newUsername = username.substring(0, username.length - 5);

    connection_db.query("SELECT * FROM user_profile", (err, rows) => {
      //if (err) throw err;

      rows.forEach((row) => {
        if (row.userID != userID) {
          hasProfile = false;
        } else {
          hasProfile = true;
        }
      });
      if (hasProfile == false) {
        createProfile();
      }
    });

    //Create the profile
    function createProfile() {
      var sendNewProfile = `INSERT INTO user_profile (userID, coins, bank, isAdmin, nick) VALUES (${userID}, 1000, 0, 0, '${newUsername}')`;
      var createExpLevels = `INSERT INTO user_exp (userID, nick) VALUES (${userID}, '${newUsername}')`;

      connection_db.query(createExpLevels, function (err, result) {
        console.log(`Created a exp file for user: ${newUsername}`);
      });
      connection_db.query(sendNewProfile, function (err, result) {
        console.log(`Created a profile for user: ${newUsername}`);
      });
    }
  },
};
