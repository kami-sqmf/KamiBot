import { client } from '../Clinet'
import { ExecutePrototype } from '../interface/Events'
import { DiscordErrorData, Events } from 'discord.js'

const name = Events.ShardError;
const execute: ExecutePrototype = async function (client: client, error) {
  console.error('A websocket connection encountered an error:', error)
}

export { name, execute }
