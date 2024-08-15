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
        const guildInfo = client.getChache("guilds", guildId)
        if (!guildInfo) {
            client.setChache("guilds", guildId, {
                language: newLang,
            })
        }
        client.setChache("guilds", guildId, {
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
        const guildInfo = client.getChache("global", guildId)
        if (guildInfo) {
            delete guildInfo.language
            client.setChache("global", guildId, guildInfo)
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
