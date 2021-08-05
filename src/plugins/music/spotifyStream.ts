import urlMetadata from 'url-metadata'
import { MusicRespondVideo, MusicReturn, MusicReturnClass } from './music'
import { Spotify } from 'spotify-it'
import secret from '../../client/Config/secert'
const spotify = new Spotify({
    id: secret.spotifyToken.id,
    secret: secret.spotifyToken.secret,
    defaultLimit: 100
})

export default async function (req: string): Promise<MusicReturn> {
    try {
        const thumbnail = (await urlMetadata(req)).image
        const finalReturn = new MusicReturnClass()
        if(req.includes('track')){
            const res = await spotify.getTrack(req)
            finalReturn.isPlaylist(false)
            finalReturn.addVideo("Spotify", res.title, res.url, thumbnail, await res.stream())
            return finalReturn.getReturn()
        } else if (req.includes('playlist')) {
            const res = await spotify.getPlaylist(req)
            finalReturn.isPlaylist(true)
            finalReturn.addSpotifyVideos(res, thumbnail)
            return finalReturn.getReturn()
        } else if (req.includes('album')) {
            const res = await spotify.getAlbum(req)
            finalReturn.isPlaylist(true)
            finalReturn.addSpotifyVideos(res, thumbnail)
            return finalReturn.getReturn()
        }
        return {
            success: false,
            error: "Cannot Find This URL Type"
        }
    } catch (err) {
        return {
            success: false,
            error: err,
        }
    }
}