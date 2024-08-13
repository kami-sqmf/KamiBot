import { ActionRowBuilder, AnyComponentBuilder, APIActionRowComponent, APIMessageActionRowComponent, APITextInputComponent, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Client, EmbedBuilder, InteractionCollector, InteractionType, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { client } from '../../Clinet';
import { ExecutePrototype } from '../../interface/Commands';

const slash = new SlashCommandBuilder()
  .setName('calculator')
  .setDescription('計算機')
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages);

const execute: ExecutePrototype = async function (client: client, interaction: ChatInputCommandInteraction, language: string): Promise<any> {
  const text = client.Translate.get(language)!.utils.calculate
  const interfaceUI = makeInterface([
    ['C', '(', ')', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['%', '0', '.', '='],
  ])

  const form = await interaction.reply({
    embeds: [makeCalcResult('0', text)],
    components: interfaceUI.map(builder => builder.toJSON()) as APIActionRowComponent<APIMessageActionRowComponent>[],
    fetchReply: true,
  })
  const collector = new InteractionCollector(client as Client<true>, {
    idle: 30000,
    dispose: true,
    filter: (btn: any) => btn.customId.startsWith(`KamiCalc.`),
    channel: (await interaction.fetchReply()).channel,
    interactionType: InteractionType.MessageComponent,
  })
  let history: Array<string> = new Array()
  collector.on('collect', (message: any) => {
    const originalValue = message.message.embeds[0].description.replace(/`/g, '');
    const selected = message.customId.slice(9);
    let respond: string = '';
    if (selected == 'C') {
      respond = '0';
    } else if (selected == '=') {
      respond = originalValue.replace(/×/g, '*');
      respond = respond.replace(/÷/g, '/');
      respond = evalForRaw(respond, text);
      history.push(`${originalValue}=${respond}`);
      return message.update({
        embeds: [makeCalcResult(respond, text, originalValue)],
      });
    } else {
      let title = message.message.embeds[0].title
      if (selected == '+' || selected == '-' || selected == '×' || selected == '÷') title = '';
      if (title || originalValue == 0) respond = selected;
      else respond = originalValue + selected;
    }
    message.update({
      embeds: [makeCalcResult(respond, text)],
    });
  })
  collector.on('end', () => {
    const disabledInterface = makeInterface(
      [
        ['C', '(', ')', '÷'],
        ['7', '8', '9', '×'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['%', '0', '.', '='],
      ],
      true
    )
    form.edit({
      embeds: [makeExpired(history, text)],
      components: disabledInterface.map(builder => builder.toJSON()) as APIActionRowComponent<APIMessageActionRowComponent>[],
    })
  })
  return
}
export { execute, slash };

function makeInterface(raw: Array<Array<string>>, expired?: boolean): ActionRowBuilder[] {
  const Wrapper: ActionRowBuilder[] = []
  raw.forEach((rowContainer) => {
    const container: ActionRowBuilder = new ActionRowBuilder()
    rowContainer.forEach((node) => {
      const button: ButtonBuilder = new ButtonBuilder().setCustomId(`KamiCalc.${node}`).setLabel(node)
      if (expired) button.setDisabled(true)
      if (node == 'C') button.setStyle(ButtonStyle.Danger)
      else if (node == '(' || node == ')' || node == '%' || node == '÷' || node == '×' || node == '-' || node == '+' || node == '.') button.setStyle(ButtonStyle.Success)
      else if (node == '=') button.setStyle(ButtonStyle.Primary)
      else button.setStyle(ButtonStyle.Secondary)
      container.addComponents(button)
    })
    Wrapper.push(container)
  })
  return Wrapper
}

function makeCalcResult(content: string, text: any, title?: string) {
  const embed: EmbedBuilder = new EmbedBuilder()
    .setAuthor({ name: text.activateAuthor })
    .setDescription(`\`\`\`${content}\`\`\``)
    .setColor('#2A9D8F');
  if (title) embed.setTitle(title);
  return embed.data;
}

function makeExpired(history: Array<string>, text: any) {
  const embed = new EmbedBuilder().setAuthor({ name: text.expiredAuthor }).setColor('#236b62');
  history.forEach((history) => {
    const results = history.split('=');
    embed.addFields({ name: results[0], value: results[1] });
    embed.setDescription(text.calcHistory);
  })
  return embed;
}

function evalForRaw(raw: string, text: any) {
  try {
    if(raw === "9*9") return "可以逛很久";
    let result = eval(raw);
    if (result == 8964) return "哎呦你媽习近平万岁";
    return result;
  } catch (error) {
    return text.rp_calcError;
  }
}
