const { ApplicationCommandOptionType } = require('discord.js')
const db = require("../mongoDB");
module.exports = {
    name: "help",
    description: "查詢指令的用法",
    permissions: "0x0000000000000800",
    ENOStatus: true,

  options: [
    {
      name: "info",
      description: "你需要查詢的指令.",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  showHelp: false,
  run: async (client, interaction) => {
    let lang = await db?.musicbot?.findOne({ guildID: interaction.guild.id })
    lang = lang?.language || client.language
    lang = require(`../languages/${lang}.js`);
    try {
      const { EmbedBuilder } = require('discord.js');
      const info = interaction.options.getString('info');
      if (info) {
        const cmd_filter = client.commands.filter(x => x.name === info);
        if (!cmd_filter.length > 0) return interaction.reply({ content: lang.msg127, ephemeral: true }).catch(e => { })

        const cmd = cmd_filter[0]
        const embed = new EmbedBuilder()
          .setTitle(`指令${cmd.name}的資料`)
          .setDescription(`> **描述: \`${cmd.description}\`**\n> **選項:**\n${cmd?.options?.map(x => `> **\`${x.name}\` - \`${x.description}\`**`).join("\n")}`)
          .setColor(client.config.embedColor)
          .setTimestamp()
        return interaction.reply({ embeds: [embed] }).catch(e => { })

      } else {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
          .setColor(client.config.embedColor)
          .setTitle("/help info <command>")
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(lang.msg32)
          .addFields([
            { name: `${lang.msg33}`, value: commands.map(x => `\`/${x.name}\``).join(' | ') }
          ])
          .setTimestamp()
          .setFooter({ text: lang.EDFooter })
        interaction.reply({ embeds: [embed] }).catch(e => { })
      }

    } catch (e) {
      const errorNotifer = require("../functions.js")
     errorNotifer(client, interaction, e, lang)
      }
  },
};