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
    message.channel.send("Profile command ran....");
    global.hasProfile = false;

    connection_db.query("SELECT userID FROM user_profile", (err, rows) => {
      if (err) throw err;

      rows.forEach((row) => {
        if (row.userID == userID) {
          message.channel.send("yes profile found");
          global.hasProfile = true;
        } else {
          message.channel.send("no profile found.");
          global.hasProfile = false;
        }
      });
    });
    //Create the profile
    function createProfile() {
      message.channel.send(
        "CreateProfile function is running.. Profile should be in DB now..."
      );
      var sendNewProfile = `INSERT INTO user_profile (userID, coins, bank) VALUES (${userID}, 1000, 0)`;

      connection_db.query(sendNewProfile, function (err, result) {
        if (err) throw err;
        console.log("Just inserted a new row...");
      });
    }
    message.channel.send(` 1 ${global.hasProfile}`);
    if (global.hasProfile == false) {
      message.channel.send(`2 ${global.hasProfile}`);
      createProfile();
    }
  },
};
