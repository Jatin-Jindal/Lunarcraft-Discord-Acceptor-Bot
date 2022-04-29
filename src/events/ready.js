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
    },
};
