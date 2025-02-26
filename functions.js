function errorNotifer(client, interaction, e, lang) {
const { EmbedBuilder } = require("discord.js")
if(client.errorLog){

    if(client.shard){
        let embed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTimestamp()
        .addFields([
            { name: "指令", value: `${interaction?.commandName}` },
            { name: "錯誤", value: `${e.stack}` },
            { name: "用戶", value: `${interaction?.user?.tag} \`(${interaction?.user?.id})\``, inline: true },
            { name: "伺服器名稱", value: `${interaction?.guild?.name} \`(${interaction?.guild?.id})\` - \`${interaction?.guild?.memberCount} members\``, inline: true },
            { name: "時間", value: `<t:${Math.floor(Date.now()/1000)}:R>`, inline: true },
            { name: "使用指令的頻道", value: `${interaction?.channel?.name} \`(${interaction?.channel?.id})\``, inline: true },
            { name: "用戶所待的語音頻道", value: `${interaction?.member?.voice?.channel?.name} \`(${interaction?.member?.voice?.channel?.id})\``, inline: true },
        ])
     client.shard.broadcastEval(async (c, { channelId, embed}) => {
           let channel = c.channels.cache.get(channelId);
           channel?.send({ embeds: [embed] }).catch(e => { })
      }, { context: { channelId: client?.errorLog, embed: embed } })

    } else {
        let embed = new EmbedBuilder()
.setColor(client.config.embedColor)
.setTimestamp()
.addFields([
    { name: "指令", value: `${interaction?.commandName}` },
    { name: "錯誤", value: `${e.stack}` },
    { name: "用戶", value: `${interaction?.user?.tag} \`(${interaction?.user?.id})\``, inline: true },
    { name: "伺服器名稱", value: `${interaction?.guild?.name} \`(${interaction?.guild?.id})\``, inline: true },
    { name: "時間", value: `<t:${Math.floor(Date.now()/1000)}:R>`, inline: true },
    { name: "使用指令的頻道", value: `${interaction?.channel?.name} \`(${interaction?.channel?.id})\``, inline: true },
    { name: "用戶所待的語音頻道", value: `${interaction?.member?.voice?.channel?.name} \`(${interaction?.member?.voice?.channel?.id})\``, inline: true },
])
client.channels.cache.get(client?.errorLog)?.send({ embeds: [embed] }).catch(e => { })
    }

    } else {
    console.log(`
    Command: ${interaction?.commandName}
    Error: ${e}
    User: ${interaction?.user?.tag} (${interaction?.user?.id})
    Guild: ${interaction?.guild?.name} (${interaction?.guild?.id})
    Command Usage Channel: ${interaction?.channel?.name} (${interaction?.channel?.id})
    User Voice Channel: ${interaction?.member?.voice?.channel?.name} (${interaction?.member?.voice?.channel?.id})
    `)
    }
    return interaction.reply({ content: `${lang.error7}\n\`${e}\``, ephemeral: true }).catch(e => { })

}

module.exports = errorNotifer;