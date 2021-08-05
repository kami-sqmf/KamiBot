import { client } from './client/Clinet'
import { Secret } from './client/interface/config'
import secret from './client/Config/secert'

const discord = new client()
discord.setSecret(secret as Secret)
discord.start()
