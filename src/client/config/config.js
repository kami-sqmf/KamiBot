require('dotenv').config()

module.exports.emojis = {
    general: {
        check: `:ballot_box_with_check:`,
        cross: `<:redcross:869202136402128946>`,
        uSuck: `:expressionless: `,
        hourglass: `:hourglass:`,
        loading: `<a:loading:869121472747147306>`,
    },
    troll: `<:Troll:844751964013199391>`,
    youtube: `<:Youtube:855754763287134218>`,
    spotify: `<:Spotify:855754750783127572>`,
    jing: `<:Bluesky:855746761141518337>`,
    leave: `<:KMT_fucked_up:855999545510592513>`
}

module.exports.secret = {
    discordToken: process.env.DISCORD_TOKEN,
    spotifyToken: {
        id: process.env.SPOTIFY_TOKEN,
        secret: process.env.SPOTIFY_TOKEN_SECRET
    },
}