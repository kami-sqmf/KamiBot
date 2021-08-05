export interface Secret {
    discordToken: string | undefined
    spotifyToken: {
        id: string | undefined
        secret: string | undefined
    }
    googleCert: {
        client_email: string | undefined
        private_key: string | undefined
    }
}
