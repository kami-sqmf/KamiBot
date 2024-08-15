import { ActionRowBuilder, ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { client } from '../../Clinet';
import emoji from '../../Config/emoji';
import { ExecutePrototype } from '../../interface/Commands';

const slash = new SlashCommandBuilder()
  .setName('queue')
  .setDescription('查看待播放清單')
  .setDefaultMemberPermissions(PermissionFlagsBits.Speak)
  .setDMPermission(false);

const execute: ExecutePrototype = async function (client: client, interaction: ChatInputCommandInteraction, language: string): Promise<any> {
  const text = client.Translate.get(language)!.voice.queue
  try {
    if (interaction.guildId === null) return interaction.reply(client.$e(client.$t(text.rp_errorNotGuild, { emoji: emoji.general.uSuck })));
    const queueList = client.voiceManager.getQueue(interaction.guildId!);
    if (queueList.length === 0) return interaction.reply(client.$e(client.$t(text.rp_queueEmpty, { emoji: emoji.general.cross })));
    const fields = queueList.map((queue, index) => {
      return {
        name: `**${index + 1}. [${queue.title}](${queue.url}) **`,
        value: client.$t(text.embed_fields.added_by, { user: `<@${queue.added_by}>` }) + (queue.moved_by ? client.$t(text.embed_fields.moved_by, { user: `<@${queue.moved_by}>` }) : '') + client.$t(text.embed_fields.timestamp, { time: new Date(queue.added_timestamp).toLocaleString() }),
        inline: index % 2 == 0 ? true : false
      }
    });
    interaction.reply({
      embeds: [{
        title: client.$t(text.embed_title),
        description: client.$t(text.embed_description, { count: queueList.length }),
        fields: fields
      }],
    });
  }
  catch (error) {
    console.log(error)
  }
}

export { execute, slash };
