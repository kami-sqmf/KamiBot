module.exports = async (client, message) => {
    if (message.author.bot) return;

    let prefix = './'
    if (client.temp.Guilds[message.guild.id]) {
        if (client.temp.Guilds[message.guild.id].prefix) {
            prefix = client.temp.Guilds[message.guild.id].prefix
        }
    }

    if (!message.content.startsWith(prefix) && !message.content.startsWith('./')) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.shorten && cmd.shorten.includes(command));

    if (!cmd) return;
    if (!cmd.restrictions.includes(message.channel.type)) {
        // message.channel.send(client.translate(client.translate.events.messageCreate.error1, {
        //     restrictions: JSON.stringify(cmd.restrictions).replace(/,/g, ' ').replace(`[`, '').replace(`]`, '').replace(/"/g, '**')
        // }))
        return;
    }

    let language = 'en'
    if (client.temp.Guilds[message.guild.id]) {
        if (client.temp.Guilds[message.guild.id].language) {
            language = client.temp.Guilds[message.guild.id].language
        }
    }
    
    if (cmd) cmd.execute(client, message, args, language);
};