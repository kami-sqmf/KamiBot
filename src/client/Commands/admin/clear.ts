import { Message, NewsChannel, TextChannel, ThreadChannel } from 'discord.js'
import { client } from '../../Clinet'
import { ExecutePrototype } from '../../interface/Commands'
import emoji from '../../Config/emoji'

const name = 'clear'
const aliases = ['cls']
const restrictions = ['GUILD_TEXT']
const execute: ExecutePrototype = async function (client: client, message: Message, args: string[], language: string): Promise<any> {
    const text = client.Translate.get(language).admin.clear
    if (!args[0])
        return message.channel.send(
            client.$e(
                client.$t(text.rp_errorFormat, {
                    emoji: emoji.general.uSuck,
                })
            )
        )
    if (isNaN(Number(args[0])))
        return message.channel.send(
            client.$e(
                client.$t(text.rp_errorNumInput, {
                    emoji: emoji.general.uSuck,
                })
            )
        )
    let lines = parseInt(args[0]) + 1
    while (lines > 0) {
        if (lines >= 100) {
            ;(message.channel as TextChannel | NewsChannel | ThreadChannel).bulkDelete(99).catch((e) => {
                console.error(e)
                message.channel.send(
                    client.$e(
                        client.$t(text.rp_errorWhileClearing, {
                            emoji: emoji.general.cross,
                        })
                    )
                )
            })
            lines -= 99
        } else {
            ;(message.channel as TextChannel | NewsChannel | ThreadChannel)
                .bulkDelete(lines)
                .then((e) => {
                    message.channel
                        .send(
                            client.$e(
                                client.$t(text.rp_successClearing, {
                                    emoji: emoji.general.check,
                                    lines: args[0],
                                })
                            )
                        )
                        .then((message) => setTimeout(() => message.delete(), 5000))
                })
                .catch((e) => {
                    console.error(e)
                })
            lines = 0
        }
    }
}
export { name, aliases, restrictions, execute }
