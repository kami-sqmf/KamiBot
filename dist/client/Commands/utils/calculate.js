"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.restrictions = exports.aliases = exports.name = void 0;
const discord_js_1 = require("discord.js");
const emoji_1 = __importDefault(require("../../Config/emoji"));
const name = 'calculate';
exports.name = name;
const aliases = ['calc', 'count', 'eval'];
exports.aliases = aliases;
const restrictions = ['GUILD_TEXT', 'DM'];
exports.restrictions = restrictions;
const execute = function (client, message, args, language) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = client.Translate.get(language).utils.calculate;
        if (args.length > 0)
            return message.channel.send(client.$e(client.$t(text.rp_calcResult, {
                emoji: emoji_1.default.general.check,
                ans: evalForRaw(args[0], text),
            })));
        const interfaceUI = makeInterface([
            ['C', '(', ')', '÷'],
            ['7', '8', '9', '×'],
            ['4', '5', '6', '-'],
            ['1', '2', '3', '+'],
            ['%', '0', '.', '='],
        ]);
        const form = yield message.channel.send({
            embeds: [makeCalcResult('0', text)],
            components: interfaceUI,
        });
        const collector = new discord_js_1.InteractionCollector(client, {
            idle: 30000,
            dispose: true,
            filter: (btn) => btn.customId.startsWith(`KamiCalc.`),
            channel: message.channel,
            interactionType: 'MESSAGE_COMPONENT',
        });
        let history = new Array();
        collector.on('collect', (message) => {
            const originalValue = message.message.embeds[0].description.replace(/`/g, '');
            const selected = message.customId.slice(9);
            let respond = '';
            if (selected == 'C') {
                respond = '0';
            }
            else if (selected == '=') {
                respond = originalValue.replace(/×/g, '*');
                respond = respond.replace(/÷/g, '/');
                respond = evalForRaw(respond, text);
                history.push(`${originalValue}=${respond}`);
                return message.update({
                    embeds: [makeCalcResult(respond, text, originalValue)],
                });
            }
            else {
                if (selected == '+' || selected == '-' || selected == '×' || selected == '÷')
                    message.message.embeds[0].title = '';
                if (message.message.embeds[0].title || originalValue == 0)
                    respond = selected;
                else
                    respond = originalValue + selected;
            }
            message.update({
                embeds: [makeCalcResult(respond, text)],
            });
        });
        collector.on('end', () => {
            const disabledInterface = makeInterface([
                ['C', '(', ')', '÷'],
                ['7', '8', '9', '×'],
                ['4', '5', '6', '-'],
                ['1', '2', '3', '+'],
                ['%', '0', '.', '='],
            ], true);
            form.edit({
                embeds: [makeExpired(history, text)],
                components: disabledInterface,
            });
        });
        return;
    });
};
exports.execute = execute;
function makeInterface(raw, expired) {
    const Wrapper = [];
    raw.forEach((rowContainer) => {
        const container = new discord_js_1.MessageActionRow();
        rowContainer.forEach((node) => {
            const button = new discord_js_1.MessageButton().setCustomId(`KamiCalc.${node}`).setLabel(node);
            if (expired)
                button.setDisabled(true);
            if (node == 'C')
                button.setStyle('DANGER');
            else if (node == '(' || node == ')' || node == '%' || node == '÷' || node == '×' || node == '-' || node == '+' || node == '.')
                button.setStyle('SUCCESS');
            else if (node == '=')
                button.setStyle('PRIMARY');
            else
                button.setStyle('SECONDARY');
            container.addComponents(button);
        });
        Wrapper.push(container);
    });
    return Wrapper;
}
function makeCalcResult(content, text, title) {
    const embed = new discord_js_1.MessageEmbed()
        .setAuthor(text.activateAuthor)
        .setDescription('```' + content + '```')
        .setColor('#2A9D8F');
    if (title)
        embed.setTitle(title);
    return embed;
}
function makeExpired(history, text) {
    const embed = new discord_js_1.MessageEmbed().setAuthor(text.expiredAuthor).setColor('#236b62');
    history.forEach((history) => {
        const results = history.split('=');
        embed.addField(results[0], results[1]);
        embed.setDescription(text.calcHistory);
    });
    return embed;
}
function evalForRaw(raw, text) {
    try {
        return eval(raw);
    }
    catch (error) {
        return text.rp_calcError;
    }
}
