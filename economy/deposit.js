const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "deposit",
    aliases: ['invest'],
    run: async (bot, message, args) => {

        let user = message.author;

        let member = db.fetch(`money_${user.id}`)

        if (args[0] == 'all') {
            let money = await db.fetch(`money_${user.id}`)

            let embedbank = new MessageEmbed()
                .setColor('GREEN')
                .setDescription("❌ Quá nghèo, bạn không có đủ coin")

            if (!money) return message.channel.send({embeds: [embedbank]})

            db.subtract(`money_${user.id}`, money)
            db.add(`bank_${user.id}`, money)
            let sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn vừa đặt cọc hết sạch tiền túi vô ngân hàng!`);
            message.channel.send({embeds: [sembed]})

        } else {

            let embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Hãy điền một con số`);

            if (!args[0]) {
                return message.channel.send({embed: [embed2]})
                    .catch(err => message.channel.send(err.message))
            }
            let embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Hãy điền chữ số hợp lệ`)

            if(isNaN(args[0])) {
                return message.channel.send({embeds: [embed6]})
            
            }
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn không thể gửi tiền âm`);

            if (message.content.includes('-')) {
                return message.channel.send({embeds: [embed3]})
            }
            let embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn không có đủ tiền`);

            if (member < args[0]) {
                return message.channel.send({embeds: [embed4]})
            }

            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn vừa đặt cọc ${args[0]} coins vô ngân hàng`);

            message.channel.send({embeds: [embed5]})
            db.subtract(`money_${user.id}`, args[0])
            db.add(`bank_${user.id}`, args[0])

        }
    }
}