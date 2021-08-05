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
const name = 'ping';
exports.name = name;
const aliases = ['pg'];
exports.aliases = aliases;
const restrictions = ['GUILD_TEXT', 'DM'];
exports.restrictions = restrictions;
const execute = function (client, message, args, language) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = client.Translate.get(language).infos;
        const msgBeforeReWrite = yield message.channel.send(client.$e(client.$t(text.ping, { emoji1: emoji_1.default.general.hourglass, ping: client.ws.ping, emoji2: emoji_1.default.general.Rewrite, rewrite: 'Testing!' })));
        msgBeforeReWrite.edit(client.$e(client.$t(text.ping, { emoji1: emoji_1.default.general.hourglass, ping: client.ws.ping, emoji2: emoji_1.default.general.Rewrite, rewrite: msgBeforeReWrite.createdTimestamp - message.createdTimestamp })));
        return;
    });
};
exports.execute = execute;
