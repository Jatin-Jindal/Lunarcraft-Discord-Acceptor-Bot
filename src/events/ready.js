// TODO: Add a permission file with the following format:
// {
//     "commandName": { "permission": "permissionName" }
// }
// Access it with command.name and push to fullPerms

const { guildId } = require("../../config.json");
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        // Set the client user's presence
        client.user.setPresence({
            activities: [{ name: "with whitelisted players" }],
            status: "idle",
        });

        if (!client.application?.owner) client.application?.fetch();

        // const adminPermission = {
        //     id: ROLE_ADMIN,
        //     type: "ROLE",
        //     permission: true,
        // };
        // let fullPermissions = [];

        const commands = await client.guilds.cache.get(guildId)?.commands.fetch();
        commands.forEach((c) => console.log(`name: ${c.name}\nid: ${c.id}\n`));
        // console.log(commands);
        // commands.forEach((slashCommand) => {
        //     fullPermissions.push({
        //         id: slashCommand.id,
        //         permissions: [adminPermission],
        //     });
        // });

        // await client.guilds.cache.get(guildId)?.commands.permissions.set({ fullPermissions });
    },
};
