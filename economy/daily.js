const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");

module.exports = {
    name: "daily",
    aliases: ['day'],
    run: async (bot, message, args) => {
        let user = message.author;

        let timeout = 86400000;
        let amount = 20;

        let daily = await db.fetch(`daily_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Ê nè người anh em, bạn vừa nhận lương rồi mà nhỉ!\n\nHãy quay lại vào ngày mai!`);
            message.channel.send({embeds: [timeEmbed]})
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn vừa lĩnh lương được ${amount} coins`);
            message.channel.send({embeds: [moneyEmbed]})
            db.add(`money_${user.id}`, amount)
            db.set(`daily_${user.id}`, Date.now())


        }
    }
}
