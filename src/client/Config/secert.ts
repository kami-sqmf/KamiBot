require('dotenv').config()
import { Secret } from '../interface/config'
const secret: Secret = {
    discordToken: process.env.DISCORD_TOKEN,
    spotifyToken: {
        id: process.env.SPOTIFY_TOKEN,
        secret: process.env.SPOTIFY_TOKEN_SECRET,
    },
    googleCert: {
        client_email: process.env.GOOGLE_APP_EMAIL,
        private_key: process.env.GOOGLE_APP_PRIVATE_KEY,
    },
}
export default secret
