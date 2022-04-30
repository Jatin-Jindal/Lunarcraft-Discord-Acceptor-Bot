const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("accept")
        .setDescription("Accepts a person's request to join the server.")
        .addUserOption((option) =>
            option.setName("member").setDescription("The member to accept.").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("username").setDescription("The member's in-game username.")
        ),
    async execute(interaction) {
        // TODO: Check if the user has the required permissions
        // Permissions: (Have "Whitelister" role AND Send in ADMIN category) or "ADMINISTRATOR"
        const user = interaction.options.getUser("member");
        const member = interaction.guild.members.cache.find((member) => member.id === user.id);
        const username = interaction.options.getString("username");
        const usernameLength = 32;
        await interaction.deferReply();
        const hasRole = (roleId) => member.roles.cache.find((role) => role.id == roleId);
        rolesRequired = {
            needed1: "969586130582376478",
            needed2: "969586201898127384",
        };
        const checkRoles = Object.keys(rolesRequired).every((key) => hasRole(rolesRequired[key]));
        const specialPerm = interaction.user.id === "437491079869104138";
        if (checkRoles || specialPerm) {
            // ROLE MANIPULATION STUFF
            roleToAdd = interaction.guild.roles.cache.find((role) => role.name === "unneeeded1");
            Object.values(rolesRequired).forEach((roleId) => member.roles.remove(roleId));
            member.roles.add(roleToAdd);

            // TODO: Send a request to actually whitelist the player IF username is provided
            // TODO: React to the user's message with a checkmark in Application channel

            // TODO: Send the following embed in the log channel
            logEmbed = new MessageEmbed()
                .setTitle("Application Accepted")
                .setDescription(
                    `${member.user} has been accepted into the server by ${interaction.user}.`
                )
                .setColor("#7BFA5A");
            if (username && member.displayName !== username) {
                const nickname =
                    username.length > usernameLength
                        ? username.substring(0, usernameLength)
                        : username;
                member.setNickname(nickname);
                logEmbed.addField(
                    "Username Changed",
                    `${member.user}'s username was changed to ${username}.`
                );
            }
            interaction.guild.channels.cache.get("968805196098592801").send({ embeds: [logEmbed] });
            await interaction.editReply(`${member} has been accepted into the server.`);

            // Inform the user that they have been accepted
            const acceptMessageStuff = {
                general: "657605715921469480",
                botCommands: "657605715921469480",
                claims: "869554027745148948",
                mcVersion: "1.17.1",
            };
            const informMessage =
                `Hello ${member} and welcome to WolfCraft, we’re glad to have you here. \n\n` +
                `Some of the key information you’ll need to know is in the “Important Information” category you can find reaction roles and link to the live map as well as links to our many different advertising websites. I hope if you enjoy your time here you’ll be kind enough to look through them and upvote 🙂 you can also use prefixes &ip and &map in <#${acceptMessageStuff.general}>  or <#${acceptMessageStuff.botCommands}> , just so you know, the server is ${acceptMessageStuff.mcVersion}.\n\n` +
                `I would also take a quick look at our <#${acceptMessageStuff.claims}> channel, this is how we “claim” land so there isn’t any confusion on who’s stuff is who’s. This is completely trust based, but we do have ways to make sure your claim stays safe (:\n\n` +
                `Before joining the server I would recommend going through the rules one more time so you can be absolutely sure you won’t accidentally break any of them! \n\n` +
                `- if you have any questions ask in the chat or server help 😄`;
            interaction.guild.channels.cache.get("968805196098592801").send(informMessage);
        } else {
            await interaction.editReply(
                `Can Not accept ${member}${
                    username ? `(${username})` : ""
                } as they have not read rules, or are not New`
            );
        }
        // console.log(member.roles.cache);
    },
};
