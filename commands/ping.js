const { EmbedBuilder } = require('discord.js')
const db = require("../mongoDB");
module.exports = {
  name: "ping",
  description: "確認機器人的延遲與處理速度",
    permissions: "0x0000000000000800",
    ENOStatus: true,
  options: [],
  run: async (client, interaction) => {
    let lang = await db?.musicbot?.findOne({ guildID: interaction.guild.id })
    lang = lang?.language || client.language
    lang = require(`../languages/${lang}.js`);

    try {

      const start = Date.now();
      interaction.reply("0").then(msg => {
        const end = Date.now();
        const embed = new EmbedBuilder()
          .setColor(client.config.embedColor)
          .setTitle(client.user.username + " - Pong!")
          .setThumbnail(client.user.displayAvatarURL())
          .addFields([
            { name: lang.msg49, value: `\`${end - start}ms\` 🛰️` },
            { name: lang.msg50, value: `\`${Date.now() - start}ms\` 🛰️` },
            { name: lang.msg51, value: `\`${Math.round(client.ws.ping)}ms\` 🛰️` }
          ])
          .setTimestamp()
          .setFooter({ text: lang.EDFooter })
        return interaction.editReply({ embeds: [embed] }).catch(e => { });
      }).catch(err => { })

    } catch (e) {
      const errorNotifer = require("../functions.js")
     errorNotifer(client, interaction, e, lang)
      }
  },
};