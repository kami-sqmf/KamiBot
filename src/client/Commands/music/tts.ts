import { AutocompleteInteraction, ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js'
import { getLanguageCode } from '../../../plugins/text_to_speech/get_model'
import ttsToBuffer from '../../../plugins/text_to_speech/tts_to_buffer'
import { client } from '../../Clinet'
import emoji from '../../Config/emoji'
import { AutoCompletePrototype, ExecutePrototype } from '../../interface/Commands'
import { Readable } from 'stream'

const slash = new SlashCommandBuilder()
    .setName('tts')
    .setDescription('Google 小姐唸給你聽')
    .addStringOption(option => option.setName('language').setDescription('語言代碼').setRequired(true).setAutocomplete(true))
    .addStringOption(option => option.setName('content').setDescription('要轉語音的內容').setRequired(true))
    .addBooleanOption(option => option.setName('download').setDescription('是否下載而並非在語音頻道播出？').setRequired(false));
const execute: ExecutePrototype = async function (client: client, interaction: ChatInputCommandInteraction, language: string): Promise<any> {
    const text = client.Translate.get(language)!.voice.tts;
    const lang = interaction.options.getString('language')!;
    const content = interaction.options.getString('content')!;
    const langCodes = await getLanguageCode();
    const isDownload = interaction.options.getBoolean('download') || false;
    if (!langCodes.includes(lang)) {
        return interaction.reply({
            ...client.$e(
                client.$t(text.rp_errorLangCode, {
                    emoji: emoji.general.uSuck,
                })
            ), ephemeral: true
        })
    }
    try {
        await interaction.deferReply();
        const respond = await ttsToBuffer(content, lang);
        if (isDownload || !(interaction.member && interaction.member instanceof GuildMember && interaction.member.voice.channel)) {
            const ttsBuffer = (respond as Uint8Array).buffer;
            interaction.followUp({
                content: `**${content}**`,
                files: [
                    {
                        name: `${content.split('\n')[0]}.mp3`,
                        contentType: 'audio/mp3',
                        attachment: Buffer.from(ttsBuffer),
                    },
                ],
            });
        } else {
            const ttsReadable = respond as Uint8Array;
            const readableStream = new Readable({
                read() {
                    this.push(Buffer.from(ttsReadable));
                    this.push(null); // End the stream
                }
            });
            client.voiceManager.addQueue(interaction.guildId!, interaction.channel!.id, interaction.member.voice.channel.id, interaction.user.id, {
                title: content.split('\n')[0].slice(0, 24),
                url: `TTS - ${lang}`,
                thumbnail: "",
                readable: readableStream,
            });
            interaction.followUp(
                client.$e(client.$t(text.rp_added_queue, { emoji: emoji.general.check, content: content.split('\n')[0] }))
            );
        }
    } catch (error) {
        if (error == 'timeout') {
            return interaction.followUp({ ...client.$e(client.$t(text.rp_errorTimeout, { emoji: emoji.general.cross })), ephemeral: true })
        } else console.log(error)
        return interaction.followUp({ ...client.$e(client.$t(text.rp_errorProcess, { emoji: emoji.general.cross })), ephemeral: true })
    }
}

const autoComplete: AutoCompletePrototype = async function (client: client, interaction: AutocompleteInteraction): Promise<any> {
    try {
        const focusedValue = interaction.options.getFocused();
        const choices = await getLanguageCode();
        const filtered = choices.filter(choice => choice.includes(focusedValue));
        await interaction.respond(
            filtered.slice(0, 25).map(choice => ({ name: client.Translate.get(choice)?.lang.language || choice, value: choice })),
        );
    } catch (error) {
        // console.error(error);
    }
}

export { autoComplete, execute, slash }

