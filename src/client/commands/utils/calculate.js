const {
    MessageEmbed,
    MessageButton,
    MessageActionRow,
    InteractionCollector,
} = require("discord.js");
let text = new String()
module.exports = {
    name: 'calculate',
    shorten: ['calc', 'count', 'eval'],
    restrictions: ['GUILD_TEXT', 'DM'],

    async execute(client, message, args, language) {
        text = client._[language].utils.calculate
        if (args.length > 0) return message.channel.send(client.$e(client._(text.rp_calcResult), {
            ans: evalForRaw(args[0])
        }))
        const interface = makeInterface([
            ['C', '(', ')', '÷'],
            ['7', '8', '9', '×'],
            ['4', '5', '6', '-'],
            ['1', '2', '3', '+'],
            ['%', '0', '.', '=']
        ])
        const form = await message.channel.send({
            "embeds": [makeCalcResult(0)],
            "components": interface
        })
        const collector = new InteractionCollector(client, {
            idle: 30000,
            dispose: true,
            filter: (btn) => btn.customId.startsWith(`KamiCalc.`),
            channel: message.channel,
            interactionType: "MESSAGE_COMPONENT",
        })
        let history = new Array()
        collector.on("collect", message => {
            const originalValue = message.message.embeds[0].description.replace(/`/g, '')
            const selected = message.customId.slice(9)
            let respond = new String()
            if (selected == 'C') {
                respond = 0;
            } else if (selected == '=') {
                respond = originalValue.replace(/×/g, '*')
                respond = respond.replace(/÷/g, '/')
                respond = evalForRaw(respond)
                history.push(`${originalValue}=${respond}`)
                return message.update({
                    "embeds": [makeCalcResult(respond, originalValue)]
                })
            } else {
                if (selected == "+" || selected == "-" || selected == "×" || selected == "÷") message.message.embeds[0].title = ''
                if (message.message.embeds[0].title || originalValue == 0) respond = selected
                else respond = originalValue + selected
            }
            message.update({
                "embeds": [makeCalcResult(respond)]
            })
        })
        collector.on('end', () => {
            const disabledInterface = makeInterface([
                ['C', '(', ')', '÷'],
                ['7', '8', '9', '×'],
                ['4', '5', '6', '-'],
                ['1', '2', '3', '+'],
                ['%', '0', '.', '=']
            ], true)
            form.edit({
                "embeds": [makeExpired(history)],
                "components": disabledInterface
            })
        })
        return;
    }
};

function makeInterface(raw, expired) {
    const Wrapper = new Array()
    raw.forEach(rowContainer => {
        const container = new MessageActionRow()
        rowContainer.forEach(node => {
            const button = new MessageButton()
                .setCustomId(`KamiCalc.${node}`)
                .setLabel(node)
            if (expired) button.setDisabled(true)
            if (node == 'C') button.setStyle("DANGER")
            else if (node == '(' || node == ')' || node == '%' || node == '÷' || node == '×' || node == '-' || node == '+' || node == '.') button.setStyle("SUCCESS")
            else if (node == '=') button.setStyle('PRIMARY')
            else button.setStyle("SECONDARY")
            container.addComponents(button)
        })
        Wrapper.push(container)
    });
    return Wrapper;
}

function makeCalcResult(content, title) {
    const embed = new MessageEmbed()
        .setAuthor(text.activateAuthor)
        .setDescription("```" + content + "```")
        .setColor("2A9D8F")
    if (title) embed.setTitle(title)
    return embed;
}

function makeExpired(history) {
    const embed = new MessageEmbed()
        .setAuthor(text.expiredAuthor)
        .setColor("2A9D8F")
    history.forEach((history) => {
        const results = history.split("=")
        embed.addField(results[0], results[1])
        embed.setDescription(text.calcHistory)
    })
    return embed;
}

function evalForRaw(raw) {
    try {
        return eval(raw)
    } catch (error) {
        return text.rp_calcError
    }
}