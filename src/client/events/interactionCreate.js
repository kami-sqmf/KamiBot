module.exports = async (client, message) => {
    args = message.customId.split('.')
    let language = client.temp.guilds[message.guild.id].language
    if(!language) language = 'en'
    switch(args[0]){
        case 'lang':
            require('../interaction/lang')(client, language, message, args)
            return;
    }
    return message.reply(client.embeds('奇怪ㄟ，就說還沒好齁'));
};