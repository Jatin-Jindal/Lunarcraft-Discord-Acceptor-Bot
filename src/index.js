// Require the necessary discord.js classes
const { Client, Intents, Collection } = require("discord.js");
const { token } = require("../config.json");
const fs = require("node:fs");

console.log("Starting Bot...");
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Command Handling
client.commands = new Collection();
const commandFiles = fs.readdirSync("src/commands").filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Event Handling
const eventFiles = fs.readdirSync("src/events").filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Login to Discord with your client's token
client.login(token);
