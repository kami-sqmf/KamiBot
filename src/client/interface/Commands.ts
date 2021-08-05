import { client } from '../Clinet'
import { Message } from 'discord.js'

export interface ExecutePrototype {
    (client: client, ...args: any[]): Promise<void>
}

export interface Command {
    name: string
    aliases: string[]
    restrictions: string[]
    execute: ExecutePrototype
}
