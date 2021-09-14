const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "addmoney",
    aliases: ['add'],
    run: async (bot, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("❌ Bạn đủ tuổi gì dùng lệnh này - [ADMINISTRATOR]");
        if (!args[0]) return message.channel.send("**Hãy chọn tên người dùng**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Vui lòng điền đối tượng!**")
        if (!args[1]) return message.channel.send("**Vui lòng điền số tiền!**")
        if (isNaN(args[1])) return message.channel.send(`**❌ Số tiền của bạn phải là chữ số!**`);
        if (args[0] > 1000) return message.channel.send("**Bạn quá tham lam!**")
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Đã tham nhũng ${args[1]} coins\n\nTổng tài khoản: ${bal}`);
        message.channel.send({embeds: [moneyEmbed]})

    }
}
