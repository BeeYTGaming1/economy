const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "addmoney",
    aliases: ['add'],
    run: async (bot, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("❌ You don't have Premission - [ADMINISTRATOR]");
        if (!args[0]) return message.channel.send("**Please choose a username**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Please fill in the object!**")
        if (!args[1]) return message.channel.send("**Please enter the amount!**")
        if (isNaN(args[1])) return message.channel.send(`**❌ Your amount must be in digits!**`);
        if (args[0] > 10000) return message.channel.send("**You can only add less than 10000 coins**")
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ You are done taking more ${args[1]} coins\n\nBank: ${bal}`);
        message.channel.send({embeds: [moneyEmbed]})

    }
}
