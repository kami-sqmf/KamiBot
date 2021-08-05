import { Message, NewsChannel, TextChannel, ThreadChannel } from 'discord.js'
import { client } from '../../Clinet'
import { ExecutePrototype } from '../../interface/Commands'
import emoji from '../../Config/emoji'
import { update, restore } from '../../../databases/Guilds/prefix'

const name = 'prefix'
const aliases = ['pf']
const restrictions = ['GUILD_TEXT']
const execute: ExecutePrototype = async function (client: client, message: Message, args: string[], language: string): Promise<any> {
    const text = client.Translate.get(language).admin.prefix
    const guildId = message.guild.id
    const guildInfo = client.temp.guilds.get(guildId)
    if (args.length == 0) {
        let prefix: string = ''
        if (guildInfo && guildInfo.prefix) prefix = guildInfo.prefix
        else prefix = text.rp_defalut
        return message.channel.send(client.$e(client.$t(text.rp_sayPrefix, { prefix: prefix })))
    } else if (args.length == 1 && args[0] == 'default') {
        const res = await restore(client, guildId)
        if (res.error) {
            return message.channel.send(
                client.$e(
                    client.$t(text.rp_errorDB, {
                        emoji: emoji.general.cross,
                    })
                )
            )
        }
        return message.channel.send(
            client.$e(
                client.$t(text.rp_defaultPrefix, {
                    emoji: emoji.general.check,
                })
            )
        )
    } else if (args.length == 2 && args[0] == 'set') {
        const res = await update(client, guildId, args[1])
        if (res.error) {
            return message.channel.send(
                client.$e(
                    client.$t(text.rp_errorDB, {
                        emoji: emoji.general.cross,
                    })
                )
            )
        }
        return message.channel.send(
            client.$e(
                client.$t(text.rp_updatedPrefix, {
                    emoji: emoji.general.check,
                    prefix: args[1],
                })
            )
        )
    }
    return message.channel.send(
        client.$e(
            client.$t(text.rp_errorFormat, {
                emoji: emoji.general.uSuck,
            })
        )
    )
}
export { name, aliases, restrictions, execute }
