const connection_db = require("../database/connection_db");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "leaderboard",
  description: "This is a leaderboard command",
  execute(message, args, Discord) {
    //Code to run after command.
    const username = message.member.user.tag;
    const userID = message.member.id;
    var newUsername = username.substring(0, username.length - 5);

    const leaderBoard = new Discord.MessageEmbed()
      .setColor("#E3CA7F")
      .setTitle(`:dollar: ChadBot Leaderboard :dollar:`)
      .setDescription(`ChadBots Cash Leaderboard!`)
      .addFields({
        name: "1: KingChad: " + ":dollar: $1,000,000.00",
        value: "\u200B",
        inline: true,
      });
    message.channel.send(leaderBoard);
  },
};
