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
exports.execute = exports.name = void 0;
const emoji_1 = __importDefault(require("../Config/emoji"));
const name = 'messageCreate';
exports.name = name;
const execute = function (client, message) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (message.author.bot)
            return;
        let prefix = './';
        let language = 'en';
        const guildInfo = (_a = client.temp.guilds) === null || _a === void 0 ? void 0 : _a.get(message.guild.id);
        if (guildInfo) {
            if (guildInfo.prefix)
                prefix = guildInfo.prefix;
            if (guildInfo.language)
                language = guildInfo.language;
        }
        if (!message.content.startsWith(prefix) && !message.content.startsWith('./'))
            return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.Commands.get(command) || client.Commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
        if (!cmd)
            return;
        if (!cmd.restrictions.includes(message.channel.type)) {
            // message.channel.send(client.translate(client.translate.events.messageCreate.error1, {
            //     restrictions: JSON.stringify(cmd.restrictions).replace(/,/g, ' ').replace(`[`, '').replace(`]`, '').replace(/"/g, '**')
            // }))
            return;
        }
        cmd.execute(client, message, args, language).catch((err) => {
            console.error(err.toString());
            message.channel.send({
                content: client.$t(client.Translate.get(language).general.error, { emoji: emoji_1.default.general.cross }),
                files: [
                    {
                        name: 'Error.txt',
                        attachment: Buffer.from(err.toString(), 'utf8'),
                    },
                ],
            });
        });
    });
};
exports.execute = execute;
