module.exports = {
    name: 'pong',
    shorten: ['pog'],
    restrictions: ['GUILD_TEXT', 'DM'],

    async execute(client, message, args, language) {
        message.channel.sendTyping();
        setTimeout(() => message.channel.send("abc"), 3000)
        
    }
};