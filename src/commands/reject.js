const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

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
        const checkRoles = true;

        if (checkRoles) {
            // TODO: Check if the user has the required permissions
            // Permissions: (Have "Whitelister" role AND Send in ADMIN category) or "ADMINISTRATOR"
            // TODO: React to the user's message with a rejectmark in Application channel

            // TODO: Send the following embed in the log channel
            logEmbed = new MessageEmbed()
                .setTitle(`${member.user.username} Rejected`)
                .setDescription(`${interaction.user} rejected ${member}${reason}`)
                .setColor("#7BFA5A")
                .addField("Member Kicked", `${member.user}'s was kicked`);

            interaction.guild.channels.cache.get("968805196098592801").send({ embeds: [logEmbed] });
            await interaction.editReply(`${member} has been rejected from the server.`);

            // Inform the user that they have been rejected
            try {
                const informMessage = `You were NOT accepted in in Wolf Craft${reason}`;
                const dmChannel = await member.createDM(true);
                dmChannel.send(informMessage);
                if (member.kickable) member.kick(reason);
                else
                    await interaction.followUp({
                        content: `${member} is not kickable. Please contact an administrator.`,
                        ephemeral: true,
                    });
            } catch (error) {
                console.error(error);
            }
        }
    },
};
