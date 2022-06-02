const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
// const { checkBasic } = require("./checks/check");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reject")
        .setDescription("Rejects a person's request to join the server.")
        .addUserOption((option) =>
            option.setName("member").setDescription("The member to reject.").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("The reason for rejection.")
        ),
    async execute(interaction) {
        const user = interaction.options.getUser("member");
        const member = interaction.guild.members.cache.find((member) => member.id === user.id);
        const reason = interaction.options.getString("reason")
            ? ` because ${interaction.options.getString("reason")}`
            : ".";
        await interaction.deferReply();
        const checkBasic = (interaction) => {
            return interaction.channelId === "684908788909867037";
        };
        const checkRoles = checkBasic(interaction);

        if (checkRoles) {
            // TODO: Check if the user has the required permissions
            // Permissions: (Have "Whitelister" role AND Send in ADMIN category) or "ADMINISTRATOR"
            // TODO: React to the user's message with a rejectmark in Application channel

            // TODO: Send the following embed in the log channel
            logEmbed = new MessageEmbed()
                .setTitle(`${member.user.username} Rejected`)
                .setDescription(`${interaction.user} rejected ${member}${reason}`)
                .setColor("#7BFA5A");

            // Inform the user that they have been rejected
            if (member.kickable) {
                try {
                    await interaction.editReply(`${member} has been rejected from the server.`);
                    logEmbed.addField("Member Kicked", `${member.user}'s was kicked`);
                    const informMessage = `You were NOT accepted in in Wolf Craft${reason}`;
                    member.send(informMessage);
                    interaction.guild.channels.cache
                        .get("968805196098592801")
                        .send({ embeds: [logEmbed] });
                    member.kick(reason);
                } catch (error) {
                    console.error(error);
                }
            } else {
                await interaction.editReply({
                    content: `${member} is not kickable. Please contact an administrator.`,
                    ephemeral: true,
                });
            }
        } else {
            try {
                await interaction.editReply({
                    content: `https://tenor.com/view/camelot-gif-22738779`,
                    ephemeral: false,
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
};
