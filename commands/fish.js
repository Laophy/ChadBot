const connection_db = require("../database/connection_db");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "fish",
  description: "This is a fish command",
  execute(message, args, Discord) {
    //Code to run after command.
    const username = message.member.user.tag;
    const userID = message.member.id;
    var newUsername = username.substring(0, username.length - 5);

    var fishOdds = [5, 25, 100, 250, 600, 1000, 2000, 5000, 10000, 50000];
    var fishValue;
    var fishName = [
      "Common",
      "Uncommon",
      "Rare",
      "Very Rare",
      "Epic",
      "Ultra Epic",
      "Legendary",
    ];

    var caughtFish = fishName[4];
    var caughtFishOdds = fishOdds[4];

    const fishingEmbed = new Discord.MessageEmbed()
      .setColor("#E3CA7F")
      .setTitle(`:fish: ${newUsername}'s Fishing... :fish:`)
      .setDescription(
        `You caught a ${caughtFish} fish, odds are 1 in ${caughtFishOdds}`
      )
      .addFields(
        { name: "Type: ", value: caughtFish, inline: true },
        { name: "Odds: ", value: "1 in " + caughtFishOdds, inline: true },
        {
          name: "Value: ",
          value: "$0.00",
        }
      );

    message.channel.send(fishingEmbed);
  },
};
