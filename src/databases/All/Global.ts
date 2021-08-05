import { firestore } from '../Client'
import { returnValue } from '../interfaces/interface'
export default async () => {
    try {
        const guildRef = firestore.collection('Global')
        const guild = await guildRef.get()
        const finalFormat: Map<string, any> = new Map<string, any>()
        guild.forEach((doc) => {
            finalFormat.set(doc.id, doc.data())
        })
        const returnValue: returnValue = {
            success: true,
            data: finalFormat,
        }
        return returnValue
    } catch (e) {
        const returnValue: returnValue = {
            success: false,
            error: e,
        }
        return returnValue
    }
}
