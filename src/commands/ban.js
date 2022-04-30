const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { loggingChannel } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bans a member from the server.")
        .addUserOption((option) =>
            option.setName("member").setDescription("The member to ban.").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("username").setDescription("The username to ban")
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("The reason for ban.")
        ),
    async execute(interaction) {
        const user = interaction.options.getUser("member");
        const member = interaction.guild.members.cache.find((member) => member.id === user.id);
        const username = interaction.options.getString("username");
        const reason = interaction.options.getString("reason") || "Ban Hammer has spoken.";
        await interaction.deferReply();
        const checkRoles = true;

        if (checkRoles) {
            // TODO: Check if the user has the required permissions
            // Permissions: (Have "Whitelister" role AND Send in ADMIN category) or "ADMINISTRATOR"

            // TODO: Send the following embed in the log channel
            logEmbed = new MessageEmbed()
                .setTitle(`${member.user.username} Banned`)
                .setDescription(`${interaction.user} banned ${member}${reason}`)
                .setColor("#7BFA5A");
            interaction.guild.channels.cache.get(loggingChannel).send({ embeds: [logEmbed] });
            // TODO: Ban the player in console

            // Inform the user that they have been rejected
            try {
                if (member.kickable) {
                    member.ban(reason);
                    await interaction.editReply(`${member} has been banned from the server.`);
                } else
                    await interaction.editReply(
                        `${member} is not kickable. Please contact an administrator.`
                    );
            } catch (error) {
                console.error(error);
            }
        }
    },
};
