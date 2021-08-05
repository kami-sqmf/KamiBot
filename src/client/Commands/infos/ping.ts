import { Message } from 'discord.js'
import { client } from '../../Clinet'
import { ExecutePrototype } from '../../interface/Commands'
import emoji from '../../Config/emoji'

const name = 'ping'
const aliases = ['pg']
const restrictions = ['GUILD_TEXT', 'DM']
const execute: ExecutePrototype = async function (client: client, message: Message, args: string[], language: string): Promise<any> {
    const text = client.Translate.get(language).infos
    const msgBeforeReWrite = await message.channel.send(client.$e(client.$t(text.ping, { emoji1: emoji.general.hourglass, ping: client.ws.ping, emoji2: emoji.general.Rewrite, rewrite: 'Testing!' })))
    msgBeforeReWrite.edit(client.$e(client.$t(text.ping, { emoji1: emoji.general.hourglass, ping: client.ws.ping, emoji2: emoji.general.Rewrite, rewrite: msgBeforeReWrite.createdTimestamp - message.createdTimestamp })))
    return
}
export { name, aliases, restrictions, execute }
