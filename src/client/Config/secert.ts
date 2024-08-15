require('dotenv').config()
import { Secret } from '../interface/config'
const secret: Secret = {
    discordToken: process.env.DISCORD_TOKEN,
    googleCert: {
        client_email: process.env.GOOGLE_APP_EMAIL,
        private_key: process.env.GOOGLE_APP_PRIVATE_KEY,
    },
}
export default secret
