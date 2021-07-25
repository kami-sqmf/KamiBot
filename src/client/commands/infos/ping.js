module.exports = {
    name: 'ping',
    shorten: ['pg'],
    restrictions: ['GUILD_TEXT', 'DM'],

    async execute(client, message, args, language) {
        return message.channel.send(client.$e(client._(client._[language].infos.ping, { ping: client.ws.ping })))
    }
};