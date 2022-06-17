const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { ownerID } = require("../../config.json");

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
        // DONE: Check if the user has the required permissions
        // Permissions: (Have "Whitelister" role AND Send in ADMIN category) or "ADMINISTRATOR"
        const user = interaction.options.getUser("member");
        const member = interaction.guild.members.cache.find((member) => member.id === user.id);
        const username = interaction.options.getString("username");
        const usernameLength = 32;
        await interaction.deferReply();
        const hasRole = (roleId) => member.roles.cache.find((role) => role.id == roleId);
        rolesRequired = {
            needed1: "672211303368228864",
            needed2: "672073106134794251",
        };
        const checkBasic = (interaction) => {
            return (
                interaction.channelId === "684908788909867037" ||
                interaction.channelId === "789566159732604978"
            );
        };
        const checkRoles = Object.keys(rolesRequired).every((key) => hasRole(rolesRequired[key]));
        const specialPerm = interaction.user.id === ownerID;
        const isQueen = interaction?.member.roles.cache.find(
            (role) => role.id == "970431543673753601"
        );
        console.log(username);

        if (checkBasic(interaction) || isQueen || specialPerm) {
            if (checkRoles) {
                // ROLE MANIPULATION STUFF
                roleToAdd = interaction.guild.roles.cache.find(
                    (role) => role.name === "unneeeded1"
                );
                Object.values(rolesRequired).forEach((roleId) => member.roles.remove(roleId));
                member.roles.add(roleToAdd);

                // DONE: Send a request to actually whitelist the player IF username is provided
                if (username) {
                    try {
                        interaction.guild.channels.cache
                            .get("665965513968582658")
                            .send(`whitelist add ${username}`);
                    } catch (error) {
                        console.log(
                            `Something went wrong while accepting username = ${username}\n` +
                                `Error: ${error}\n\n\n` +
                                "-".repeat(70) +
                                `\n`
                        );
                    }
                }

                // DONE: React to the user's message with a checkmark in Application channel
                interaction.client?.guilds.cache
                    .get("657605715921469477") // Lunarcraft guild
                    ?.channels.cache.get("672212135505559554") // Application channel
                    ?.messages.fetch()
                    .then((msgs) => {
                        msgs.find((m) => m.author.id === user.id)
                            .react("✅")
                            .catch((e) => console.log(e));
                    })
                    .catch((e) => console.log(e));

                // DONE: Send the following embed in the log channel
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
                interaction.guild.channels.cache
                    .get("789566159732604978")
                    .send({ embeds: [logEmbed] });
                await interaction.editReply(`${member} has been accepted into the server.`);

                // Inform the user that they have been accepted
                const acceptMessageStuff = {
                    general: "657605715921469480",
                    botCommands: "729000139355586610",
                    claims: "979115276887007243",
                    mcVersion: "1.19",
                    sendChannel: "968805196098592801",
                    communitySupport: "657611656154578944",
                };
                const informMessage =
                    `Hello ${member} and welcome to LunarCraft, we’re glad to have you here. \n\n` +
                    `Some of the key information you’ll need to know is in the “Important” category you can find reaction roles and the link to the live map as well as links to our many different advertising websites. I hope if you enjoy your time here you’ll be kind enough to look through them and upvote 🙂 you can also use prefixes &ip and &map in <#${acceptMessageStuff.general}>  or <#${acceptMessageStuff.botCommands}> , just so you know, the server is ${acceptMessageStuff.mcVersion}.\n\n` +
                    `I would also take a quick look at our <#${acceptMessageStuff.claims}> channel, this is how we “claim” land so there isn’t any confusion on who’s stuff is who’s. This is completely trust based, but we do have ways to make sure your claim stays safe (:\n\n` +
                    `Before joining the server I would recommend going through the rules one more time so you can be absolutely sure you won’t accidentally break any of them! \n\n` +
                    `- if you have any questions ask in the chat or <#${acceptMessageStuff.communitySupport}> 😄`;
                member.send(informMessage);
                // interaction.guild.channels.cache
                //     .get(acceptMessageStuff.sendChannel)
                //     .send(informMessage);
            } else {
                await interaction.editReply(
                    `Can Not accept ${member}${
                        username ? `(${username})` : ""
                    } as they have not read rules, or are not New`
                );
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
        // console.log(member.roles.cache);
    },
};
