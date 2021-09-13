const { MessageEmbed }= require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "removemoney",
    aliases: ['deletemoney'],
    run: async (bot, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR", "MANAGE_GUILD")) return message.channel.send("❌ Bạn không có quyền thu thuế");
        if (!args[0]) return message.channel.send("**Hãy chọn tên người dùng**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Hãy chọn một đối tượng**")

        if (!args[1]) return message.channel.send("**Hãy chọn một thông số**")
        if (isNaN(args[1])) return message.channel.send("**Hãy chọn một chữ số**");
        let bal = await db.fetch(`money_${user.id}`)

        if (args[0] > bal) return message.channel.send("**Không thể thu thuế nhiều như vậy!**")
        db.subtract(`money_${user.id}`, args[1])
        let bal2 = await db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Đã thu thuế ${args[1]} coins\n\nSố dư ngân hàng: ${bal2}`);
        message.channel.send({embeds: [moneyEmbed]})

    }
}