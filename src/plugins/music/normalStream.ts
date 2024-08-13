import { MusicData, MusicReturn } from "./getMusicDatas";

export default async function (url: string): Promise<MusicReturn> {
    const datas = new MusicData();
    datas.addData({
        title: `${url}`,
        url: `${url}`,
        thumbnail: `${url}`,
        readable: undefined
    });
    return datas.getSuccessReturn();
}