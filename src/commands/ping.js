const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Latency!"),
    async execute(interaction) {
        let latency = interaction.createdAt - Date.now();
        const delay = 250;
        await interaction.reply({
            content: `Calculating Latest Latency`,
            ephemeral: true,
        });
        for (let i = 0; i < 3; i++) {
            await wait(delay);
            msg = await interaction.fetchReply();
            await interaction.editReply({ content: `${msg.content}.`, ephemeral: true });
        }
        await wait(delay);
        await interaction.editReply({
            content: `${interaction.user.username}'s latecy: ${latency}ms`,
            ephemeral: true,
        });
    },
};
