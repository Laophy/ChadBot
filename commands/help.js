module.exports = {
  name: "help",
  description: "This is a help command",
  execute(message, args, Discord) {
    //Code to run after command.
    message.channel.send(
      "Use the command =commands to find all commands available to you! Cheers."
    );
  },
};
