import { EmbedField, EmbedFieldData, Message, MessageEmbed, MessageEmbedOptions, NewsChannel, TextChannel, ThreadChannel } from 'discord.js'
import { client } from '../../Clinet'
import { ExecutePrototype } from '../../interface/Commands'
import emoji from '../../Config/emoji'
import { update, restore } from '../../../databases/Guilds/language'

const name = 'language'
const aliases = ['lang']
const restrictions = ['GUILD_TEXT']
const execute: ExecutePrototype = async function (client: client, message: Message, args: string[], language: string): Promise<any> {
    const text = client.Translate.get(language).admin.language
    const guildId = message.guild.id
    const guildInfo = client.temp.guilds.get(guildId)
    if (args.length == 0) {
        return message.channel.send(
            client.$e(
                client.$t(text.rp_sayLang, {
                    lang: `${client.Translate.get(language).lang.language} ${language}`,
                })
            )
        )
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
        message.channel.send(
            client.$e(
                client.$t(text.rp_defaultLang1, {
                    emoji: emoji.general.check,
                })
            )
        )
        return message.channel.send(client.$e(text.rp_defaultLang2))
    } else if (args.length == 2 && args[0] == 'set') {
        let langs = [...client.Translate.keys()]
        if (!langs.includes(args[1])) {
            message.channel.send(
                client.$e(
                    client.$t(text.rp_errorLangCode, {
                        emoji: emoji.general.cross,
                    })
                )
            )
            return message.channel.send(client.$e('', makeSupportedLangEmbed(client, text, langs)))
        }
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
                client.$t(text.rp_updatedLang, {
                    emoji: emoji.general.check,
                    lang: `${client.Translate.get(args[1]).lang.language} ${args[1]}`,
                })
            )
        )
    }
    message.channel.send(client.$e('', makeSupportedLangEmbed(client, text, [...client.Translate.keys()])))
    return message.channel.send(
        client.$e(
            client.$t(text.rp_errorFormat, {
                emoji: emoji.general.uSuck,
            })
        )
    )
}
function makeSupportedLangEmbed(client: client, text: any, langs: Array<string>): MessageEmbedOptions {
    const format = {
        title: text.embed_supportedLang,
        color: 6939554,
        fields: [] as Array<EmbedFieldData>,
    }
    langs.forEach((lang) => {
        format.fields.push({
            name: `${client.Translate.get(lang).lang.language}`,
            value: `${lang}`,
        })
    })
    return format
}
export { name, aliases, restrictions, execute }
