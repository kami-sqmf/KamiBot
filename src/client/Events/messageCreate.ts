import { client } from '../Clinet'
import { Message } from 'discord.js'
import { ExecutePrototype } from '../interface/Events'
import { Command } from '../interface/Commands'
import emoji from '../Config/emoji'

const name = 'messageCreate'
const execute: ExecutePrototype = async function (client: client, message: Message) {
    if (message.author.bot) return
    let prefix: string = './'
    let language = 'en'
    const guildInfo = client.temp.guilds?.get(message.guild.id)
    if (guildInfo) {
        if (guildInfo.prefix) prefix = guildInfo.prefix
        if (guildInfo.language) language = guildInfo.language
    }
    if (!message.content.startsWith(prefix) && !message.content.startsWith('./')) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd: Command = client.Commands.get(command) || client.Commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command))
    if (!cmd) return
    if (!cmd.restrictions.includes(message.channel.type)) {
        // message.channel.send(client.translate(client.translate.events.messageCreate.error1, {
        //     restrictions: JSON.stringify(cmd.restrictions).replace(/,/g, ' ').replace(`[`, '').replace(`]`, '').replace(/"/g, '**')
        // }))
        return
    }
    cmd.execute(client, message, args, language).catch((err) => {
        console.error(err.toString())
        message.channel.send({
            content: client.$t(client.Translate.get(language).general.error, { emoji: emoji.general.cross }),
            files: [
                {
                    name: 'Error.txt',
                    attachment: Buffer.from(err.toString(), 'utf8'),
                },
            ],
        })
    })
}

export { name, execute }
