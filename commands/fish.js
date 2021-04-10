module.exports = {
  name: "fish",
  description: "This is a fish command",
  execute(message, args, Discord) {
    //Code to run after command.
    const fishingEmbed = new Discord.MessageEmbed()
      .setColor("#E3CA7F")
      .setTitle("Fishing...")
      .setDescription("You caught a chad fish! Odds are 1 in 1,000,000")
      .addFields(
        { name: "Name: ", value: "CHAD FISH", inline: true },
        { name: "ID: ", value: "69", inline: true },
        {
          name: "Value: ",
          value: "$1,000,000",
        }
      );
    message.channel.send(fishingEmbed);
  },
};
