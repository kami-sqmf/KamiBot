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
const prefix_1 = require("../../../databases/Guilds/prefix");
const name = 'prefix';
exports.name = name;
const aliases = ['pf'];
exports.aliases = aliases;
const restrictions = ['GUILD_TEXT'];
exports.restrictions = restrictions;
const execute = function (client, message, args, language) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = client.Translate.get(language).admin.prefix;
        const guildId = message.guild.id;
        const guildInfo = client.temp.guilds.get(guildId);
        if (args.length == 0) {
            let prefix = '';
            if (guildInfo && guildInfo.prefix)
                prefix = guildInfo.prefix;
            else
                prefix = text.rp_defalut;
            return message.channel.send(client.$e(client.$t(text.rp_sayPrefix, { prefix: prefix })));
        }
        else if (args.length == 1 && args[0] == 'default') {
            const res = yield prefix_1.restore(client, guildId);
            if (res.error) {
                return message.channel.send(client.$e(client.$t(text.rp_errorDB, {
                    emoji: emoji_1.default.general.cross,
                })));
            }
            return message.channel.send(client.$e(client.$t(text.rp_defaultPrefix, {
                emoji: emoji_1.default.general.check,
            })));
        }
        else if (args.length == 2 && args[0] == 'set') {
            const res = yield prefix_1.update(client, guildId, args[1]);
            if (res.error) {
                return message.channel.send(client.$e(client.$t(text.rp_errorDB, {
                    emoji: emoji_1.default.general.cross,
                })));
            }
            return message.channel.send(client.$e(client.$t(text.rp_updatedPrefix, {
                emoji: emoji_1.default.general.check,
                prefix: args[1],
            })));
        }
        return message.channel.send(client.$e(client.$t(text.rp_errorFormat, {
            emoji: emoji_1.default.general.uSuck,
        })));
    });
};
exports.execute = execute;
