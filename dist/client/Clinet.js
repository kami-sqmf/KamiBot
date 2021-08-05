"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const glob_1 = __importDefault(require("glob"));
const util_1 = require("util");
const discord_js_1 = require("discord.js");
const globPromise = util_1.promisify(glob_1.default);
class client extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.Intents.FLAGS.GUILDS,
                discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
                discord_js_1.Intents.FLAGS.GUILD_BANS,
                discord_js_1.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                discord_js_1.Intents.FLAGS.GUILD_INTEGRATIONS,
                discord_js_1.Intents.FLAGS.GUILD_WEBHOOKS,
                discord_js_1.Intents.FLAGS.GUILD_INVITES,
                discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES,
                discord_js_1.Intents.FLAGS.GUILD_PRESENCES,
                discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
                discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                discord_js_1.Intents.FLAGS.GUILD_MESSAGE_TYPING,
                discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
                discord_js_1.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                discord_js_1.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            ],
        });
        this.Commands = new discord_js_1.Collection();
        this.Translate = new discord_js_1.Collection();
    }
    setSecret(secret) {
        this.Secret = secret;
    }
    setTemp(temp) {
        this.temp = temp;
    }
    printAll() {
        setTimeout(() => {
            console.log(this.Commands);
            console.log(this.Translate);
        }, this.Commands.size === 0 ? 3000 : 0);
    }
    $e(description, options) {
        const embed = new discord_js_1.MessageEmbed(Object.assign(Object.assign({}, options), { description: description, color: 'RANDOM' }));
        return {
            embeds: [embed],
        };
    }
    $t(content, object) {
        if (!object)
            return content;
        if (object.emoji)
            content = `${object.emoji} ${content}`;
        let results = content.match(/{{(.*?)}}/g);
        if (!results)
            return content;
        results.forEach((result) => {
            let replace = object[result.slice(2, -2)];
            if (!replace) {
                console.error(`Content: ${content}, Replace: ${result}, Replacement: ${object[result]}`);
                throw "Can't Find the Args! Assign correct args.";
            }
            content = content.replace(result, replace);
        });
        return content;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Secret)
                throw 'Please Set Secret First!';
            const Commands = yield globPromise(`${__dirname}/Commands/**/*.{js,ts}`);
            for (const filePath of Commands) {
                const file = yield Promise.resolve().then(() => __importStar(require(filePath)));
                this.Commands.set(file.name, file);
            }
            const Events = yield globPromise(`${__dirname}/Events/**/*.{js,ts}`);
            for (const filePath of Events) {
                const file = yield Promise.resolve().then(() => __importStar(require(filePath)));
                this.on(file.name, file.execute.bind(null, this));
            }
            const Translate = yield globPromise(`${__dirname}/../translate/*.{js,ts}`);
            for (const filePath of Translate) {
                let file = yield Promise.resolve().then(() => __importStar(require(filePath)));
                let finalFile = file.default;
                this.Translate.set(finalFile.lang.code, finalFile);
            }
            this.login(this.Secret.discordToken);
        });
    }
}
exports.client = client;
