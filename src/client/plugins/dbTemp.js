const Global = require('../database/All/Global')
const Guilds = require('../database/All/Guilds')
const Users = require('../database/All/User')

module.exports = async () => {
    const temp = new Object()
    temp.Global = (await Global()).data
    temp.Guilds = (await Guilds()).data
    temp.Users = (await Users()).data
    return temp
}