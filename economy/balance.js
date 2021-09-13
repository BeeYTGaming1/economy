const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "bank",
  aliases: ['balance'],
  run: async (bot, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    let bal = db.fetch(`money_${user.id}`);

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${user.id}`);

    if (bank === null) bank = 0;

    if (user) {
      let moneyEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `**Tài khoảng của ${user.user.username}**\n\nTiền túi: ${bal}\nTiền ngân hàng: ${bank}`
        );
      message.channel.send({embeds: [moneyEmbed]});
    } else {
      return message.channel.send("**Không tìm thấy tài khoản!**");
    }
  }
};
