const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { PREFIX } = require('../../config');

module.exports = {
    name: "roulette",
    aliases: ['betting'],
    run: async (bot, message, args) => {
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
      
        let user = message.author;

        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let colour = args[0];
        let money = parseInt(args[1]);
        let moneydb = await db.fetch(`money_${user.id}`)

        let random = Math.floor((Math.random() * 10));

        let moneyhelp = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Chỉ định số tiền để đánh bạc | ${prefix}roulette <color> <amount>`);

        let moneymore = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Bạn đang đặt cược nhiều hơn những gì bạn có`);

        let colorbad = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Chỉ định một màu sác hợp lệ | Red [1.5x] (normal) Black [2x] (hard) Green [15x](rare)`);

        if (!colour) return message.channel.send({embeds: [colorbad]});
        colour = colour.toLowerCase()
        if (!money) return message.channel.send({embeds: [moneyhelp]});
        if (money > moneydb) return message.channel.send({embeds: [moneymore]});

        if (colour == "b" || colour.includes("black")) colour = 0;
        else if (colour == "r" || colour.includes("red")) colour = 1;
        else if (colour == "g" || colour.includes("green")) colour = 2;
        else return message.channel.send({embeds: [colorbad]});

        if (random == 1 && colour == 2) { // Green
            money *= 15
            db.add(`money_${user.id}`, money)
            let moneyEmbed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Bạn thắng và ăn cả ${money} coins\n\nHệ số nhân: 15x`);
            message.channel.send({embeds: [moneyEmbed1]})
        } else if (isOdd(random) && colour == 1) { // Red
            money = parseInt(money * 1.5)
            db.add(`money_${user.id}`, money)
            let moneyEmbed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🔴 Bạn thắng và ăn cả ${money} coins\n\nHệ số nhân: 1.5x`);
            message.channel.send({embeds: [moneyEmbed2]})
        } else if (!isOdd(random) && colour == 0) { // Black
            money = parseInt(money * 2)
            db.add(`money_${user.id}`, money)
            let moneyEmbed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`⬛ Bạn thắng và ăn cả ${money} coins\n\nHệ số nhân: 2x`);
            message.channel.send({embeds: [moneyEmbed3]})
        } else { // Wrong
            db.subtract(`money_${user.id}`, money)
            let moneyEmbed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Bạn thua vì quá đen ${money} coins\n\nHệ số nhân: 0x`);
            message.channel.send({embeds: [moneyEmbed4]})
        }
          db.add(`games_${user.id}`, 1)
    }
}