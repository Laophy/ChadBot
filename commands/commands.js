module.exports = {
  name: "commands",
  description: "This is a commands command",
  execute(message, args, Discord) {
    //Code to run after command.
    const username = message.member.user.tag;
    const userID = message.member.id;

    const newEmbed = new Discord.MessageEmbed()
      .setColor("#E3CA7F")
      .setTitle("King Chads Commands")
      .setDescription("List of all available commands...")
      .addFields(
        {
          name: "Prefix: ",
          value: "=",
          inline: true,
        },
        {
          name: "Help: ",
          value: "=help",
          inline: true,
        },
        {
          name: "Commands: ",
          value: "=commands",
          inline: true,
        },
        {
          name: "Games: ",
          value: "=games",
          inline: true,
        },
        {
          name: "Bank ",
          value: "=b, =bank, =inventory",
          inline: true,
        },
        {
          name: "Items Database: ",
          value: "=items_db",
          inline: true,
        },
        {
          name: "Attacking: ",
          value: "=attack",
          inline: true,
        },
        {
          name: "View Stats: ",
          value: "=stats",
          inline: true,
        },
        {
          name: "Gamble Dice: ",
          value: "=dice AMT",
          inline: true,
        },
        {
          name: "Chests: ",
          value: "=chests",
          inline: true,
        }
      )
      .setFooter("User ID: " + userID);

    message.channel.send(newEmbed);
  },
};
