const ytdl = require('ytdl-core');
const YouTube = require("youtube-sr").default;

module.exports = async function (req) {
    try {
        if (req.includes(`&feature=share`)) {
            req = req.replace(`&feature=share`, ``)
        }
        if (req.includes(`music.youtube.com/watch?v=`)) {
            req = `youtu.be/` + req.slice(req.indexOf(`music.youtube.com/watch?v=`) + `music.youtube.com/watch?v=`.length)
        }
        if (req.includes(`yout`) && req.includes(`be`) && req.includes(`/`) && req.includes(`list`)) {
            let res = await YouTube.getPlaylist(req)
            res = await res.fetch()
            let videos = []
            res.videos.forEach(res => {
                videos.push({
                    type: "youtube",
                    title: res.title,
                    url: res.url,
                    thumbnail: res.thumbnail.url,
                    stream: ytdl(res.url, {
                        quality: 'highestaudio',
                        filter: 'audioonly',
                        dlChunkSize: 0
                    })
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
            if (req.includes(`music.youtube.com`)) {
                req = req.replace(`music.youtube.com`, `www.youtube.com`)
            }
            const res = await YouTube.searchOne(req)
            return {
                success: true,
                
                res: {
                    playlist: false,
                    video: [{
                        type: "youtube",
                        title: res.title,
                        url: res.url,
                        thumbnail: res.thumbnail.url,
                        stream: ytdl(res.url, {
                            quality: 'highestaudio',
                            filter: 'audioonly',
                            dlChunkSize: 0
                        })
                    }]
                }
            }
        }
    } catch (error) {
        return {
            success: false,
            type: "youtube",
            error: error
        }
    }
}