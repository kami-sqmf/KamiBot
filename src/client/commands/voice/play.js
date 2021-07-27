const playDetect = require("../../plugins/music/playDetect")
module.exports = {
    name: 'plays',
    shorten: ['music'],
    restrictions: ['GUILD_TEXT'],

    async execute(client, message, args, language) {
        const text = client._[language].voice.play
        if(args.length == 0) return message.channel.send(client.$e(text.rp_errorFormat));
        playDetect(client, message, text)
    },
};