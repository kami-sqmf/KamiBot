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
exports.MusicReturnClass = exports.musicClient = void 0;
const normalStream_1 = __importDefault(require("./normalStream"));
const youtubeStream_1 = __importDefault(require("./youtubeStream"));
const spotifyStream_1 = __importDefault(require("./spotifyStream"));
const emoji_1 = __importDefault(require("../../client/Config/emoji"));
class musicClient {
    initSettings(aliases) {
        this.aliases = aliases;
    }
    getMusicStream(client, message, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = getMusicURL(message.content, this.aliases);
            const requestType = detectMusicType(request);
            switch (requestType) {
                case 'YouTube':
                    message.channel.send(client.$e(client.$t(text.rp_searching, { emoji: emoji_1.default.youtube, request: request })));
                    return yield youtubeStream_1.default(request);
                case 'URL':
                    message.channel.send(client.$e(client.$t(text.rp_searching, { emoji: emoji_1.default.jing, request: request })));
                    return yield normalStream_1.default(request);
                case 'Spotify':
                    message.channel.send(client.$e(client.$t(text.rp_searching, { emoji: emoji_1.default.spotify, request: request })));
                    return yield spotifyStream_1.default(request);
            }
        });
    }
}
exports.musicClient = musicClient;
function getMusicURL(content, aliases) {
    aliases.forEach((alias) => {
        if (content.includes(alias)) {
            return content = content.slice(content.indexOf(alias) + alias.length + 1);
        }
    });
    return content;
}
function detectMusicType(request) {
    if (request.includes('open.spotify.com')) {
        return 'Spotify';
    }
    else if (isMusicURL(request)) {
        return 'URL';
    }
    else {
        return 'YouTube';
    }
}
function isMusicURL(url) {
    try {
        new URL(url);
        if (url.endsWith('.mp3') || url.endsWith('.ogg') || url.endsWith('.wav') || url.endsWith('.webm'))
            return true;
    }
    catch (e) {
        return false;
    }
    return false;
}
class MusicReturnClass {
    constructor() {
        this.res = {
            playlist: false,
            video: []
        };
        this.video = [];
    }
    isPlaylist(is) {
        this.res.playlist = is;
    }
    addVideo(type, title, url, thumbnail, stream) {
        this.video.push({
            type: type,
            title: title,
            url: url,
            thumbnail: thumbnail,
            stream: stream,
        });
    }
    addSpotifyVideos(videos, thumbnail) {
        videos.tracks.forEach((res) => __awaiter(this, void 0, void 0, function* () {
            this.addVideo('Spotify', res.title, res.url, thumbnail, yield res.stream());
        }));
    }
    getReturn() {
        this.res['video'] = this.video;
        return {
            success: true,
            res: this.res,
        };
    }
}
exports.MusicReturnClass = MusicReturnClass;
