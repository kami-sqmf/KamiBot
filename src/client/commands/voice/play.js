const playDetect = require("../../plugins/voice/playDetect")
module.exports = {
    name: 'play',
    shorten: ['music'],
    restrictions: ['GUILD_TEXT'],

    async execute(client, message, args, language) {
        const text = client._[language].voice.play
        if(args.length == 0) return message.channel.send(client.$e(text.rp_errorFormat));
        playDetect(client, message, text)
    },
};