import { protos } from '@google-cloud/text-to-speech'
import { ttsClient } from './client'
export default async function (content: string, lang: string): Promise<string | Uint8Array> {
    lang = lang.replace('zh', 'cmn')
    const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
        input: {
            text: content,
        },
        voice: {
            languageCode: lang,
            ssmlGender: 'SSML_VOICE_GENDER_UNSPECIFIED',
        },
        audioConfig: {
            audioEncoding: 'MP3',
        },
    }
    return new Promise(async (resolve, reject) => {
        try {
            setTimeout(() => {
                reject('timeout')
            }, 8000)
            const [response] = await ttsClient.synthesizeSpeech(request)
            if (response.audioContent) {
                resolve(response.audioContent);
            } else {
                reject('Audio content is undefined');
            }
        } catch (error) {
            reject(error)
        }
    })
}
