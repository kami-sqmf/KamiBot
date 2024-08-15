import { createAudioPlayer, createAudioResource, demuxProbe, joinVoiceChannel, StreamType } from '@discordjs/voice';
import { ChatInputCommandInteraction, GuildMember, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { client } from '../../Clinet';
import { ExecutePrototype } from '../../interface/Commands';
import ytdl from '@distube/ytdl-core';

let finished = false;

const slash = new SlashCommandBuilder()
  .setName('test')
  .setDescription('測試')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
// .addStringOption(option => option.setName('target').setDescription('要下載的內容（影片關鍵字、Youtube 網址、音檔網址）').setRequired(true));
const execute: ExecutePrototype = async function (client: client, interaction: ChatInputCommandInteraction, language: string): Promise<any> {
  try {
    // const target = interaction.options.getString('target')!;
    if (interaction.member && interaction.member instanceof GuildMember && interaction.member.voice.channel) {
      await interaction.reply({ content: interaction.member.voice.channel?.toString() || "Not in Voice Channel", ephemeral: true })
      const time1 = Date.now();
      const readable = await ytdl("https://www.youtube.com/watch?v=lyuFLU2Zqz0", {
        quality: 'highestaudio',
        filter: 'audioonly',
      }).pipe(require("fs").createWriteStream("video.mp3")).on('finish', () => {
        interaction.followUp({ content: `Time: ${Date.now() - time1}ms`, files: [{ name: 'video.mp3', attachment: "video.mp3" }] });
      });
      // await readable.on('finish', (chunk) => { });
      // const { stream, type } = await demuxProbe(readable);
      // const audio = createAudioResource(await ytdl("https://www.youtube.com/watch?v=lyuFLU2Zqz0", {
      //   quality: 'highestaudio',
      //   filter: 'audioonly',
      // }), { inputType: StreamType.Arbitrary });
      // const connection = joinVoiceChannel({
      //   channelId: interaction.member.voice.channel.id,
      //   guildId: interaction.member.voice.channel.guild.id,
      //   adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
      // });
      // const player = createAudioPlayer();
      // player.play(audio)
      // const subscription = connection.subscribe(player);
      // if (subscription) { setTimeout(() => subscription.unsubscribe(), 5_000); }
      // const response = await getMusicStream(target);
      // if (!response || !response.success || !response.res) {
      //   return interaction.followUp({
      //     content: "RESPONSE ERROR",
      //     files: [
      //       {
      //         name: 'Error.txt',
      //         attachment: response ? Buffer.from(response.error!.toString(), 'utf8') : "Cant get response",
      //       },
      //     ],

      //   })
      // }
      // for (const video of response.res.video) {
      //   if (video.type === 'YouTube') {

      //   }
      // }
    }
  } catch (error) {
    console.log(error)
  }
}

export { execute, slash };
