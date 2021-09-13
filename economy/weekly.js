const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");

module.exports = {
    name: "weekly",
    aliases: ['week'],
    run: async (bot, message, args) => {

        let user = message.author;
        let timeout = 604800000;
        let amount = 5000;

        let weekly = await db.fetch(`weekly_${user.id}`);

        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Anh bạn nhận lương rồi, tính làm gì!\n\nHạn lương tiếp theo là vào tuần sau!`);
            message.channel.send({embeds: [timeEmbed]})
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn vừa nhận lương sau một tuần làm việc ${amount} coins`); 
            message.channel.send({embeds: [moneyEmbed]})
            db.add(`money_${user.id}`, amount)
            db.set(`weekly_${user.id}`, Date.now())


        }
    }
}