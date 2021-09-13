const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "withdraw",
    aliases: ['draw'],
    run: async (bot, message, args) => {
        let user = message.author;

        let member2 = db.fetch(`bank_${user.id}`)

        if (args.join(' ').toLocaleLowerCase() == 'all') {
            let money = await db.fetch(`bank_${user.id}`)
            let embed = new MessageEmbed()
              .setColor("GREEN")
              .setDescription(`❌**Bạn không còn tiền để rút**`)
            if (!money) return message.channel.send({embeds: [embed]})
            db.subtract(`bank_${user.id}`, money)
            db.add(`money_${user.id}`, money)
            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn vừa rút hết sạch tiền trong ngân hàng`); 
            message.channel.send({embeds: [embed5]})

        } else {

            let embed2 = new MessageEmbed() 
                .setColor("GREEN")
                .setDescription(`❌ Hãy đưa ra số tiền để rút`);

            if (!args[0]) {
                return message.channel.send({embeds: [embed2]})
            }
            let embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Số tiền của bạn phải là chữ số`)

            if(isNaN(args[0])) {
                return message.channel.send({embeds: [embed6]})
            }
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn không thể rút tiền âm!`);

            if (message.content.includes('-')) {
                return message.channel.send({embeds: [embed3]})
            }
            let embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn không có nhiều tiền trong ngân hàng!`);

            if (member2 < args[0]) {
                return message.channel.send({embeds: [embed4]})
            }

            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn vừa rút ${args[0]} coins từ ngân hàng của bạn`);

                message.channel.send({embeds: [embed5]})
            db.subtract(`bank_${user.id}`, args[0])
            db.add(`money_${user.id}`, args[0])
        }
    }
}