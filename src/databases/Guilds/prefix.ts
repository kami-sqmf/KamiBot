import { client } from '../../client/Clinet'
import { deleteField, firestore } from '../Client'
import { returnValue } from '../interfaces/interface'

export async function update(client: client, guildId: string, newPrefix: string): Promise<returnValue> {
    try {
        const guildRef = firestore.collection('Guilds').doc(guildId)
        guildRef.set(
            {
                prefix: newPrefix,
            },
            {
                merge: true,
            }
        )
        const guildInfo = client.getChache("guilds", guildId)
        if (!guildInfo) {
            client.setChache("guilds", guildId, {
                prefix: newPrefix,
            })
        }
        client.setChache("guilds", guildId, {
            ...guildInfo,
            prefix: newPrefix,
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
            prefix: deleteField,
        })
        const guildInfo = client.getChache("guilds", guildId)
        if (guildInfo) {
            delete guildInfo.prefix
            client.setChache("guilds", guildId, guildInfo)
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
