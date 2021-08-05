"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const secret = {
    discordToken: process.env.DISCORD_TOKEN,
    spotifyToken: {
        id: process.env.SPOTIFY_TOKEN,
        secret: process.env.SPOTIFY_TOKEN_SECRET,
    },
    googleCert: {
        client_email: process.env.GOOGLE_APP_EMAIL,
        private_key: process.env.GOOGLE_APP_PRIVATE_KEY,
    },
};
exports.default = secret;
