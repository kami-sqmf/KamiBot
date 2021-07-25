const db = require('../db')
module.exports = {
    update: async (client, guildId, newLang) => {
        try {
            const guildRef = db.collection('Guilds').doc(guildId)
            guildRef.set({
                language: newLang
            }, {
                merge: true
            });
            if (!client.temp.Guilds[guildId]) {
                client.temp.Guilds[guildId] = new Object()
            }
            client.temp.Guilds[guildId].language = newLang
        } catch (e) {
            return {
                success: false,
                error: e
            }
        }
        return {
            success: true,
            error: false
        };
    },
    delete: async (client, guildId) => {
        try {
            const guildRef = db.collection('Guilds').doc(guildId);
            guildRef.update({
                language: db.delete
            });
            if (!client.temp.Guilds[guildId]) {
                client.temp.Guilds[guildId] = new Object()
                client.temp.Guilds[guildId].language = 'en'
            }
            delete client.temp.Guilds[guildId].language
        } catch (e) {
            return {
                success: false,
                error: e
            }
        }
        return {
            success: true,
            error: false
        };
    }
};