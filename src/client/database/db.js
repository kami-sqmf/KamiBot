const {Firestore} = require('@google-cloud/firestore');
require('dotenv').config()
const firestore = new Firestore({
    projectId: "kamibot-discord",
    credentials: {
        client_email: process.env.GOOGLE_APP_EMAIL,
        private_key: process.env.GOOGLE_APP_PRIVATE_KEY
    }
});

module.exports = firestore
module.exports.delete = Firestore.FieldValue.delete()