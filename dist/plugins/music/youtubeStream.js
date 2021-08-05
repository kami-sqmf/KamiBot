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
const music_1 = require("./music");
const youtube_sr_1 = __importDefault(require("youtube-sr"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
function default_1(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const finalReturn = new music_1.MusicReturnClass();
            if (req.includes(`&feature=share`)) {
                req = req.replace(`&feature=share`, ``);
            }
            if (req.includes(`music.youtube.com/watch?v=`)) {
                req = `youtu.be/` + req.slice(req.indexOf(`music.youtube.com/watch?v=`) + `music.youtube.com/watch?v=`.length);
            }
            if (req.includes(`music.youtube.com`)) {
                req = req.replace(`music.youtube.com`, `www.youtube.com`);
            }
            if (req.includes(`yout`) && req.includes(`be`) && req.includes(`/`) && req.includes(`list`)) {
                const res = yield youtube_sr_1.default.getPlaylist(req);
                finalReturn.isPlaylist(true);
                const list = yield res.fetch();
                list.videos.forEach((vid) => __awaiter(this, void 0, void 0, function* () {
                    finalReturn.addVideo('YouTube', vid.title, vid.url, vid.thumbnail.url, yield ytdl_core_1.default(vid.url, {
                        quality: 'highestaudio',
                        filter: 'audioonly',
                        dlChunkSize: 0,
                    }));
                }));
            }
            else {
                const res = yield youtube_sr_1.default.searchOne(req);
                if (!res)
                    throw "Cannot find this video";
                finalReturn.isPlaylist(false);
                finalReturn.addVideo("YouTube", res.title, res.url, res.thumbnail.url, yield ytdl_core_1.default(res.url, {
                    quality: 'highestaudio',
                    filter: 'audioonly',
                    dlChunkSize: 0,
                }));
            }
            return finalReturn.getReturn();
        }
        catch (err) {
            return {
                success: false,
                error: err,
            };
        }
    });
}
exports.default = default_1;
