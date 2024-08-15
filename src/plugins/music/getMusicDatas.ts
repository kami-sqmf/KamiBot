import { Readable } from "stream";
import normalStream from "./normalStream";
import youtubeStream from "./youtubeStream";

export async function getMusicDatas(target: string) {
    const requestType = detectMusicType(target);
    switch (requestType) {
        case 'YouTube':
            return await youtubeStream(target);
        case 'URL':
            return await normalStream(target);
    }
}

function detectMusicType(request: string): string {
    if (isMusicURL(request)) return 'URL';
    else return 'YouTube';
}

function isMusicURL(url: string) {
    try {
        new URL(url);
        if (url.endsWith('.mp3') || url.endsWith('.ogg') || url.endsWith('.wav') || url.endsWith('.webm')) return true;
    } catch (e) { return false; }
    return false;
}

export class MusicData {
    public videos: MusicInfo[];
    constructor() { this.videos = []; }
    public addData({ title, url, thumbnail, readable }: MusicInfo) {
        this.videos.push({
            title: title,
            url: url,
            thumbnail: thumbnail,
            readable: readable || undefined,
        })
    }
    public getSuccessReturn(): MusicReturnSuccess {
        return {
            success: true,
            datas: this.videos,
        }
    }
    public getFailedReturn(error: unknown): MusicReturnError {
        return {
            success: false,
            error: error
        }
    }
}

export type MusicReturn = MusicReturnSuccess | MusicReturnError;

export interface MusicReturnSuccess {
    success: true;
    datas: MusicInfo[];
}

export interface MusicReturnError {
    success: false;
    error: unknown;
}

export interface MusicInfo {
    title: string;
    url: string;
    thumbnail: string;
    readable?: Readable;
}