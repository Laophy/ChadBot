module.exports = {
    name: 'help',
    description: "This is a help command",
    execute(message, args, Discord){
        //Code to run after command.
        message.channel.send('Help is here....');
    }
}