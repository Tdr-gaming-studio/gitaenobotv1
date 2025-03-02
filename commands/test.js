const { ApplicationCommandOptionType } = require('discord.js')
const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: "test",  // 指令名稱
	description: "範例文件",  // 指令描述
	permissions: "0x0000000000000800",
	ENOStatus: true,  //是否開?此指令

	options: [  // 選項
		{
			name: "txt",  // 選項名稱
			description: "測試用文字.",  // 選項描述
			type: ApplicationCommandOptionType.String,  // 選項類型
			required: false  // 是否必填
		}
	],
	showHelp: false,  // 是否顯示在/help中

	// 指令運行區域
	run: async (client, interaction) => {
		//語言區塊(不用理會)[注意:目前僅支援繁體中文]
		let lang = await db?.musicbot?.findOne({ guildID: interaction.guild.id })
		lang = lang?.language || client.language
		lang = require(`../languages/${lang}.js`);

		//主要運行區域(包含錯誤處理)
		try {//錯誤處理()

			//指令邏輯
			const start = Date.now();
			msg_txt = interaction.options.getString('txt');
			interaction.reply("0").then(msg => {
				const end = Date.now();
				const embed = new EmbedBuilder()
					.setColor(client.config.embedColor)
					.setTitle(client.user.username + lang.msg201)
					.setThumbnail(client.user.displayAvatarURL())
					.addFields([
						{ name: lang.msg202, value: msg_txt },
					])
					.setTimestamp()
					.setFooter({ text: lang.EDFooter })
				return interaction.editReply({ embeds: [embed] }).catch(e => { });
			}).catch(err => { })
		
		} catch (e) {
			const errorNotifer = require("../functions.js")
			errorNotifer(client, interaction, e, lang)
			console.log(e)
		}
	},
};