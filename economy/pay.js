const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "pay",
  aliases: ['payment'],
  run: async (bot, message, args) => {
try {
  let user2 = message.author
    if (!args[0]) return message.channel.send("**Hãy chọn đối tượng chuyển khoản!**");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!user) return message.channel.send("**Hãy chọn đối tượng chuyển khoản!**");

    let member = db.fetch(`money_${user2.id}`);

    let embed1 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Đề cập đến một người nào đó để đút lót`);

    if (!args[0]) {
      return message.channel.send({embed: [embed1]});
    }
    let embed2 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Bạn không thể đút lót chính mình`);

    if (user.user.id === message.author.id) {
      return message.channel.send({embeds: [embed2]});
    }

    let embed3 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Hãy đưa môt số liệu hợp lệ`);

    if (!args[1]) {
      return message.channel.send({embeds: [embed3]});
    }
    let embed4 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Hãy đưa môt số liệu hợp lệ`);

    if (isNaN(args[1])) {
      return message.channel.send({embeds: [embed4]});
    }
    let embed5 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Bạn lấy đâu ra nhiều tiền như thế!`);

    if (member < args[1]) {
      return message.channel.send({embeds: [embed5]});
    }

    let embed6 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`✅ Bạn vừa đút lót ${user.displayName} ${args[1]} coins`);

    message.channel.send({embeds: [embed6]});
    db.add(`money_${user.id}`, args[1]);
    db.subtract(`money_${user2.id}`, args[1]);
    } catch {
        
    }
  }
};
