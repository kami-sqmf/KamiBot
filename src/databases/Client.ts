import Secret from '../client/Config/secert'
import { FieldValue, Firestore } from '@google-cloud/firestore'

const firestore = new Firestore({
    projectId: 'kamibot-discord',
    credentials: {
        client_email: Secret.googleCert.client_email,
        private_key: Secret.googleCert.private_key,
    },
})

const deleteField = FieldValue.delete()
export { firestore, deleteField }
require('dotenv').config()
