import Global from './Global'
import Guilds from './Guilds'
import Users from './Users'
import { tempValue } from '../interfaces/interface'

export default async () => {
    const temp: tempValue = {
        global: (await Global()).data,
        guilds: (await Guilds()).data,
        users: (await Users()).data,
    }
    return temp
}
