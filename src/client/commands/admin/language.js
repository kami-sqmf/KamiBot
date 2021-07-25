const dbLang = require('../../database/Guilds/language')
module.exports = {
    name: 'language',
    shorten: ['lang'],
    restrictions: ['GUILD_TEXT'],

    async execute(client, message, args, language) {
        const text = client._[language].admin.language
        const guildId = message.guild.id
        if(args.length == 0){
            const rpLang = `${client._[language].lang.language} ${language}`
            return message.channel.send(client.$e(client._(text.rp_sayLang, { lang: rpLang })))
        }else if(args.length == 1 && args[0] == 'default'){
            const res = await dbLang.delete(client, guildId)
            if(res.error){
                return message.channel.send(client.$e(text.rp_errorDB))
            }
            message.channel.send(client.$e(text.rp_defaultLang1))
            return message.channel.send(client.$e(text.rp_defaultLang2))
        }else if(args.length == 2 && args[0] == 'set'){
            if(!client._.langs.includes(args[1])){
                message.channel.send(client.$e(text.rp_errorLangCode))
                return message.channel.send(client.$e(makeSupportedLangEmbed(client, text)))
            }
            const res = await dbLang.update(client, guildId, args[1])
            if(res.error){
                return message.channel.send(client.$e(text.rp_errorDB))
            }
            const rpLang = `${client._[args[1]].lang.language} ${args[1]}`
            return message.channel.send(client.$e(client._(text.rp_updatedLang, { lang: rpLang })))
        }
        message.channel.send(client.$e(makeSupportedLangEmbed(client, text)))
        return message.channel.send(client.$e(text.rp_errorFormat))
    },
};

function makeSupportedLangEmbed(client, text){
    const format = {
        "title": text.embed_supportedLang,
        "color": 6939554,
        "fields": [],
    }
    client._.langs.forEach( lang => {
        format.fields.push({
            "name": `${client._[lang].lang.language}`,
            "value": `${lang}`
        })
    });
    return format
}