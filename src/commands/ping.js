const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Latency!"),
    async execute(interaction) {
        const delay = 250;
        var msg = await interaction.reply({
            content: `Calculating Latest Latency`,
            ephemeral: true,
            fetchReply: true,
        });
        const latency = msg.createdTimestamp - interaction.createdTimestamp - delay;
        for (let i = 0; i < 3; i++) {
            await wait(delay);
            msg = await interaction.editReply({
                content: `${msg.content}.`,
                ephemeral: true,
                fetchReply: true,
            });
        }
        await wait(delay);
        await interaction.editReply({
            content:
                `Bot's Latency = ${latency}ms\n` +
                `Websocket Latency = ${interaction.client.ws.ping}ms`,
            ephemeral: true,
        });
    },
};
