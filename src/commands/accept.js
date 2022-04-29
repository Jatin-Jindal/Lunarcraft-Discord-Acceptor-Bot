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
        const user = interaction.options.getUser("member");
        const member = interaction.guild.members.cache.find((member) => member.id === user.id);
        const username = interaction.options.getString("username");
        await interaction.deferReply();
        const hasRole = (roleId) => member.roles.cache.find((role) => role.id == roleId);
        rolesRequired = {
            needed1: "969586130582376478",
            needed2: "969586201898127384",
        };
        const checkRoles = Object.keys(rolesRequired).every((key) => hasRole(rolesRequired[key]));

        if (checkRoles) {
            // ROLE MANIPULATION STUFF
            roleToAdd = interaction.guild.roles.cache.find((role) => role.name === "unneeeded1");
            Object.values(rolesRequired).forEach((roleId) => member.roles.remove(roleId));
            member.roles.add(roleToAdd);

            // TODO: React to the user's message with a checkmark in Application channel

            // TODO: Send the following embed in the log channel
            logEmbed = new MessageEmbed()
                .setTitle("Application Accepted")
                .setDescription(
                    `${member.user} has been accepted into the server by ${interaction.user}.`
                )
                .setColor("#7BFA5A");
            interaction.guild.channels.cache.get("968805196098592801").send({ embeds: [logEmbed] });

            if (username && member.displayName !== username) {
                member.setNickname(username);
                logEmbed.addField(
                    "Username Changed",
                    `${member.user}'s username was changed to ${username}.`
                );
            }
            await interaction.editReply(`${member} has been accepted into the server.`);
            // Inform the user that they have been accepted
            const acceptMessageStuff = {
                general: "657605715921469480",
                botCommands: "657605715921469480",
                claims: "869554027745148948",
                mcVersion: "1.17.1",
            };
            const informMessage = `Hello ${member} and welcome to WolfCraft, we’re glad to have you here. \n\nSome of the key information you’ll need to know is in the “important information tab” you can find reaction roles and link to the live map as well as links to our many different advertising websites. I hope if you enjoy your time here you’ll be kind enough to look through them and upvote 🙂 you can also use prefixes &ip and &map in <#${acceptMessageStuff.general}>  or <#${acceptMessageStuff.botCommands}> , just so you know, the server is ${acceptMessageStuff.mcVersion}.\n\nI would also take a quick look at our <#${acceptMessageStuff.claims}> channel, this is how we “claim” land so there isn’t any confusion on who’s stuff is who’s. This is completely trust based, but we do have ways to make sure your claim stays safe (:\n\nBefore joining the server I would recommend going through the rules one more time so you can be absolutely sure you won’t accidentally break any of them! \n\n- if you have any questions ask in the chat or server help 😄`;
            interaction.guild.channels.cache.get("968805196098592801").send(informMessage);
        } else {
            await interaction.editReply(
                `Can Not accept ${member}${
                    username ? `(${username})` : ""
                } as they have not read rules, or are not New`
            );
        }
        // console.log(member.roles.cache);

        /*
            await sendChannel.send(
                f'{member.mention} you have been accepted!\n\nIP Address: wolfcraft.mcserver.us\nYou should be seeing a lot more channels in the discord! We have an {(discord.utils.get(ctx.guild.text_channels, name = "in-game-bridge")).mention} where you can talk to players online and vice-versa, a {(discord.utils.get(ctx.guild.text_channels, name = "live-map")).mention} of our world and some other great features!')
                */
    },
};
