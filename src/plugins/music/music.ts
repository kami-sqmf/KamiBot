import normalStream from './normalStream'
import youtubeStream from './youtubeStream'
import spotifyStream from './spotifyStream'
import { Message } from 'discord.js'
import { Album, Playlist } from 'spotify-it'
import emoji from '../../client/Config/emoji'
import { client } from 'client/Clinet'

export class musicClient {
    private aliases: string[]
    public initSettings(aliases: string[]) {
        this.aliases = aliases
    }
    public async getMusicStream(client: client, message: Message, text: any) {
        const request = getMusicURL(message.content, this.aliases)
        const requestType = detectMusicType(request)
        switch (requestType) {
            case 'YouTube':
                message.channel.send(client.$e(client.$t(text.rp_searching, { emoji: emoji.youtube, request: request })))
                return await youtubeStream(request)
            case 'URL':
                message.channel.send(client.$e(client.$t(text.rp_searching, { emoji: emoji.jing, request: request })))
                return await normalStream(request)
            case 'Spotify':
                message.channel.send(client.$e(client.$t(text.rp_searching, { emoji: emoji.spotify, request: request })))
                return await spotifyStream(request)
        }
    }
}

function getMusicURL(content: string, aliases: Array<string>): string {
    aliases.forEach((alias) => {
        if( content.includes(alias) ){
            return content = content.slice(content.indexOf(alias) + alias.length + 1)
        }
    })
    return content
}

function detectMusicType(request: string): string {
    if (request.includes('open.spotify.com')) {
        return 'Spotify'
    } else if (isMusicURL(request)) {
        return 'URL'
    } else {
        return 'YouTube'
    }
}

function isMusicURL(url: string) {
    try {
        new URL(url)
        if (url.endsWith('.mp3') || url.endsWith('.ogg') || url.endsWith('.wav') || url.endsWith('.webm')) return true
    } catch (e) {
        return false
    }
    return false
}

export interface MusicReturn {
    success: boolean
    res?: MusicRespond
    error?: unknown
}

export interface MusicRespond {
    playlist: boolean
    video: MusicRespondVideo[]
}

export interface MusicRespondVideo {
    type: 'URL' | 'Spotify' | 'YouTube'
    title: string
    url: string
    thumbnail: string
    stream: any
}

export class MusicReturnClass {
    private res: MusicRespond = {
        playlist: false,
        video: []
    }
    private video: MusicRespondVideo[] = []
    public isPlaylist(is: boolean) {
        this.res.playlist = is
    }
    public addVideo(type: 'URL' | 'Spotify' | 'YouTube', title: string, url: string, thumbnail: string, stream: any) {
        this.video.push({
            type: type,
            title: title,
            url: url,
            thumbnail: thumbnail,
            stream: stream,
        })
    }
    public addSpotifyVideos(videos: Album | Playlist, thumbnail: string) {
        videos.tracks.forEach(async (res) => {
            this.addVideo('Spotify', res.title, res.url, thumbnail, await res.stream())
        })
    }
    public getReturn(): MusicReturn {
        this.res['video'] = this.video
        return {
            success: true,
            res: this.res,
        }
    }
}
