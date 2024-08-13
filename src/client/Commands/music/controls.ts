import { ActionRowBuilder, APIActionRowComponent, APIMessageActionRowComponent, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { client } from '../../Clinet';
import emoji from '../../Config/emoji';
import { ButtonInteractionPrototype, ExecutePrototype } from '../../interface/Commands';

const name = 'controls';
const slash = new SlashCommandBuilder()
  .setName(name)
  .setDescription('音樂控制面板')
  .setDefaultMemberPermissions(PermissionFlagsBits.Speak)
  .setDMPermission(false);

const execute: ExecutePrototype = async function (client: client, interaction: ChatInputCommandInteraction, language: string): Promise<any> {
  const text = client.Translate.get(language)!.voice.controls;
  const actions = new ActionRowBuilder()
    .addComponents(new ButtonBuilder().setCustomId(`${name}-play`).setStyle(ButtonStyle.Primary).setLabel(client.$t(text.component_play, { emoji: emoji.controls.play })))
    .addComponents(new ButtonBuilder().setCustomId(`${name}-pause`).setStyle(ButtonStyle.Primary).setLabel(client.$t(text.component_pause, { emoji: emoji.controls.pause })))
    .addComponents(new ButtonBuilder().setCustomId(`${name}-skip`).setStyle(ButtonStyle.Primary).setLabel(client.$t(text.component_skip, { emoji: emoji.controls.skip })))
    .addComponents(new ButtonBuilder().setCustomId(`${name}-stop`).setStyle(ButtonStyle.Danger).setLabel(client.$t(text.component_stop, { emoji: emoji.controls.stop })))
  try {
    interaction.reply({
      content: client.$t(text.embed_title, { emoji: emoji.controls.music }),
      components: [actions.toJSON()] as APIActionRowComponent<APIMessageActionRowComponent>[],
    });
  }
  catch (error) {
    console.log(error)
  }
}

const buttonInteraction: ButtonInteractionPrototype = async function (client: client, interaction: ButtonInteraction): Promise<any> {
  const voice = client.voiceManager.VoiceManager.get(interaction.guildId!);
  const action = interaction.customId.split('-')[1];
  switch (action) {
    case 'play':
      if (voice && voice.isPlayer()) {
        voice.unpause();
        interaction.reply({ content: "繼續播放", ephemeral: true });
      }
      else interaction.reply({ content: "目前無播放項目", ephemeral: true });
      break;
    case 'pause':
      if (voice && voice.isPlayer()) {
        voice.pause();
        interaction.reply({ content: "已暫停", ephemeral: true });;
      }
      else interaction.reply({ content: "目前無播放項目", ephemeral: true });
      break;
    case 'skip':
      if (voice && voice.isPlayer()) {
        voice.skip();
        interaction.reply({ content: "已跳過", ephemeral: true });
      }
      else interaction.reply({ content: "目前無播放項目", ephemeral: true });
      break;
    case 'stop':
      if (voice && voice.isPlayer()) {
        voice.stop();
        interaction.reply({ content: "斷開連接", ephemeral: true });
      }
      else interaction.reply({ content: "目前無播放項目", ephemeral: true });
      break;
  }
}

export { execute, slash, buttonInteraction };
