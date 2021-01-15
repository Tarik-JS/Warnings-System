const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = 'PREFIX';

const db = require("qiuck.db");

client.on('ready', () => {
  console.log(`im ${client.user.tag}, ready ...`)
})

//plsese install quick.db before use this // cobyrights layercoding


client.on('message', msg => {
  if (!msg.channel.guild) return;
  if (msg.content.startsWith(prefix + "clearwarns")) {
    let user = msg.mentions.users.first();
    let warnings = db.get(`warns_${user.id}`);
    if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply(`**You dont have permissions**`)
    if (!user) return msg.reply("**Please specific someone.**")
    if (user.bot) return msg.reply("**Bots dont have warnings**")
    if (warnings === null) return msg.reply(`**${user.username}, dont have warnings to clear**`)
    if (warnings !== null) {
      db.delete(`warns_${user.id}`)
      msg.channel.send(`**${user.username},** Warns has been deleted.`)
    }
  }
})
client.on('message', msg => {
  if (!msg.channel.guild) return;
  if (msg.content.startsWith(prefix + "warnings")) {
    let userm = msg.mentions.users.first() || msg.author;
    let warnings = db.get(`warns_${userm.id}`)
    if (userm.bot) return msg.reply("**Bots dont have warnings**")
    if (warnings === null) warnings = '0';
    if (warnings !== null) {
      msg.channel.send(`**${userm.username},** has **${warnings}** warnings.`)
    }
  }
})

client.on('message', msg => {
  if (!msg.channel.guild) return;
  if (msg.content.startsWith(`${prefix}warn`)) {
    if (msg.content.startsWith(`${prefix}warnings`)) return;
    let user = msg.mentions.users.first();
    let member = msg.author;
    if (!user) return msg.reply("**Please specific someone.**")
    let warnings = db.get(`warns_${user.id}`);
    if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply(`**You dont have permissions**`)
    if (user.bot) return msg.reply("**You cant warn bots.**")
    if (user === member) return msg.reply("**You cant warn yourself.**")
    if (warnings === 3) return msg.channel.send(`**${user.username},** has already 3 warnings`)
    if (warnings === null) {
      db.set(`warns_${user.id}`, 1)
    }
    if (warnings !== null) {
      db.add(`warns_${user.id}`, 1)
    }
    msg.channel.send(`**${user.username},** has been warned ✅`)
  }
})

//dont forget to vist us : https://discord.gg/TYQVhYneGa

client.login('TOKEN')
