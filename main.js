require("dotenv").config();
const connection_db = require("./database/connection_db");
let connection;
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "=";
const fs = require("fs");
const profile = require("./commands/profile");

client.commands = new Discord.Collection();

module.exports = async (Discord, args, client, message) => {
  var profileData;

  profileData = connection_db.query(
    `FIND * FROM user_profile WHERE userID=${message.author.id}`
  );

  if (!profileData) {
    console.log(`No profile data found... for ${message.author.id}`);
  }
};
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

//Commands
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "help") {
    client.commands.get("help").execute(message, args, Discord);
  }
  if (command === "profile") {
    client.commands.get("profile").execute(message, args, Discord);
  }
  if (command === "stats" || command === "stat" || command === "health") {
    client.commands.get("stats").execute(message, args, Discord);
  }
  if (command === "bank" || command === "b" || command === "banks") {
    client.commands.get("bank").execute(message, args, Discord);
  }
  if (command === "games") {
    client.commands.get("games").execute(message, args, Discord);
  }
  if (command === "dice") {
    client.commands.get("dice").execute(message, args, Discord);
  }
  if (command === "attack") {
    client.commands.get("attack").execute(message, args, Discord);
  }
  if (command === "items_db") {
    client.commands.get("items_db").execute(message, args, Discord);
  }
  if (command === "beg") {
    client.commands.get("beg").execute(message, args, Discord);
  }
  if (
    command === "chests" ||
    command === "chest" ||
    command === "lootbox" ||
    command === "crates" ||
    command === "crate"
  ) {
    client.commands.get("chests").execute(message, args, Discord);
  }
  if (command === "commands") {
    client.commands.get("commands").execute(message, args, Discord);
  }
});

client.on("ready", () => console.log(`${client.user.tag} logged in.`));

(async () => {
  connection = await require("./database/connection_db");
  await client.login(process.env.BOT_TOKEN);
})();
