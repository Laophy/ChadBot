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
          message.channel.send("No profile");
          hasProfile = false;
        } else {
          message.channel.send("A profile has been found");
          hasProfile = true;
        }
      });
      if (hasProfile == false) {
        message.channel.send("I just tried to create another profile...");
        createProfile();
      }
    });
    //Create the profile
    function createProfile() {
      message.channel.send("createProfile();");
      var sendNewProfile = `INSERT INTO user_profile (userID, coins, bank, isAdmin, nick) VALUES (${userID}, 1000, 0, 0, '${newUsername}')`;

      connection_db.query(sendNewProfile, function (err, result) {
        //if (err) throw err;
        console.log(`Created a profile for user: ${username}`);
      });
    }
  },
};
