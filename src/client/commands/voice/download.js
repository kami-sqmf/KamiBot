const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const playDetect = require("../../plugins/voice/playDetect")
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

function youtubeSend(message, info) {
    const file = info.stream.pipe(fs.createWriteStream(`${message.author.id}.mp3`))
    file.on('finish', async () => {
        message.channel.send({
            files: [{
                attachment: `./${message.author.id}.mp3`,
                name: `${ info.title }.mp3`,
            }],
        });
        return file.destroy()
    });
    file.on('error', async () => {
        message.channel.send(client.$e(text.rp_errorProcess));
        return file.destroy()
    });
    return;
}

async function spotifySend(message, info) {
    const stream = await info.stream
    let filename = new String()
    stream.on('info', (_, format) => {
            filename = `${message.author.id}.${format.container}`
            stream.pipe(fs.createWriteStream(filename))
        })
        .on('end', () => {
            message.channel.send({
                files: [{
                    attachment: `./${filename}`,
                    name: `${ info.title }.webm`,
                }],
            });
        })
        .on('error', () => {
            message.channel.send(client.$e(text.rp_errorProcess));
            return stream.destroy()
        })
    return;
}
// function uploadFile(url, path, name) { 
//     const formData = new FormData();
//     formData.append('files[]', fs.readFileSync(path), name);
//     return axios.post(`${url}`, formData, {
//         headers: formData.getHeaders(),
//     })
// }

// function makeFileEmbed(title, url) {
//     return {
//         "title": title,
//         "color": 6939554,
//         "url": url,
//         "video": {
//             url: url
//         }
//     }
// }