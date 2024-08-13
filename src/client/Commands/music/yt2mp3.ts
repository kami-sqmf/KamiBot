import { ChatInputCommandInteraction, GuildMember, InteractionReplyOptions, Message, SlashCommandBuilder } from 'discord.js';
import { getMusicDatas, MusicInfo } from '../../../plugins/music/getMusicDatas';
import { client } from '../../Clinet';
import emoji from '../../Config/emoji';
import { ExecutePrototype } from '../../interface/Commands';

let finished = false;

const slash = new SlashCommandBuilder()
    .setName('yt2mp3')
    .setDescription('下載（或播放） YouTube 影片 (MP3)')
    .addStringOption(option => option.setName('target').setDescription('要下載的內容（影片關鍵字、Youtube 網址、音檔網址）').setRequired(true))
    .addBooleanOption(option => option.setName('download').setDescription('是否下載而並非在語音頻道播出？').setRequired(false));

const execute: ExecutePrototype = async function (client: client, interaction: ChatInputCommandInteraction, language: string): Promise<any> {
    const text = client.Translate.get(language)!.voice.download
    const target = interaction.options.getString('target')!;
    const isDownload = interaction.options.getBoolean('download') || false;
    if (!interaction.channel) return await interaction.reply({ content: client.$t(text.rp_errorProcess, { emoji: emoji.general.cross }) });
    else await interaction.deferReply();
    const message = await interaction.channel.send(client.$e(client.$t(text.rp_searching, { emoji: emoji.youtube, request: target })));
    const response = await getMusicDatas(target);
    if (!response || !response.success || 'error' in response) {
        if (message.deletable) await message.delete();
        return interaction.followUp({
            content: client.$t(text.rp_errorProcess, { emoji: emoji.general.cross }),
            files: [
                {
                    name: 'Error.txt',
                    attachment: response ? Buffer.from(response.error!.toString(), 'utf8') : "錯誤： 無法取得錯誤",
                },
            ],
        })
    }
    if (isDownload || !(interaction.member && interaction.member instanceof GuildMember && interaction.member.voice.channel)) {
        try {
            for (const video of response.datas) {
                finished = false;
                countdown(client, message, text, video, 30000);
                await promiseTimeout(sendMusicAttach(interaction, video), 30000);
                finished = true;
            }
        } catch (error) {
            if (message.deletable) await message.delete();
            if (error == 'Timeout') return interaction.followUp(client.$e(client.$t(text.rp_errorTimeout, { emoji: emoji.general.cross })))
            return interaction.followUp({
                content: client.$t(text.rp_errorProcess, { emoji: emoji.general.cross }),
                files: [
                    {
                        name: 'Error.txt',
                        attachment: Buffer.from(error!.toString(), 'utf8'),
                    },
                ],
            });
        }
    } else {
        for (const video of response.datas) {
            client.voiceManager.addQueue(interaction.guildId!, interaction.channel.id, interaction.member.voice.channel.id, interaction.user.id, video);
            if (interaction.deferred || interaction.replied) {
                if (message.deletable) await message.delete();
                await interaction.followUp(
                    client.$e(client.$t(text.rp_added_queue, { emoji: emoji.general.check, file: video.title, url: video.url }))
                );
            }
        }
    }
}

export { execute, slash };

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendMusicAttach(interaction: ChatInputCommandInteraction, video: MusicInfo) {
    return new Promise(async (resolve, reject) => {
        try {
            let payload: InteractionReplyOptions;
            if (video.readable) {
                payload = {
                    embeds: [
                        {
                            title: video.title,
                            url: video.url,
                            image: { url: video.thumbnail }
                        }
                    ],
                    files: [
                        {
                            name: `${video.title}.mp3`,
                            attachment: video.readable,
                        }
                    ]
                }
            } else {
                payload = {
                    files: [video.url]
                }
            }
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(payload);
            } else await interaction.reply(payload);
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

async function countdown(client: client, message: Message, text: any, video: MusicInfo, countdown: number): Promise<any> {
    try {
        for (let i = 1; i <= Math.round(countdown / 1000); i++) {
            if (finished === true) {
                if (message.deletable) await message.delete();
                throw 'Finished';
            } else {
                if (message.editable && finished == false) message.edit(client.$e(
                    client.$t(text.rp_downloading, {
                        emoji: emoji.general.loading,
                        file: video.title,
                        url: video.url,
                        time: `***\`${i} / ${Math.round(countdown / 1000)}s\`***`
                    }))
                )
                await sleep(1000);
            }
        }
    } catch (error) {
        console.log(error)
    }
}

async function promiseTimeout(promise: Promise<any>, delay: number): Promise<any> {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(function () {
            reject('Timeout')
        }, delay)
    })
    return await Promise.race([timeout, promise])
}
