import ytdl, { downloadOptions, videoFormat } from '@distube/ytdl-core';
import prism from 'prism-media';
import { Readable } from 'stream';
import YouTube, { Playlist, Video } from 'youtube-sr';
import { MusicData, MusicReturn } from './getMusicDatas';
import { createReadStream, createWriteStream, existsSync, readdirSync, statSync, unlinkSync, WriteStream } from 'fs';
import { join } from 'path';

const MAX_FOLDER_SIZE = 1 * 1024; // 1GB

export default async function (query: string): Promise<MusicReturn> {
    const datas = new MusicData();
    try {
        if (query.includes(`music.youtube.com/watch?v=`)) query = `youtu.be/` + query.slice(query.indexOf(`music.youtube.com/watch?v=`) + `music.youtube.com/watch?v=`.length);
        if (query.includes(`music.youtube.com`)) query = query.replace(`music.youtube.com`, `www.youtube.com`);
        const list = await getPlaylist(query);
        for (const vid of list) {
            if (vid == null) continue;
            const readable = await download(vid.url);
            if (typeof readable === 'string' || readable instanceof String) throw new Error(readable.toString());
            datas.addData({
                title: vid.title || 'Unknown',
                url: vid.url,
                thumbnail: vid.thumbnail ? vid.thumbnail.url || 'Unknown' : 'Unknown',
                readable: readable
            });
        }
        return datas.getSuccessReturn();
    } catch (err) {
        return datas.getFailedReturn(err);
    }
}

async function download(url: string, options: downloadOptions = {}): Promise<Readable | string> {
    try {
        const info = await ytdl.getInfo(url);
        if (checkAndCleanFolder('temp', info.videoDetails.videoId)) {
            return createReadStream(`temp/${info.videoDetails.videoId}.webm`);
        }
        const format = info.formats.find(filter);
        const canDemux = format && info.videoDetails.lengthSeconds;
        if (canDemux) options = { ...options, filter };
        else if (!info.videoDetails.lengthSeconds) options = { ...options, filter: 'audioonly' };
        if (canDemux) {
            const demuxer = new prism.opus.WebmDemuxer();
            const stream = ytdl.downloadFromInfo(info, options);
            let create: WriteStream;
            stream.pipe(create = createWriteStream(`temp/${info.videoDetails.videoId}.webm`) as any);
            await new Promise((resolve) => create.once('finish', () => resolve(null)));
            return createReadStream(`temp/${info.videoDetails.videoId}.webm`);
        } else {
            const bestFormat = nextBestFormat(info.formats, info.videoDetails.isLiveContent);
            if (!bestFormat) throw new Error('No suitable format found');
            const transcoder = new prism.FFmpeg({
                args: [
                    '-reconnect', '1',
                    '-reconnect_streamed', '1',
                    '-reconnect_delay_max', '5',
                    '-i', bestFormat.url,
                    '-analyzeduration', '0',
                    '-loglevel', '0',
                    '-f', 's16le',
                    '-ar', '48000',
                    '-ac', '2',
                ],
                shell: false,
            });
            const opus = new prism.opus.Encoder({ rate: 48000, channels: 2, frameSize: 960 });
            return transcoder.pipe(opus as any);
        }
    } catch (err) {
        return `${err}`;
    }
}

async function getPlaylist(query: string): Promise<Video[]> {
    let list: Video[] = [];
    try {
        new URL(query);
        const res = await YouTube.getVideo(query);
        list = [res];
    } catch (e) {
        if (query.includes(`yout`) && query.includes(`be`) && query.includes(`/`) && query.includes(`list`)) {
            const res = await YouTube.getPlaylist(query);
            const playlist: Playlist = await res.fetch();
            for (const vid of playlist.videos) list.push(vid);
        } else {
            const res = await YouTube.searchOne(query);
            list = [res];
        }
    }
    return list;
}

function filter(format: videoFormat) {
    return format.codecs === 'opus' &&
        format.container === 'webm' &&
        format.audioSampleRate == "48000";
}

function nextBestFormat(formats: videoFormat[], isLive: boolean) {
    let filter: any = (format: videoFormat) => format.audioBitrate;
    if (isLive) filter = (format: videoFormat) => format.audioBitrate && format.isHLS;
    formats = formats
        .filter(filter)
        .sort((a, b) => (b.audioBitrate || 1) - (a.audioBitrate || 1));
    return formats.find(format => !format.bitrate) || formats[0];
}

function checkAndCleanFolder(folderPath: string, fileName: string): boolean {
    const filePath = join(folderPath, fileName);
    let totalSize = 0;
    const files = readdirSync(folderPath);
    files.forEach(file => {
        const fileStats = statSync(join(folderPath, file));
        totalSize += fileStats.size;
    });
    if (totalSize > MAX_FOLDER_SIZE * 1024 * 1024) {
        console.log(`音樂暫存資料夾大於 1GB。開始清理...`);
        files.forEach(file => {
            const filePath = join(folderPath, file);
            unlinkSync(filePath);
            console.log(`Deleted file: ${file}`);
        });
        console.log('清理完畢！');
    }
    if (existsSync(filePath)) return true;
    else return false;
}