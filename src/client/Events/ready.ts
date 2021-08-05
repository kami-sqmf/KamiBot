import { client } from '../Clinet'
import { ExecutePrototype } from '../interface/Events'
import dbTemp from '../../databases/All/collector'

const name = 'ready'
const execute: ExecutePrototype = async function (client: client) {
    client.setTemp(await dbTemp())
    console.log(`以 ${client.user?.tag} 身分登入\n服務總共 ${client.guilds.cache.size} 個伺服器、${client.users.cache.size} 位使用者`)
}

export { name, execute }
