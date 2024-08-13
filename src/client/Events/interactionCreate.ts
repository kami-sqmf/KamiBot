import { AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, Events, Interaction } from 'discord.js'
import { client } from '../Clinet'
import emoji from '../Config/emoji'
import { Command } from '../interface/Commands'
import { ExecutePrototype } from '../interface/Events'

const name = Events.InteractionCreate
const execute: ExecutePrototype = async function (client: client, interaction: Interaction) {
  let language = 'zh-TW';
  const guildInfo = client.getChache("guilds", interaction.guild!.id);
  if (guildInfo && guildInfo.language) language = guildInfo.language;
  if (interaction.isChatInputCommand()) chatInputEvent(client, interaction, language);
  else if (interaction.isAutocomplete()) autoCompleteEvent(client, interaction, language);
  else if (interaction.isButton()) buttonEvent(client, interaction, language);
}

const autoCompleteEvent = async (client: client, interaction: AutocompleteInteraction, language: string) => {
  try {
    const cmd: Command = client.Commands.get(interaction.commandName)!;
    if (cmd.autoComplete) cmd.autoComplete(client, interaction);
  } catch (err: any) {
    console.error(err.toString())
  }
}

const buttonEvent = async (client: client, interaction: ButtonInteraction, language: string) => {
  try {
    const cmd: Command = client.Commands.find((cmd) => interaction.customId.startsWith(cmd.slash.name))!;
    if (cmd.buttonInteraction) cmd.buttonInteraction(client, interaction);
  } catch (err: any) {
    console.error(err.toString())
  }
}

const chatInputEvent = async (client: client, interaction: ChatInputCommandInteraction, language: string) => {
  try {
    const cmd: Command = client.Commands.get(interaction.commandName)!;
    cmd.execute(client, interaction, language);
  } catch (err: any) {
    console.error(err.toString())
    interaction.reply({
      content: client.$t(client.Translate.get(language)!!.general.error, { emoji: emoji.general.cross }),
      files: [
        {
          name: 'Error.txt',
          attachment: Buffer.from(err.toString(), 'utf8'),
        },
      ],
    })
  }
}

export { execute, name }

