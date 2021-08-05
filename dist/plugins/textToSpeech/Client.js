"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttsClient = void 0;
const text_to_speech_1 = __importDefault(require("@google-cloud/text-to-speech"));
const ttsClient = new text_to_speech_1.default.TextToSpeechClient({
    projectId: 'kamibot-discord',
    credentials: {
        client_email: process.env.GOOGLE_APP_EMAIL,
        private_key: process.env.GOOGLE_APP_PRIVATE_KEY,
    },
});
exports.ttsClient = ttsClient;
require('dotenv').config();
