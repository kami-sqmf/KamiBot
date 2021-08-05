import { Message, MessageActionRow, MessageButton, MessageComponent, MessageEmbed, InteractionCollector } from 'discord.js'
import { client } from '../../Clinet'
import emoji from '../../Config/emoji'
import { ExecutePrototype } from '../../interface/Commands'

const name = 'calculate'
const aliases = ['calc', 'count', 'eval']
const restrictions = ['GUILD_TEXT', 'DM']
const execute: ExecutePrototype = async function (client: client, message: Message, args: string[], language: string): Promise<any> {
    const text = client.Translate.get(language).utils.calculate
    if (args.length > 0)
        return message.channel.send(
            client.$e(
                client.$t(text.rp_calcResult, {
                    emoji: emoji.general.check,
                    ans: evalForRaw(args[0], text),
                })
            )
        )
    const interfaceUI = makeInterface([
        ['C', '(', ')', '÷'],
        ['7', '8', '9', '×'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['%', '0', '.', '='],
    ])
    const form = await message.channel.send({
        embeds: [makeCalcResult('0', text)],
        components: interfaceUI,
    })
    const collector = new InteractionCollector(client, {
        idle: 30000,
        dispose: true,
        filter: (btn: any) => btn.customId.startsWith(`KamiCalc.`),
        channel: message.channel,
        interactionType: 'MESSAGE_COMPONENT',
    })
    let history: Array<string> = new Array()
    collector.on('collect', (message: any) => {
        const originalValue = message.message.embeds[0].description.replace(/`/g, '')
        const selected = message.customId.slice(9)
        let respond: string = ''
        if (selected == 'C') {
            respond = '0'
        } else if (selected == '=') {
            respond = originalValue.replace(/×/g, '*')
            respond = respond.replace(/÷/g, '/')
            respond = evalForRaw(respond, text)
            history.push(`${originalValue}=${respond}`)
            return message.update({
                embeds: [makeCalcResult(respond, text, originalValue)],
            })
        } else {
            if (selected == '+' || selected == '-' || selected == '×' || selected == '÷') message.message.embeds[0].title = ''
            if (message.message.embeds[0].title || originalValue == 0) respond = selected
            else respond = originalValue + selected
        }
        message.update({
            embeds: [makeCalcResult(respond, text)],
        })
    })
    collector.on('end', () => {
        const disabledInterface = makeInterface(
            [
                ['C', '(', ')', '÷'],
                ['7', '8', '9', '×'],
                ['4', '5', '6', '-'],
                ['1', '2', '3', '+'],
                ['%', '0', '.', '='],
            ],
            true
        )
        form.edit({
            embeds: [makeExpired(history, text)],
            components: disabledInterface,
        })
    })
    return
}
export { name, aliases, restrictions, execute }

function makeInterface(raw: Array<Array<string>>, expired?: boolean): Array<MessageActionRow> {
    const Wrapper: Array<MessageActionRow> = []
    raw.forEach((rowContainer) => {
        const container: MessageActionRow = new MessageActionRow()
        rowContainer.forEach((node) => {
            const button: MessageButton = new MessageButton().setCustomId(`KamiCalc.${node}`).setLabel(node)
            if (expired) button.setDisabled(true)
            if (node == 'C') button.setStyle('DANGER')
            else if (node == '(' || node == ')' || node == '%' || node == '÷' || node == '×' || node == '-' || node == '+' || node == '.') button.setStyle('SUCCESS')
            else if (node == '=') button.setStyle('PRIMARY')
            else button.setStyle('SECONDARY')
            container.addComponents(button)
        })
        Wrapper.push(container)
    })
    return Wrapper
}

function makeCalcResult(content: string, text: any, title?: string) {
    const embed: MessageEmbed = new MessageEmbed()
        .setAuthor(text.activateAuthor)
        .setDescription('```' + content + '```')
        .setColor('#2A9D8F')
    if (title) embed.setTitle(title)
    return embed
}

function makeExpired(history: Array<string>, text: any) {
    const embed = new MessageEmbed().setAuthor(text.expiredAuthor).setColor('#236b62')
    history.forEach((history) => {
        const results = history.split('=')
        embed.addField(results[0], results[1])
        embed.setDescription(text.calcHistory)
    })
    return embed
}

function evalForRaw(raw: string, text: any) {
    try {
        return eval(raw)
    } catch (error) {
        return text.rp_calcError
    }
}
