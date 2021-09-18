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
          `**Balance's ${user.user.username}**\n\nPocket: ${bal}\nBank: ${bank}`
        );
      message.channel.send({embeds: [moneyEmbed]});
    } else {
      return message.channel.send("**Account not found!**");
    }
  }
};
