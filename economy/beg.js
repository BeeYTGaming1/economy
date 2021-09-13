const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");

module.exports = {
    name: "beg",
    aliases: ['get'],
    run: async (bot, message, args) => {
        let user = message.author;

        let timeout = 120000;
        let amount = 20;

        let beg = await db.fetch(`beg_${user.id}`);

        if (beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🛏 Bạn vừa làm ăn xin và rất mệt\n\Cần nghỉ ngơi trong ${time.minutes}phút ${time.seconds}giây `);
            message.channel.send({embeds: [timeEmbed]})
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn vừa xin tiền thành công và được ${amount} coins`);
            message.channel.send({embeds: [moneyEmbed]})
            db.add(`money_${user.id}`, amount)
            db.add(`begs_${user.id}`, 1)
            db.set(`beg_${user.id}`, Date.now())


        }
    }
};