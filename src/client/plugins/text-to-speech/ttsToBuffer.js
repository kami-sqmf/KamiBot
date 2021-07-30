const client = require('./client')
module.exports = async function (content, lang) {
    lang = lang.replace('zh', 'cmn')
    const request = {
        input: {
            text: content
        },
        voice: {
            languageCode: lang,
            ssmlGender: 'NEUTRAL'
        },
        audioConfig: {
            audioEncoding: 'MP3'
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            setTimeout(() => {
                reject("timeout")
            }, 8000)
            const [response] = await client.synthesizeSpeech(request);
            resolve(response.audioContent)
        } catch (error) {
            reject(error)
        }
    });
}