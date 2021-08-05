import { client } from '../../client/Clinet'
import { deleteField, firestore } from '../Client'
import { returnValue } from '../interfaces/interface'

export async function update(client: client, guildId: string, newLang: string): Promise<returnValue> {
    try {
        const guildRef = firestore.collection('Guilds').doc(guildId)
        guildRef.set(
            {
                language: newLang,
            },
            {
                merge: true,
            }
        )
        const guildInfo = client.temp.guilds.get(guildId)
        if (!guildInfo) {
            client.temp.guilds.set(guildId, {
                language: newLang,
            })
        }
        client.temp.guilds.set(guildId, {
            ...guildInfo,
            language: newLang,
        })
    } catch (error) {
        return {
            success: false,
            error: error,
        }
    }
    return {
        success: true,
        error: false,
    }
}

export async function restore(client: client, guildId: string): Promise<returnValue> {
    try {
        const guildRef = firestore.collection('Guilds').doc(guildId)
        guildRef.update({
            language: deleteField,
        })
        const guildInfo = client.temp.guilds.get(guildId)
        if (guildInfo) {
            delete guildInfo.language
            client.temp.guilds.set(guildId, guildInfo)
        }
    } catch (error) {
        return {
            success: false,
            error: error,
        }
    }
    return {
        success: true,
        error: false,
    }
}
