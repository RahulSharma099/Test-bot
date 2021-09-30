import Discord, { Guild, MessageEmbed, MessageMentions } from 'discord.js';
//import ms from "ms";
import * as dotenv from 'dotenv';
const client = new Discord.Client();

dotenv.config();

const PREFIX: string = '!';

client.on('ready', () => {
  console.log(`The bot is online!`);
});

const version: string = '1.0.0';

client.on('message', (message) => {
  let args: any[] = message.content.substring(PREFIX.length).split(' ');

  switch (args[0]) {
    case 'ping':
      message.channel.send('Pong!');
      break;
    case 'github':
      if (!args[1]) {
        return message.reply('Error Please define a second Argument');
      }
      message.channel.send(`https://github.com/${args[1]}`);
      break;
    case 'info':
      if (!args[1]) {
        message.channel.send('Please Provide the required argument');
      } else if (args[1] === 'version' || 'Version') {
        message.channel.send('Version is 1.0.0');
      } else {
        message.channel.send('Invalid Args');
      }
      break;
    case 'clear':
      if (!args[1]) {
        return message.reply('Error Please define a second Argument');
      }
      if (message.channel.type === 'text') {
        message.channel.bulkDelete(args[1]);
      }
      break;
    case 'delChannel':
      message.channel.delete();
      break;
    case 'embed':
      const embed = new MessageEmbed()
        .setTitle('User Information')
        .addField('Player Name ', message.author.username, true)
        .addField('version is ', version, true)
        .addField('Current server', message.guild?.name, true)
        .setColor('#F1C40f')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('Made with 💕 by Rahul Sharma and Riju');
      message.channel.send({ embed });
      break;
    case 'mute':
      // let mentioned: Discord.User = message.mentions.users.first() || args[1];
      // let person = message.guild?.members.fetch(mentioned);
      // let mainrole = message.guild?.roles.cache.find(
      //   (role) => role.name === "Newbie"
      // );
      // let muterole = message.guild?.roles.cache.find(
      //   (role) => role.name === "Mute"
      // );

      // if (!muterole) return message.reply("Couldn't find mute role");
      // let time = args[2];
      // if (!time) {
      //   return message.reply(" you have to provide time ⌚ as 3rd argument");
      // }
      // if (!person) {
      //   return message.reply("Please mention the person you want to mute");
      // } else {
      //   person.removerole()
      // }
      let target = message.mentions.users.first();
      if (target) {
        let mainRole = message.guild?.roles.cache.find(
          (role) => role.name === 'Newbie'
        );
        let muteRole = message.guild?.roles.cache.find(
          (role) => role.name === 'Mute'
        );
        let memberTarget = message.guild?.members.cache.get(target.id);
        memberTarget?.roles.remove(mainRole?.id!);
      } else {
        message.reply("Can't find that user 👾");
      }

      break;
  }
});
client.login(process.env.TOKEN);
