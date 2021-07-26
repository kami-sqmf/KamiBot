module.exports = {
    name: 'clear',
    shorten: ['clear'],
    restrictions: ['GUILD_TEXT'],

    async execute(client, message, args, language) {
        const text = client._[language].admin.clear
        if(!args[0]) return message.channel.send(client.$e(text.rp_errorFormat))
        if(isNaN(args[0])) return message.channel.send(client.$e(text.rp_errorNumInput))
        let lines = parseInt(args[0]) + 1
        while (lines > 0) {
            if (lines >= 100){
                message.channel.bulkDelete(99)
                    .catch((e) => {
                        console.error(e)
                        message.channel.send(client.$e(text.rp_errorWhileClearing))
                    });
                lines -= 99
            }else{
                message.channel.bulkDelete(lines)
                    .then((e) => {
                        message.channel.send(client.$e(client._(text.rp_successClearing, {lines: args[0]}))).then(message =>
                                setTimeout(() => message.delete(), 5000)
                        )
                    })
                    .catch((e) => {
                        console.error(e)
                    });
                lines = 0
            }
        }
    },
};