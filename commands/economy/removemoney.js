const { MessageEmbed }= require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "removemoney",
    aliases: ['deletemoney'],
    run: async (bot, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR", "MANAGE_GUILD")) return message.channel.send("❌ You don't have Permissions -[MANAGE_GUILD]-");
        if (!args[0]) return message.channel.send("**Please choose a username**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Please choose a username**")

        if (!args[1]) return message.channel.send("**Please choose a number**")
        if (isNaN(args[1])) return message.channel.send("**Please choose a number**");
        let bal = await db.fetch(`money_${user.id}`)

        if (args[0] > bal) return message.channel.send("**You do not to delete so much money!**")
        db.subtract(`money_${user.id}`, args[1])
        let bal2 = await db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Completed, remove ${args[1]} coins\n\nBalance: ${bal2}`);
        message.channel.send({embeds: [moneyEmbed]})

    }
}