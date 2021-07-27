const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config()
const client = new textToSpeech.TextToSpeechClient({
    projectId: "kamibot-discord",
    credentials: {
        client_email: process.env.GOOGLE_APP_EMAIL,
        private_key: process.env.GOOGLE_APP_PRIVATE_KEY
    }
});

module.exports = client