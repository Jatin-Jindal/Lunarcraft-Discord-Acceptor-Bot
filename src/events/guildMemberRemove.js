module.exports = {
    name: "guildMemberRemove",
    async execute(member) {
        let user = member.displayName;
        if (user) {
            try {
                member.guild.channels.cache
                    ?.get("665965513968582658")
                    ?.send(`whitelist remove ${user}`);
            } catch (error) {
                console.log(
                    `Something went wrong while unwhitelisting username = ${username}\n` +
                        `Error: ${error}\n\n\n` +
                        "-".repeat(70) +
                        `\n`
                );

                member.guild.channels.cache
                    ?.get("789566159732604978")
                    ?.send(
                        `${member} Left, but couldnt whitelist for some reason (check console)\n<@437491079869104138> FIX THIS >:(`
                    );
            }
        }
    },
};
