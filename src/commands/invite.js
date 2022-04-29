const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Invite the bot to another server!"),
    async execute(interaction) {
        const inviteURL = `https://discord.com/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=1523036024054&scope=bot%20applications.commands`;
        // const embed = new MessageEmbed()
        //     .setDescription(`[Invite](${inviteURL}) the bot to your server!`)
        //     .setColor("#0099ff")
        //     .setTitle("Invite the bot to your server!")
        //     .setURL(inviteURL);

        await interaction.reply({
            content: `[Invite](${inviteURL}) the bot to your server!`,
            // embeds: [embed],
            ephemeral: true,
        });
    },
};
