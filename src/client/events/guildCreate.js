module.exports = async (client, message) => {
    client.temp.Guilds[message.id] = {}
    console.log(`${message.name} 把你加入到伺服器中`);
}