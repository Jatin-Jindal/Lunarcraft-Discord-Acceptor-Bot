const { SlashCommandBuilder } = require("@discordjs/builders");
const { ownerID } = require("../../config.json");
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
            return (
                interaction.channelId === "684908788909867037" ||
                interaction.channelId === "789566159732604978"
            );
        };
        const checkRoles = checkBasic(interaction);
        const specialPerm = interaction.user.id === ownerID;
        const isQueen = interaction?.member.roles.cache.find(
            (role) => role.id == "970431543673753601"
        );

        if (checkRoles || isQueen || specialPerm) {
            // TODO: React to the user's message with a rejectmark in Application channel
            interaction.client?.guilds.cache
                .get("657605715921469477") // Lunarcraft guild
                ?.channels.cache.get("672212135505559554") // Application channel
                ?.messages.fetch()
                .then((msgs) => {
                    msgs.find((m) => m.author.id === user.id)
                        .react("❎")
                        .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));

            // DONE: Send the following embed in the log channel
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
                        .get("789566159732604978")
                        .send({ embeds: [logEmbed] });
                    member.kick(reason);
                } catch (error) {
                    await interaction.editReply({
                        content: `Something went wrong.\n{error}`,
                        ephemeral: true,
                    });
                }
            } else {
                await interaction.editReply({
                    content: `${member} is not kickable. Please contact an administrator.`,
                    ephemeral: true,
                });
            }
        } else {
            await interaction.editReply({
                content: `https://tenor.com/view/camelot-gif-22738779`,
                ephemeral: false,
            });
        }
    },
};
