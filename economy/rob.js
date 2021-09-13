const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");

module.exports = {
  name: "rob",
  aliases: ['thieves'],
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send("**Hãy chọn đối tượng!**")  
    let user2 = message.author

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());
    if (!user) return message.channel.send("**Hãy dự tính mức trộm**")

    let embed2 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Bạn không có thể móc túi của chính mình`)

    if (user.user.id === message.author.id) {
      return message.channel.send({embeds: [embed2]})
    }

    let targetuser = await db.fetch(`money_${user.id}`)
    let author = await db.fetch(`rob_${user.id}`)
    let author2 = await db.fetch(`money_${user2.id}`)

    let timeout = 600000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      let timeEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`🛌 Bạn đã làm trộm cả một giây giờ phải nghỉ ngơi thôi!\n\nHãy đợi hồi sức trong vòng ${time.minutes}phút ${time.seconds}giây `);
      message.channel.send({embeds: [timeEmbed]})
    } else {

      let moneyEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`💲 Bạn giàu phải giữ thể diện chứ!`);

      if (author2 > 1000) {
        return message.channel.send({embeds: [moneyEmbed]})

      }
      let moneyEmbed2 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`❌ ${user.user.username} cũng thất nghiệp như bạn không có nổi một xu`);

      let random = Math.floor((Math.random() * 100)) + 1;

      if (targetuser < random) {
        return message.channel.send({embeds: [moneyEmbed2]})
      } else {

        let embed = new MessageEmbed()
          .setDescription(`✅ Bạn vừa móc túi ${user.user.username} và thu về ${random} coins`)
          .setColor("GREEN")
        message.channel.send({embeds: [embed]})

        db.subtract(`money_${user.id}`, random)
        db.add(`money_${user2.id}`, random)
        db.set(`rob_${user.id}`, Date.now())

      }
    };
  }
} 