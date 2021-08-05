import glob from 'glob'
import { promisify } from 'util'
import { Client, Collection, Emoji, Intents, MessageEmbed, MessageEmbedOptions, MessageOptions } from 'discord.js'
import { Event } from './interface/Events'
import { Secret } from './interface/config'
import { Command } from './interface/Commands'
import { tempValue } from '../databases/interfaces/interface'
import transFormat from '../translate/zh-TW'
const globPromise = promisify(glob)

class client extends Client {
    public constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_INTEGRATIONS,
                Intents.FLAGS.GUILD_WEBHOOKS,
                Intents.FLAGS.GUILD_INVITES,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_PRESENCES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            ],
        })
    }
    public Commands: Collection<string, Command> = new Collection()
    public Translate: Collection<string, typeof transFormat> = new Collection()
    public temp: tempValue
    public Secret: Secret
    public setSecret(secret: Secret) {
        this.Secret = secret
    }
    public setTemp(temp: tempValue) {
        this.temp = temp
    }
    public printAll() {
        setTimeout(
            () => {
                console.log(this.Commands)
                console.log(this.Translate)
            },
            this.Commands.size === 0 ? 3000 : 0
        )
    }
    public $e(description: string, options?: MessageEmbedOptions): MessageOptions {
        const embed = new MessageEmbed({
            ...options,
            description: description,
            color: 'RANDOM',
        })
        return {
            embeds: [embed],
        } as MessageOptions
    }
    public $t(content: string, object?: any): string {
        if (!object) return content
        if (object.emoji) content = `${object.emoji} ${content}`
        let results = content.match(/{{(.*?)}}/g)
        if (!results) return content
        results.forEach((result) => {
            let replace = object[result.slice(2, -2)]
            if (!replace) {
                console.error(`Content: ${content}, Replace: ${result}, Replacement: ${object[result]}`)
                throw "Can't Find the Args! Assign correct args."
            }
            content = content.replace(result, replace)
        })
        return content
    }
    public async start() {
        if (!this.Secret) throw 'Please Set Secret First!'
        const Commands = await globPromise(`${__dirname}/Commands/**/*.{js,ts}`)
        for (const filePath of Commands) {
            const file: Command = await import(filePath)
            this.Commands.set(file.name, file)
        }
        const Events = await globPromise(`${__dirname}/Events/**/*.{js,ts}`)
        for (const filePath of Events) {
            const file: Event = await import(filePath)
            this.on(file.name, file.execute.bind(null, this))
        }
        const Translate = await globPromise(`${__dirname}/../translate/*.{js,ts}`)
        for (const filePath of Translate) {
            let file = await import(filePath)
            let finalFile = file.default as typeof transFormat
            this.Translate.set(finalFile.lang.code, finalFile)
        }
        this.login(this.Secret.discordToken)
    }
}

export { client }
