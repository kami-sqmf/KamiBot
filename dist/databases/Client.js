"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteField = exports.firestore = void 0;
const secert_1 = __importDefault(require("../client/Config/secert"));
const firestore_1 = require("@google-cloud/firestore");
const firestore = new firestore_1.Firestore({
    projectId: 'kamibot-discord',
    credentials: {
        client_email: secert_1.default.googleCert.client_email,
        private_key: secert_1.default.googleCert.private_key,
    },
});
exports.firestore = firestore;
const deleteField = firestore_1.FieldValue.delete();
exports.deleteField = deleteField;
require('dotenv').config();
