const connection_db = require("../database/connection_db");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "stats",
  description: "This is a stats command",
  execute(message, args, Discord) {
    const username = message.member.user.tag;
    const userID = message.member.id;
    var newUsername = username.substring(0, username.length - 5);
    message.channel.send("Stats command ran");

    //https://oldschool.runescape.wiki/w/Experience
    function calculateLevel(exp) {
      var finalLevel;
      if (exp <= 1) {
        finalLevel = 1;
      } else if (exp <= 83) {
        finalLevel = 2;
      } else if (exp <= 174) {
        finalLevel = 3;
      } else if (exp <= 276) {
        finalLevel = 4;
      } else if (exp <= 388) {
        finalLevel = 5;
      } else if (exp <= 512) {
        finalLevel = 6;
      } else if (exp <= 650) {
        finalLevel = 7;
      } else if (exp <= 801) {
        finalLevel = 8;
      } else if (exp <= 969) {
        finalLevel = 9;
      } else if (exp <= 1154) {
        finalLevel = 10;
      } else if (exp <= 1358) {
        finalLevel = 11;
      } else if (exp <= 1584) {
        finalLevel = 12;
      } else if (exp <= 1833) {
        finalLevel = 13;
      } else if (exp <= 2107) {
        finalLevel = 14;
      } else if (exp <= 2411) {
        finalLevel = 15;
      } else if (exp <= 2746) {
        finalLevel = 16;
      } else if (exp <= 3115) {
        finalLevel = 17;
      } else if (exp <= 3523) {
        finalLevel = 18;
      } else if (exp <= 3973) {
        finalLevel = 19;
      } else if (exp <= 4470) {
        finalLevel = 20;
      } else if (exp <= 5018) {
        finalLevel = 21;
      } else if (exp <= 5624) {
        finalLevel = 22;
      } else if (exp <= 6291) {
        finalLevel = 23;
      } else if (exp <= 7028) {
        finalLevel = 24;
      } else if (exp <= 7842) {
        finalLevel = 25;
      } else if (exp <= 8740) {
        finalLevel = 26;
      } else if (exp <= 9730) {
        finalLevel = 27;
      } else if (exp <= 10824) {
        finalLevel = 28;
      } else if (exp <= 12031) {
        finalLevel = 29;
      } else if (exp <= 13363) {
        finalLevel = 30;
      } else if (exp <= 0) {
        finalLevel = 31;
      } else if (exp <= 0) {
        finalLevel = 32;
      } else if (exp <= 0) {
        finalLevel = 33;
      } else if (exp <= 0) {
        finalLevel = 34;
      } else if (exp <= 0) {
        finalLevel = 35;
      } else if (exp <= 0) {
        finalLevel = 36;
      } else if (exp <= 0) {
        finalLevel = 37;
      } else if (exp <= 0) {
        finalLevel = 38;
      } else if (exp <= 0) {
        finalLevel = 39;
      } else if (exp <= 0) {
        finalLevel = 40;
      } else if (exp <= 0) {
        finalLevel = 41;
      } else if (exp <= 0) {
        finalLevel = 42;
      } else if (exp <= 0) {
        finalLevel = 43;
      } else if (exp <= 0) {
        finalLevel = 44;
      } else if (exp <= 0) {
        finalLevel = 45;
      }

      return finalLevel;
    }

    connection_db.query("SELECT * FROM user_exp", (err, expProfiles) => {
      expProfiles.forEach((userExp) => {
        if (userExp.userID == userID) {
          message.channel.send("Has a profile");

          let overlallXP =
            userExp.attack +
            userExp.defence +
            userExp.melee +
            userExp.range +
            userExp.mage +
            userExp.woodcutting +
            userExp.firemaking +
            userExp.fishing +
            userExp.gambling;

          let overallLevel =
            calculateLevel(userExp.attack) +
            calculateLevel(userExp.defence) +
            calculateLevel(userExp.melee) +
            calculateLevel(userExp.range) +
            calculateLevel(userExp.mage) +
            calculateLevel(userExp.woodcutting) +
            calculateLevel(userExp.firemaking) +
            calculateLevel(userExp.fishing) +
            calculateLevel(userExp.gambling);

          //Loaded exp for the player...
          const statsEmbed = new Discord.MessageEmbed()
            .setColor("#97E37F") //Green
            .setAuthor(
              newUsername + "s Stats",
              "https://cdn3.iconfinder.com/data/icons/glypho-travel/64/history-swords-crossed-512.png",
              ""
            )
            .addFields(
              { name: "Player Name:", value: newUsername },
              { name: "Total XP", value: parseInt(overlallXP) },
              { name: "\u200B", value: "\u200B" } //Creates a space / gap
            )
            .addFields(
              {
                name: "Overall: ",
                value: overallLevel,
                inline: true,
              },
              {
                name: "Attack: ",
                value: calculateLevel(userExp.attack),
                inline: true,
              },
              {
                name: "Defence: ",
                value: calculateLevel(userExp.defence),
                inline: true,
              },
              {
                name: "Melee: ",
                value: calculateLevel(userExp.melee),
                inline: true,
              },
              {
                name: "Range: ",
                value: calculateLevel(userExp.range),
                inline: true,
              },
              {
                name: "Mage: ",
                value: calculateLevel(userExp.mage),
                inline: true,
              },
              {
                name: "Wood Cutting: ",
                value: calculateLevel(userExp.woodcutting),
                inline: true,
              },
              {
                name: "Fire Making: ",
                value: calculateLevel(userExp.firemaking),
                inline: true,
              },
              {
                name: "Fishing: ",
                value: calculateLevel(userExp.fishing),
                inline: true,
              },
              {
                name: "Gambling: ",
                value: calculateLevel(userExp.gambling),
                inline: true,
              }
            )
            .setFooter("User ID: " + userID);
          message.channel.send(statsEmbed);
        }
      });
    });
  },
};
