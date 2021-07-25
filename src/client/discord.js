// Modules
const fs = require('fs');
const {
  Client,
  Intents,
  Collection
} = require('discord.js')

// Variable
const intents = {
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
}
const client = new Client(intents);

// Global Variable ( client )
client._ = new Object() // Translate, Embed, Process ......
client._ = require('./plugins/langProcess')
client._.langs = new Array()
client.$e = require('./plugins/format/embed')
client.temp = new Object()
client.commands = new Collection();
client.config = require('./config/config');

// Initialize Events
const events = fs.readdirSync('./src/client/events').filter(file => file.endsWith('.js'));
for (const file of events) {
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client))
};

// Initialize Commands
fs.readdirSync('./src/client/commands').forEach(dirs => {
  const commands = fs.readdirSync(`./src/client/commands/${dirs}`).filter(files => files.endsWith('.js'));
  for (const file of commands) {
    const command = require(`./commands/${dirs}/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
  };
});

// Initialize Translate
const translates = fs.readdirSync('./translate').filter(file => file.endsWith('.js'));
for (const file of translates) {
  client._[file.split(".")[0]] = require(`../../translate/${file}`);
  client._.langs.push(file.split(".")[0])
};

// Exports
client.login(client.config.secret.discordToken);
module.exports = client