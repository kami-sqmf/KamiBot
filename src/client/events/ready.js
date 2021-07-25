const dbTemp = require('../plugins/dbTemp')
module.exports = async (client) => {
    client.temp = await dbTemp()
    console.log(`以 ${client.user.username} 身分登入\n服務總共 ${client.guilds.cache.size} 個伺服器、${client.users.cache.size} 位使用者`);
}