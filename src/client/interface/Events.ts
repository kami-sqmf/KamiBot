import { client } from '../Clinet'

export interface ExecutePrototype {
    (client: client, ...args: any[]): Promise<void>
}

export interface Event {
    name: string
    execute: ExecutePrototype
}
