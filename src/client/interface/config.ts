export interface Secret {
    discordToken: string | undefined
    googleCert: {
        client_email: string | undefined
        private_key: string | undefined
    }
}
