import { MusicReturn } from "./music";

export default async function (req: string): Promise<MusicReturn> {
    return {
        success: true,
        res: {
            playlist: false,
            video: [{
                type: "URL",
                title: `${req}`,
                url: `${req}`,
                thumbnail: `${req}`,
                stream: `${req}`
            }]
        }
    }
}