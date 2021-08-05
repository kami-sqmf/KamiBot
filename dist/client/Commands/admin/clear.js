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
const name = 'clear';
exports.name = name;
const aliases = ['cls'];
exports.aliases = aliases;
const restrictions = ['GUILD_TEXT'];
exports.restrictions = restrictions;
const execute = function (client, message, args, language) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = client.Translate.get(language).admin.clear;
        if (!args[0])
            return message.channel.send(client.$e(client.$t(text.rp_errorFormat, {
                emoji: emoji_1.default.general.uSuck,
            })));
        if (isNaN(Number(args[0])))
            return message.channel.send(client.$e(client.$t(text.rp_errorNumInput, {
                emoji: emoji_1.default.general.uSuck,
            })));
        let lines = parseInt(args[0]) + 1;
        while (lines > 0) {
            if (lines >= 100) {
                ;
                message.channel.bulkDelete(99).catch((e) => {
                    console.error(e);
                    message.channel.send(client.$e(client.$t(text.rp_errorWhileClearing, {
                        emoji: emoji_1.default.general.cross,
                    })));
                });
                lines -= 99;
            }
            else {
                ;
                message.channel
                    .bulkDelete(lines)
                    .then((e) => {
                    message.channel
                        .send(client.$e(client.$t(text.rp_successClearing, {
                        emoji: emoji_1.default.general.check,
                        lines: args[0],
                    })))
                        .then((message) => setTimeout(() => message.delete(), 5000));
                })
                    .catch((e) => {
                    console.error(e);
                });
                lines = 0;
            }
        }
    });
};
exports.execute = execute;
