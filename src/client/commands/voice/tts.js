const ttsToBuffer = require("../../plugins/text-to-speech/ttsToBuffer")
module.exports = {
    name: 'voice',
    shorten: ['tts', ],
    restrictions: ['GUILD_TEXT'],

    async execute(client, message, args, language) {
        const text = client._[language].voice.tts
        if (args.length == 0) return message.channel.send(client.$e(text.rp_errorFormat));
        let content = new String()
        const lang = args[0]
        if(!/[a-z]-[a-z]/g.test(lang)) return message.channel.send(client.$e(text.rp_errorLangCode));
        message.content = message.content.toLowerCase()
        if (message.content.includes("voice")) {
            content = message.content.slice(message.content.indexOf('voice') + 7  + lang.length)
        } else if (message.content.includes("tts")) {
            content = message.content.slice(message.content.indexOf('tts') + 5 + lang.length)
        }
        try {
            const respond = await ttsToBuffer(content, lang)
            if (!message.member.voice.channel) {
                message.channel.send({
                    content: `**${content}**`,
                    files: [{
                        attachment: respond,
                        name: `${ content }.mp3`,
                    }],
                });
            }else{

            }
        } catch (error) {
            if(error == "timeout"){
                return message.channel.send(client.$e(text.rp_errorTimeout))
            }
            return message.channel.send(client.$e(text.rp_errorProcess))
        }
    },
};