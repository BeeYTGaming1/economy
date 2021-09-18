const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "rob",
  aliases: ['thieves'],
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send("**Please choose a username**")  
    let user2 = message.author

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());
    if (!user) return message.channel.send("**Please choose a username**")

    let embed2 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ You can't rob yourself`)

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
        .setDescription(`🛌 You stole a second, now it's time to rest!\n\nReturn in ${time.minutes}m ${time.seconds}s `);
      message.channel.send({embeds: [timeEmbed]})
    } else {

      let moneyEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`💲 You rich must save face!`);

      if (author2 > 1000) {
        return message.channel.send({embeds: [moneyEmbed]})

      }
      let moneyEmbed2 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`❌ ${user.user.username} don't have money in pocket`);

      let random = Math.floor((Math.random() * 100)) + 1;

      if (targetuser < random) {
        return message.channel.send({embeds: [moneyEmbed2]})
      } else {

        let embed = new MessageEmbed()
          .setDescription(`✅ Completed, you just robbed ${user.user.username} and receive ${random} coins`)
          .setColor("GREEN")
        message.channel.send({embeds: [embed]})

        db.subtract(`money_${user.id}`, random)
        db.add(`money_${user2.id}`, random)
        db.set(`rob_${user.id}`, Date.now())

      }
    };
  }
} 