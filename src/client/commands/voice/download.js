const playDetect = require("../../plugins/music/playDetect")
module.exports = {
    name: 'download',
    shorten: ['yt2mp3', 'dd'],
    restrictions: ['GUILD_TEXT', 'DM'],

    async execute(client, message, args, language) {
        const text = client._[language].voice.download
        if (args.length == 0) return message.channel.send(client.$e(text.rp_errorFormat));
        const respond = await playDetect(client, message, text)
        respond.res.video.forEach(async (video) => {
            message.channel.send(client.$e(client._(text.rp_downloading, {
                file: video.title,
                url: video.url
            })))
            message.channel.sendTyping();
            switch (video.type) {
                case "youtube":
                    youtubeSend(message, video).catch(()=>message.channel.send(client.$e(text.rp_errorTimeout)))
                    return;
                case "spotify":
                    spotifySend(message, video).catch(()=>message.channel.send(client.$e(text.rp_errorTimeout)))
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
    try {
        const file = await stream2buffer(info.stream)
        message.channel.send({
            files: [{
                attachment: file,
                name: `${ info.title }.mp3`,
            }],
        });
    } catch (err) {
        throw err;
    }
    return true;
}

async function spotifySend(message, info) {
    const stream = await info.stream
    stream.on('info', async (_, format) => {
        try {
            const file = await stream2buffer(stream)
            message.channel.send({
                files: [{
                    attachment: file,
                    name: `${info.title}.flac`,
                }],
            });
        } catch (err) {
            throw err;
        }
        return true
    })
}

function stream2buffer(stream) {
    return new Promise((resolve, reject) => {
        const _buf = [];
        stream.on("data", (chunk) => {
            setTimeout(() => {
                reject('timeout')
            }, 8000)
            _buf.push(chunk)
        });
        stream.on("end", () => resolve(Buffer.concat(_buf)));
        stream.on("error", (err) => reject(err));
    });
}