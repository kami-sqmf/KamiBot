const db = require('../db')
module.exports = {
    update: async (client, guildId, newPrefix) => {
        try {
            const guildRef = db.collection('Guilds').doc(guildId)
            guildRef.set({
                prefix: newPrefix
            }, {
                merge: true
            });
            if (!client.temp.Guilds[guildId]) {
                client.temp.Guilds[guildId] = new Object()
            }
            client.temp.Guilds[guildId].prefix = newPrefix
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
                prefix: db.delete
            });
            if (!client.temp.Guilds[guildId]) {
                client.temp.Guilds[guildId] = new Object()
                client.temp.Guilds[guildId].prefix = './'
            }
            delete client.temp.Guilds[guildId].prefix
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