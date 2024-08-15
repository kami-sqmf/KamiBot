import textToSpeech from '@google-cloud/text-to-speech'
const ttsClient = new textToSpeech.TextToSpeechClient({
    projectId: 'paperbot-kamisqmf',
    credentials: {
        client_email: process.env.GOOGLE_APP_EMAIL,
        private_key: process.env.GOOGLE_APP_PRIVATE_KEY,
    },
})

export { ttsClient }
require('dotenv').config()
