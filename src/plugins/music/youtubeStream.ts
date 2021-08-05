import { MusicReturn, MusicReturnClass } from './music'
import YouTube, { Playlist, Video } from 'youtube-sr'
import ytdl from 'ytdl-core'

export default async function (req: string): Promise<MusicReturn> {
    try {
        const finalReturn = new MusicReturnClass()
        if (req.includes(`&feature=share`)) {
            req = req.replace(`&feature=share`, ``)
        }
        if (req.includes(`music.youtube.com/watch?v=`)) {
            req = `youtu.be/` + req.slice(req.indexOf(`music.youtube.com/watch?v=`) + `music.youtube.com/watch?v=`.length)
        }
        if (req.includes(`music.youtube.com`)) {
            req = req.replace(`music.youtube.com`, `www.youtube.com`)
        }
        if (req.includes(`yout`) && req.includes(`be`) && req.includes(`/`) && req.includes(`list`)) {
            const res = await YouTube.getPlaylist(req)
            finalReturn.isPlaylist(true)
            const list: Playlist = await res.fetch()
            list.videos.forEach(async (vid: Video) => {
                finalReturn.addVideo(
                    'YouTube',
                    vid.title,
                    vid.url,
                    vid.thumbnail.url,
                    await ytdl(vid.url, {
                        quality: 'highestaudio',
                        filter: 'audioonly',
                        dlChunkSize: 0,
                    })
                )
            })
        } else {
            const res = await YouTube.searchOne(req)
            if(!res) throw "Cannot find this video"
            finalReturn.isPlaylist(false)
            finalReturn.addVideo("YouTube", res.title, res.url, res.thumbnail.url, await ytdl(res.url, {
                quality: 'highestaudio',
                filter: 'audioonly',
                dlChunkSize: 0,
            }))
        }
        return finalReturn.getReturn()
    } catch (err) {
        return {
            success: false,
            error: err,
        }
    }
}
