const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒"];
const db = require("quick.db");
const { MessageEmbed } = require('discord.js');  

module.exports = {
    name: "slots",
    aliases: ['gacha'],
    run: async (bot, message, args) => {

    let user = message.author;
    let moneydb = await db.fetch(`money_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`❌ Bạn không có đủ tiền để mua lượt quay!`);

    let moneyhelp = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`❌ Hãy nhập chữ số hợp lệ`); 

    if (!money) return message.channel.send({embeds: [moneyhelp]});
    if (money > moneydb) return message.channel.send({embeds: [moneymore]});

    let number = []
    for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2])  { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 3
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nBạn thật may mắn hãy nhận ${money} coins`)
            .setColor("GREEN")
        message.channel.send({embeds: [slotsEmbed1]})
        db.add(`money_${user.id}`, money)
    } else {
        let slotsEmbed = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor("GREEN")
        message.channel.send({embeds: [slotItems]})
        db.subtract(`money_${user.id}`, money)
    }

}
}