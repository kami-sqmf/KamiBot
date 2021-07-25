const db = require('../db')
module.exports = async () => {
    try {
        const guildRef = db.collection('Global')
        const guild = await guildRef.get();
        const finalFormat = new Object
        guild.forEach(doc => {
            finalFormat[doc.id] = doc.data()
        });
        return {
            success: true,
            error: false,
            data: finalFormat
        };
    } catch (e) {
        return {
            success: false,
            error: e
        }
    }
}