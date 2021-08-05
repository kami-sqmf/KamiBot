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
const emoji_1 = __importDefault(require("../../Config/emoji"));
const ttsToBuffer_1 = __importDefault(require("../../../plugins/textToSpeech/ttsToBuffer"));
const name = 'tts';
exports.name = name;
const aliases = ['voice'];
exports.aliases = aliases;
const restrictions = ['GUILD_TEXT'];
exports.restrictions = restrictions;
const execute = function (client, message, args, language) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = client.Translate.get(language).voice.tts;
        if (args.length == 0)
            return message.channel.send(client.$e(client.$t(text.rp_errorFormat, {
                emoji: emoji_1.default.general.uSuck,
            })));
        const lang = args[0];
        if (!/[a-z]-[a-z]/g.test(lang))
            return message.channel.send(client.$e(client.$t(text.rp_errorLangCode, {
                emoji: emoji_1.default.general.uSuck,
            })));
        message.content = message.content.toLowerCase();
        let content = '';
        if (message.content.includes('voice')) {
            content = message.content.slice(message.content.indexOf('voice') + 7 + lang.length);
        }
        else if (message.content.includes('tts')) {
            content = message.content.slice(message.content.indexOf('tts') + 5 + lang.length);
        }
        try {
            const respond = yield ttsToBuffer_1.default(content, lang);
            const ttsBuffer = respond.buffer;
            if (!message.member.voice.channel) {
                message.channel.send({
                    content: `**${content}**`,
                    files: [
                        {
                            attachment: yield Buffer.from(ttsBuffer),
                            name: `${content.split('\n')[0]}-KamibotTTS.mp3`,
                        },
                    ],
                });
            }
            else {
            }
        }
        catch (error) {
            if (error == 'timeout') {
                return message.channel.send(client.$e(client.$t(text.rp_errorTimeout, { emoji: emoji_1.default.general.cross })));
            }
            else
                console.log(error);
            return message.channel.send(client.$e(client.$t(text.rp_errorProcess, { emoji: emoji_1.default.general.cross })));
        }
        return;
    });
};
exports.execute = execute;
