const {
    Spotify
} = require('spotify-it')
const urlMetadata = require('url-metadata')
const secret = require("../../config/config").secret
const spotify = new Spotify({
    id: secret.spotifyToken.id,
    secret: secret.spotifyToken.secret,
    defaultLimit: 100
})
module.exports = async function (req) {
    try {
        const thumbnail = (await urlMetadata(req)).image
        if (req.includes('track')) {
            const res = await spotify.getTrack(req)
            return {
                success: true,
                res: {
                    playlist: false,
                    video: [{
                        type: "spotify",
                        title: res.title,
                        url: res.url,
                        thumbnail: thumbnail,
                        stream: res.stream()
                    }]
                }
            }
        } else if (req.includes('playlist')) {
            const res = await spotify.getTrack(req)
            let videos = []
            res.tracks.forEach(res => {
                videos.push({
                    type: "spotify",
                    title: res.title,
                    url: res.url,
                    thumbnail: thumbnail,
                    stream: res.stream()
                })
            });
            return {
                success: true,
                res: {
                    playlist: true,
                    video: videos
                }
            }
        } else if (req.includes('album')) {
            const res = await spotify.getAlbum(req)
            let videos = []
            res.tracks.forEach(res => {
                videos.push({
                    type: "spotify",
                    title: res.title,
                    url: res.url,
                    thumbnail: thumbnail,
                    stream: res.stream()
                })
            })
            return {
                success: true,
                res: {
                    playlist: true,
                    video: videos
                }
            }
        } else {
            return {
                success: false,
                type: "spotify",
                error: error
            }
        }
    } catch (error) {
        return {
            success: false,
            type: "spotify",
            error: error
        }
    }
}