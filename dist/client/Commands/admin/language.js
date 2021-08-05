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
const language_1 = require("../../../databases/Guilds/language");
const name = 'language';
exports.name = name;
const aliases = ['lang'];
exports.aliases = aliases;
const restrictions = ['GUILD_TEXT'];
exports.restrictions = restrictions;
const execute = function (client, message, args, language) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = client.Translate.get(language).admin.language;
        const guildId = message.guild.id;
        const guildInfo = client.temp.guilds.get(guildId);
        if (args.length == 0) {
            return message.channel.send(client.$e(client.$t(text.rp_sayLang, {
                lang: `${client.Translate.get(language).lang.language} ${language}`,
            })));
        }
        else if (args.length == 1 && args[0] == 'default') {
            const res = yield language_1.restore(client, guildId);
            if (res.error) {
                return message.channel.send(client.$e(client.$t(text.rp_errorDB, {
                    emoji: emoji_1.default.general.cross,
                })));
            }
            message.channel.send(client.$e(client.$t(text.rp_defaultLang1, {
                emoji: emoji_1.default.general.check,
            })));
            return message.channel.send(client.$e(text.rp_defaultLang2));
        }
        else if (args.length == 2 && args[0] == 'set') {
            let langs = [...client.Translate.keys()];
            if (!langs.includes(args[1])) {
                message.channel.send(client.$e(client.$t(text.rp_errorLangCode, {
                    emoji: emoji_1.default.general.cross,
                })));
                return message.channel.send(client.$e('', makeSupportedLangEmbed(client, text, langs)));
            }
            const res = yield language_1.update(client, guildId, args[1]);
            if (res.error) {
                return message.channel.send(client.$e(client.$t(text.rp_errorDB, {
                    emoji: emoji_1.default.general.cross,
                })));
            }
            return message.channel.send(client.$e(client.$t(text.rp_updatedLang, {
                emoji: emoji_1.default.general.check,
                lang: `${client.Translate.get(args[1]).lang.language} ${args[1]}`,
            })));
        }
        message.channel.send(client.$e('', makeSupportedLangEmbed(client, text, [...client.Translate.keys()])));
        return message.channel.send(client.$e(client.$t(text.rp_errorFormat, {
            emoji: emoji_1.default.general.uSuck,
        })));
    });
};
exports.execute = execute;
function makeSupportedLangEmbed(client, text, langs) {
    const format = {
        title: text.embed_supportedLang,
        color: 6939554,
        fields: [],
    };
    langs.forEach((lang) => {
        format.fields.push({
            name: `${client.Translate.get(lang).lang.language}`,
            value: `${lang}`,
        });
    });
    return format;
}
