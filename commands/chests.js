const connection_db = require("../database/connection_db");
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  name: "chests",
  description: "This is a chests command",
  execute(message, args, Discord) {
    //Code to run after command.

    connection_db.query(
      "SELECT * FROM items WHERE _itemID BETWEEN 7 AND 10",
      (err, rows) => {
        if (err) throw err;

        rows.forEach((row) => {
          const newEmbed = new Discord.MessageEmbed()
            .setColor("#E3CA7F")
            .setTitle(row.itemName)
            .setDescription(row.itemDesc)
            .setThumbnail(row.itemIMG)
            .addFields(
              { name: "Name: ", value: row.itemName, inline: true },
              { name: "ID: ", value: row._itemID, inline: true },
              {
                name: "Value: ",
                value: `$${row.itemValue
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`,
                inline: true,
              }
            );
          message.channel.send(newEmbed);
          //message.channel.send(
          // `Item ID: ${row._itemID} Item Name: ${row.itemName} Item Value: ${row.itemValue} Image: ${row.itemIMG}`
          //);
        });
      }
    );
  },
};
