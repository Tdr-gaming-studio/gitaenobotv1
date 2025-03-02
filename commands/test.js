const { ApplicationCommandOptionType } = require('discord.js')
const db = require("../mongoDB");
module.exports = {
  name: "test",
  description: "範例用指令",
	permissions: "0x0000000000000800",
	ENOStatus: true,
	ENOType: "test",
  options: [
	{
	  name: "txt",
	  description: "範例用選項--",
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
	  const msg_txt = interaction.options.getString('txt');
	  if (msg_txt) {
		const embed = new EmbedBuilder()
			.setTitle(`範例用指令-測試訊息`)
			.setDescription(msg_txt)
			.setColor(client.config.embedColor)
			.setTimestamp()
			.setFooter({ text: lang.msgfooter })
		return interaction.reply({ embeds: [embed] }).catch(e => { })

	  } else {
		const embed = new EmbedBuilder()
			.setColor(client.config.embedColor)
			.setTitle("範例用指令-測試訊息")
			.setDescription('空蕩蕩')
			.setTimestamp()
			.setFooter({ text: lang.msgfooter })
		interaction.reply({ embeds: [embed] }).catch(e => { })
	  }

	} catch (e) {
	  const errorNotifer = require("../functions.js")
	 errorNotifer(client, interaction, e, lang)
	  }
  },
};