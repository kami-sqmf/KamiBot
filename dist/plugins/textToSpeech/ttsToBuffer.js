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
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./Client");
function default_1(content, lang) {
    return __awaiter(this, void 0, void 0, function* () {
        lang = lang.replace('zh', 'cmn');
        const request = {
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
        };
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                setTimeout(() => {
                    reject('timeout');
                }, 8000);
                const [response] = yield Client_1.ttsClient.synthesizeSpeech(request);
                resolve(response.audioContent);
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
exports.default = default_1;
