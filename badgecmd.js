const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("badge")
    .setDescription("Get dev badge"),
  async execute(interaction) {
    let user = interaction.user.tag;
    await interaction.reply("Badge!");
  },
};
