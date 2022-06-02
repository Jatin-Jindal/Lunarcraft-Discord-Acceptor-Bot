const fs = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("../config.json");

const commands = [];
const commandFiles = fs.readdirSync("src/commands").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

// Guild Commands push (DEV)
console.log("Started refreshing application (/) commands.");
rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands,
}).then(() => console.log("Successfully reloaded application (/) commands"));

/* Global Commands push */
console.log("Started refreshing global (/) commands.");
rest.put(Routes.applicationCommands(clientId), {
    body: commands,
}).then(() => console.log("Successfully reloaded global (/) commands"));
/* */
