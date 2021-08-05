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
const url_metadata_1 = __importDefault(require("url-metadata"));
const music_1 = require("./music");
const spotify_it_1 = require("spotify-it");
const secert_1 = __importDefault(require("../../client/Config/secert"));
const spotify = new spotify_it_1.Spotify({
    id: secert_1.default.spotifyToken.id,
    secret: secert_1.default.spotifyToken.secret,
    defaultLimit: 100
});
function default_1(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const thumbnail = (yield url_metadata_1.default(req)).image;
            const finalReturn = new music_1.MusicReturnClass();
            if (req.includes('track')) {
                const res = yield spotify.getTrack(req);
                finalReturn.isPlaylist(false);
                finalReturn.addVideo("Spotify", res.title, res.url, thumbnail, yield res.stream());
                return finalReturn.getReturn();
            }
            else if (req.includes('playlist')) {
                const res = yield spotify.getPlaylist(req);
                finalReturn.isPlaylist(true);
                finalReturn.addSpotifyVideos(res, thumbnail);
                return finalReturn.getReturn();
            }
            else if (req.includes('album')) {
                const res = yield spotify.getAlbum(req);
                finalReturn.isPlaylist(true);
                finalReturn.addSpotifyVideos(res, thumbnail);
                return finalReturn.getReturn();
            }
            return {
                success: false,
                error: "Cannot Find This URL Type"
            };
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
