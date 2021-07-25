const dbPrefix = require('../../database/Guilds/prefix')
module.exports = {
    name: 'prefix',
    shorten: ['pf'],
    restrictions: ['GUILD_TEXT'],

    async execute(client, message, args, language) {
        const text = client._[language].admin.prefix
        const guildId = message.guild.id
        let prefix = new String()
        if(args.length == 0){
            if (client.temp.Guilds[guildId]) {
                if (client.temp.Guilds[guildId].prefix && client.temp.Guilds[guildId].prefix != prefix) {
                    prefix = client.temp.Guilds[guildId].prefix
                }else{
                    prefix = '*預設Prefix* ./'
                }
            }
            return message.channel.send(client.$e(client._(text.rp_sayPrefix, { prefix: prefix })))
        }else if(args.length == 1 && args[0] == 'default'){
            const res = await dbPrefix.delete(client, guildId)
            if(res.error){
                return message.channel.send(client.$e(text.rp_errorDB))
            }
            return message.channel.send(client.$e(text.rp_defaultPrefix))
        }else if(args.length == 2 && args[0] == 'set'){
            const res = await dbPrefix.update(client, guildId, args[1])
            if(res.error){
                return message.channel.send(client.$e(text.rp_errorDB))
            }
            return message.channel.send(client.$e(client._(text.rp_updatedPrefix, { prefix: args[1] })))
        }
        return message.channel.send(client.$e(text.rp_errorFormat))
    },
};