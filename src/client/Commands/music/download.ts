import emoji from '../../Config/emoji'
import { Message } from 'discord.js'
import { client } from '../../Clinet'
import { ExecutePrototype } from '../../interface/Commands'
import { musicClient, MusicRespondVideo } from '../../../plugins/music/music'

const name = 'download'
const aliases = ['dd', 'yt2mp3']
const restrictions = ['GUILD_TEXT', 'DM']
const NameAndAliases = aliases
NameAndAliases.push(name)
const execute: ExecutePrototype = async function (client: client, message: Message, args: string[], language: string): Promise<any> {
    const text = client.Translate.get(language).voice.download
    if (args.length == 0) return message.channel.send(client.$e(client.$t(text.rp_errorFormat, { emoji: emoji.general.cross })))
    const respond = new musicClient()
    respond.initSettings(NameAndAliases)
    const gotVids = await respond.getMusicStream(client, message, text)
    if (!gotVids.success)
        message.channel.send({
            content: client.$t(text.rp_errorProcess, { emoji: emoji.general.cross }),
            files: [
                {
                    name: 'Error.txt',
                    attachment: Buffer.from(gotVids.error.toString(), 'utf8'),
                },
            ],
        })
    gotVids.res.video.forEach(async (video) => {
        message.channel.send(
            client.$e(
                client.$t(text.rp_downloading, {
                    emoji: emoji.general.loading,
                    file: video.title,
                    url: video.url,
                })
            )
        )
        try {
            message.channel.sendTyping()
            const final = await promiseTimeout(sendMusicAttach(message, video), 8000)
        } catch (error) {
            if (error == 'Timeout') return message.channel.send(client.$e(client.$t(text.rp_errorTimeout, { emoji: emoji.general.cross })))
            message.channel.send({
                content: client.$t(text.rp_errorProcess, { emoji: emoji.general.cross }),
                files: [
                    {
                        name: 'Error.txt',
                        attachment: Buffer.from(error.toString(), 'utf8'),
                    },
                ],
            })
        }
    })
}
export { name, aliases, restrictions, execute }

function sendMusicAttach(message: Message, video: MusicRespondVideo) {
    return new Promise(async (resolve, reject) => {
        try {
            switch (video.type) {
                case 'YouTube':
                    resolve(
                        await message.channel.send({
                            files: [
                                {
                                    attachment: video.stream,
                                    name: `${video.title}.mp3`,
                                },
                            ],
                        })
                    )
                case 'Spotify':
                    video.stream.on('info', resolve(sendSpotify(message, video.stream, video.title)))
                case 'URL':
                    resolve(
                        await message.channel.send({
                            files: [video.stream],
                        })
                    )
            }
        } catch (error) {
            reject(error)
        }
    })
}

async function promiseTimeout(promise: Promise<any>, delay: number): Promise<any> {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(function () {
            reject('Timeout')
        }, delay)
    })
    return await Promise.race([timeout, promise])
}

function sendSpotify(message: Message, stream: any, title: string) {
    message.channel.send({
        files: [
            {
                attachment: stream,
                name: `${title}.mp3`,
            },
        ],
    })
}
