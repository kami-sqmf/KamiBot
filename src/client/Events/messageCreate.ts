import { client } from '../Clinet'
import { ExecutePrototype } from '../interface/Events'
import { Events, Message } from 'discord.js'

const name = Events.MessageCreate;
const execute: ExecutePrototype = async function (client: client, message: Message) {
    if (message.author.bot) return;
    if (message.content.indexOf("中國") >= 0) {
        message.reply("哎呦你媽习近平万岁")
    }
}

export { name, execute }
