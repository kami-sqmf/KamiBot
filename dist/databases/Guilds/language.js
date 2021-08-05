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
exports.restore = exports.update = void 0;
const Client_1 = require("../Client");
function update(client, guildId, newLang) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const guildRef = Client_1.firestore.collection('Guilds').doc(guildId);
            guildRef.set({
                language: newLang,
            }, {
                merge: true,
            });
            const guildInfo = client.temp.guilds.get(guildId);
            if (!guildInfo) {
                client.temp.guilds.set(guildId, {
                    language: newLang,
                });
            }
            client.temp.guilds.set(guildId, Object.assign(Object.assign({}, guildInfo), { language: newLang }));
        }
        catch (error) {
            return {
                success: false,
                error: error,
            };
        }
        return {
            success: true,
            error: false,
        };
    });
}
exports.update = update;
function restore(client, guildId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const guildRef = Client_1.firestore.collection('Guilds').doc(guildId);
            guildRef.update({
                language: Client_1.deleteField,
            });
            const guildInfo = client.temp.guilds.get(guildId);
            if (guildInfo) {
                delete guildInfo.language;
                client.temp.guilds.set(guildId, guildInfo);
            }
        }
        catch (error) {
            return {
                success: false,
                error: error,
            };
        }
        return {
            success: true,
            error: false,
        };
    });
}
exports.restore = restore;
