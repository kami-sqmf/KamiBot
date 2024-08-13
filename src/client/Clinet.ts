import { Client, Collection, EmbedBuilder, EmbedData, GatewayIntentBits, REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js'
import { glob } from 'glob'
import { Cache, CacheType } from '../databases/interfaces/interface'
import { QueueManager } from '../plugins/voice/queue'
import transFormat from '../translate/zh-TW'
import { Command } from './interface/Commands'
import { Event } from './interface/Events'
import { Secret } from './interface/config'

class client extends Client {
    private cache: Cache
    public Secret: Secret
    public voiceManager: QueueManager;
    public ClientId: string = "853883995309604875"
    public Commands: Collection<string, Command> = new Collection()
    public Translate: Collection<string, typeof transFormat> = new Collection()

    public constructor(secret: Secret, cache: Cache) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.MessageContent,
            ],
        })
        this.Secret = secret;
        this.cache = cache;
        this.voiceManager = new QueueManager(this.guilds);
    }

    public getChache(type: CacheType, id: string): any {
        if (!id) return null;
        if (!this.cache[type]) return null;
        if (!this.cache[type].has(id)) return null;
        return this.cache[type].get(id);
    }

    public setChache(type: CacheType, id: string, data: any): void {
        if (!this.cache[type]) this.cache[type] = new Collection();
        this.cache[type].set(id, data);
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

    public $e(description: string, options?: EmbedData) {
        const embed = new EmbedBuilder({
            ...options,
            description: description,
        }).setColor('Random')
        return {
            embeds: [embed],
        }
    }
    public $t(content: string, object?: any): string {
        if (!object) return content;
        if (object.emoji) content = `${object.emoji} ${content}`;
        let results = content.match(/{{(.*?)}}/g)
        if (!results) return content;
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
        const Commands = await glob(`${__dirname}/Commands/**/*.{js,ts}`, { ignore: 'node_modules/**' })
        for (const filePath of Commands) {
            const file: Command = await import(filePath)
            this.Commands.set(file.slash.name, file)
        }
        const Events = await glob(`${__dirname}/Events/**/*.{js,ts}`, { ignore: 'node_modules/**' })
        for (const filePath of Events) {
            const file: Event = await import(filePath)
            this.on(file.name, file.execute.bind(null, this))
        }
        const Translate = await glob(`${__dirname}/../translate/*.{js,ts}`, { ignore: 'node_modules/**' })
        for (const filePath of Translate) {
            let file = await import(filePath)
            let finalFile = file.default as typeof transFormat
            this.Translate.set(finalFile.lang.code, finalFile)
        }
        if (!this.Secret.discordToken) throw "請給予 Discord Bot Token";
        this.registerCommands(this.Secret.discordToken, this.Commands.map((command) => command.slash.toJSON()));
        this.login(this.Secret.discordToken);
    }

    private async registerCommands(token: string, commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
        const rest = new REST().setToken(token);
        try {
            const guildsId = [...this.cache.guilds.keys()];
            console.log(`正在${guildsId.length}個伺服器，刷新 ${commands.length} 條斜線指令`);
            for (const guildId of guildsId) {
                const data = await rest.put(
                    Routes.applicationGuildCommands(this.ClientId, guildId),
                    { body: commands },
                );
            }
            console.log(`成功在${guildsId.length}個伺服器，刷新 ${commands.length} 條斜線指令`);
        } catch (error) {
            console.error(`斜線指令刷新錯誤： ${error}`);
        }
    }
}

export { client }
