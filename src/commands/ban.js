const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bans a member from the server.")
        .addUserOption((option) =>
            option.setName("member").setDescription("The member to ban.").setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("delete_messages")
                .setDescription("How much of their recent message history to delete.")
                .setRequired(true)
                .addChoices(
                    { name: "Don't Delete Any", value: 0 },
                    { name: "Previous 24 hours", value: 1 },
                    { name: "Previous 48 hours", value: 2 },
                    { name: "Previous 7 days", value: 7 }
                )
        )
        .addStringOption((option) =>
            option.setName("username").setDescription("The username to ban")
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("The reason for banning, if any.")
        ),
    async execute(interaction) {
        const user = interaction.options.getUser("member");
        const member = interaction.guild.members.cache.find((member) => member.id === user.id);
        const username = interaction.options.getString("username");
        const reason = interaction.options.getString("reason") || "Ban Hammer has spoken.";
        const checkRoles = true;

        if (checkRoles && member.bannable) {
            await interaction.deferReply();

            // TODO: Check if the user has the required permissions
            // Permissions: (Have "Whitelister" role AND Send in ADMIN category) or "ADMINISTRATOR"

            // TODO: Send the following embed in the log channel
            logEmbed = new MessageEmbed()
                .setTitle(`${member.user.username} Banned`)
                .setDescription(`${interaction.user} banned ${member}\n**REASON: **${reason}`)
                .setColor("#7BFA5A");
            // TODO: Ban the player in console

            // Inform the user that they have been rejected
            interaction.guild.channels.cache.get("968805196098592801").send({ embeds: [logEmbed] });
            member
                .ban({ days: interaction.options.getInteger("delete_messages"), reason: reason })
                .catch(console.error);

            await interaction.editReply(`${member} has been banned from the server.`);
        } else {
            await interaction.editReply({
                content: `${member} is not bannable. Please contact an administrator.`,
                ephemeral: true,
            });
        }
    },
};
