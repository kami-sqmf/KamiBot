import Global from './Global'
import Guilds from './Guilds'
import Users from './Users'
import { Cache } from '../interfaces/interface'

export default async () => {
    const temp: Cache = {
        global: (await Global()).data!,
        guilds: (await Guilds()).data!,
        users: (await Users()).data!,
    }
    return temp
}
