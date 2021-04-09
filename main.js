require("dotenv").config();

//const db = require("../ChadBot/database/connection_db");
let connection;
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "=";
const fs = require("fs");

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

global.cash = 100;
global.items = ["Wooden Sword", "Wooden Bow", "Wooden Shield", "Wooden Wand"];
global.consumables = [
  ["HP Pot", "(+10)", 1],
  ["Mana Pot", "(+10)", 1],
];

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
  connection = await require("../ChadBot/database/connection_db");
  await client.login(process.env.BOT_TOKEN);
})();

module.exports = { cash, items, consumables };
