import emoji from '../../Config/emoji'
import { Message } from 'discord.js'
import { client } from '../../Clinet'
import { ExecutePrototype } from '../../interface/Commands'
import ttsToBuffer from '../../../plugins/textToSpeech/ttsToBuffer'

const name = 'tts'
const aliases = ['voice']
const restrictions = ['GUILD_TEXT']
const execute: ExecutePrototype = async function (client: client, message: Message, args: string[], language: string): Promise<any> {
    const text = client.Translate.get(language).voice.tts
    if (args.length == 0)
        return message.channel.send(
            client.$e(
                client.$t(text.rp_errorFormat, {
                    emoji: emoji.general.uSuck,
                })
            )
        )
    const lang = args[0]
    if (!/[a-z]-[a-z]/g.test(lang))
        return message.channel.send(
            client.$e(
                client.$t(text.rp_errorLangCode, {
                    emoji: emoji.general.uSuck,
                })
            )
        )
    message.content = message.content.toLowerCase()
    let content: string = ''
    if (message.content.includes('voice')) {
        content = message.content.slice(message.content.indexOf('voice') + 7 + lang.length)
    } else if (message.content.includes('tts')) {
        content = message.content.slice(message.content.indexOf('tts') + 5 + lang.length)
    }
    try {
        const respond = await ttsToBuffer(content, lang)
        const ttsBuffer = (respond as Uint8Array).buffer
        if (!message.member.voice.channel) {
            message.channel.send({
                content: `**${content}**`,
                files: [
                    {
                        attachment: await Buffer.from(ttsBuffer),
                        name: `${content.split('\n')[0]}-KamibotTTS.mp3`,
                    },
                ],
            })
        } else {
        }
    } catch (error) {
        if (error == 'timeout') {
            return message.channel.send(client.$e(client.$t(text.rp_errorTimeout, { emoji: emoji.general.cross })))
        } else console.log(error)
        return message.channel.send(client.$e(client.$t(text.rp_errorProcess, { emoji: emoji.general.cross })))
    }
    return
}
export { name, aliases, restrictions, execute }
