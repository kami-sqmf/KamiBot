const playDetect = require("../../plugins/music/playDetect")
module.exports = {
    name: 'download',
    shorten: ['yt2mp3', 'dd'],
    restrictions: ['GUILD_TEXT', 'DM'],

    async execute(client, message, args, language) {
        const text = client._[language].voice.download
        if (args.length == 0) return message.channel.send(client.$e(text.rp_errorFormat));
        const respond = await playDetect(client, message, text)
        respond.res.video.forEach((video) => {
            message.channel.send(client.$e(client._(text.rp_downloading, {
                file: video.title
            })))
            message.channel.sendTyping();
            switch (video.type) {
                case "youtube":
                    youtubeSend(message, video)
                    return;
                case "spotify":
                    spotifySend(message, video)
                    return;
                case "url":
                    message.channel.send({
                        files: [video.stream],
                    });
                    return;
            }
        })
    },
};

async function youtubeSend(message, info) {
    const file = await stream2buffer(info.stream)
    message.channel.send({
        files: [{
            attachment: file,
            name: `${ info.title }.mp3`,
        }],
    });
    return;
}

async function spotifySend(message, info) {
    const stream = await info.stream
    stream.on('info', async(_, format)=>{
        const file = await stream2buffer(stream)
        message.channel.send({
            files: [{
                attachment: file,
                name: `${info.title}.flac`,
            }],
        });
        return;
    })
    return;
}

function stream2buffer(stream) {
    return new Promise((resolve, reject) => {
        const _buf = [];
        stream.on("data", (chunk) => _buf.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(_buf)));
        stream.on("error", (err) => reject(err));
    });
} 