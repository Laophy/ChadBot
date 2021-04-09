module.exports = {
  name: "games",
  description: "This is a games command",
  execute(message, args, Discord) {
    //Code to run after command.
    const username = message.member.user.tag;
    const userID = message.member.id;

    const newEmbed = new Discord.MessageEmbed()
      .setColor("#E3CA7F")
      .setTitle("King Chads Games")
      .setDescription(
        "King chad is full of games, here is the current list of playable games."
      )
      .addFields(
        { name: "Dice Over or Under 50.", value: "=dice", inline: true },
        { name: "Attack mobs", value: "=attack", inline: true },
        { name: "Get help....", value: "=help", inline: true }
      )
      .setImage(
        "https://www.mcgill.ca/oss/files/oss/styles/hd/public/deckofcards_cover-02.png?itok=S-zIXK-9&timestamp=1530113172"
      )
      .setFooter("User ID: " + userID);

    message.channel.send(newEmbed);
  },
};
