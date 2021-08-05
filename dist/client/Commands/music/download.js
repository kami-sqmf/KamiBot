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
const music_1 = require("../../../plugins/music/music");
const name = 'download';
exports.name = name;
const aliases = ['dd', 'yt2mp3'];
exports.aliases = aliases;
const restrictions = ['GUILD_TEXT', 'DM'];
exports.restrictions = restrictions;
const NameAndAliases = aliases;
NameAndAliases.push(name);
const execute = function (client, message, args, language) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = client.Translate.get(language).voice.download;
        if (args.length == 0)
            return message.channel.send(client.$e(client.$t(text.rp_errorFormat, { emoji: emoji_1.default.general.cross })));
        const respond = new music_1.musicClient();
        respond.initSettings(NameAndAliases);
        const gotVids = yield respond.getMusicStream(client, message, text);
        if (!gotVids.success)
            message.channel.send({
                content: client.$t(text.rp_errorProcess, { emoji: emoji_1.default.general.cross }),
                files: [
                    {
                        name: 'Error.txt',
                        attachment: Buffer.from(gotVids.error.toString(), 'utf8'),
                    },
                ],
            });
        gotVids.res.video.forEach((video) => __awaiter(this, void 0, void 0, function* () {
            message.channel.send(client.$e(client.$t(text.rp_downloading, {
                emoji: emoji_1.default.general.loading,
                file: video.title,
                url: video.url,
            })));
            try {
                message.channel.sendTyping();
                const final = yield promiseTimeout(sendMusicAttach(message, video), 8000);
            }
            catch (error) {
                if (error == 'Timeout')
                    return message.channel.send(client.$e(client.$t(text.rp_errorTimeout, { emoji: emoji_1.default.general.cross })));
                message.channel.send({
                    content: client.$t(text.rp_errorProcess, { emoji: emoji_1.default.general.cross }),
                    files: [
                        {
                            name: 'Error.txt',
                            attachment: Buffer.from(error.toString(), 'utf8'),
                        },
                    ],
                });
            }
        }));
    });
};
exports.execute = execute;
function sendMusicAttach(message, video) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            switch (video.type) {
                case 'YouTube':
                    resolve(yield message.channel.send({
                        files: [
                            {
                                attachment: video.stream,
                                name: `${video.title}.mp3`,
                            },
                        ],
                    }));
                case 'Spotify':
                    video.stream.on('info', resolve(sendSpotify(message, video.stream, video.title)));
                case 'URL':
                    resolve(yield message.channel.send({
                        files: [video.stream],
                    }));
            }
        }
        catch (error) {
            reject(error);
        }
    }));
}
function promiseTimeout(promise, delay) {
    return __awaiter(this, void 0, void 0, function* () {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(function () {
                reject('Timeout');
            }, delay);
        });
        return yield Promise.race([timeout, promise]);
    });
}
function sendSpotify(message, stream, title) {
    message.channel.send({
        files: [
            {
                attachment: stream,
                name: `${title}.mp3`,
            },
        ],
    });
}
