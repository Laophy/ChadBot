const connection_db = require("../database/connection_db");
const { items } = require("../main");
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  name: "items_db",
  description: "This is a items command",
  execute(message, args, Discord) {
    //Code to run after command.
    connection_db.query("SELECT * FROM items", (err, rows) => {
      if (err) throw err;

      const newEmbed = new Discord.MessageEmbed()
        .setColor("#E3CA7F")
        .setTitle("Item DB")
        .addFields(
          { name: "Name: ", value: "\u200B", inline: true },
          { name: "ID: ", value: "\u200B", inline: true },
          { name: "\u200B", value: "\u200B", inline: true }
        );

      rows.forEach((row) => {
        //Loop through all  the rows of items.
        newEmbed.addFields({
          name: row.itemName,
          value: row._itemID,
          inline: true,
        });
      });

      message.channel.send(newEmbed);
    });
  },
};
