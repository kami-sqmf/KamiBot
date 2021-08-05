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
const Client_1 = require("../Client");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guildRef = Client_1.firestore.collection('Users');
        const guild = yield guildRef.get();
        const finalFormat = new Map();
        guild.forEach((doc) => {
            finalFormat.set(doc.id, doc.data());
        });
        const returnValue = {
            success: true,
            data: finalFormat,
        };
        return returnValue;
    }
    catch (e) {
        const returnValue = {
            success: false,
            error: e,
        };
        return returnValue;
    }
});
