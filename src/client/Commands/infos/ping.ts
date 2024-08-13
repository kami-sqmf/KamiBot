import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { client } from '../../Clinet'
import emoji from '../../Config/emoji'
import { ExecutePrototype } from '../../interface/Commands'

const slash = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('檢測機器人延遲');
const execute: ExecutePrototype = async function (client: client, interaction: ChatInputCommandInteraction, language: string): Promise<any> {
    const text = client.Translate.get(language)!.infos.ping;
    const defer = await interaction.reply({
        ...client.$e(
            client.$t(text.message, { emoji1: emoji.general.hourglass, ping: client.ws.ping, emoji2: emoji.general.Rewrite, rewrite: "..." }),
            {
                timestamp: new Date().toISOString(),
                footer: {
                    text: client.$t(text.footer, { user: interaction.user.username }),
                    iconURL: interaction.user.displayAvatarURL(),
                },
            }
        ),
        fetchReply: true
    });
    return interaction.editReply(
        client.$e(
            client.$t(text.message, { emoji1: emoji.general.hourglass, ping: client.ws.ping, emoji2: emoji.general.Rewrite, rewrite: defer.createdTimestamp - interaction.createdTimestamp }),
            {
                timestamp: new Date().toISOString(),
                footer: {
                    text: client.$t(text.footer, { user: interaction.user.displayName }),
                    iconURL: interaction.user.displayAvatarURL(),
                },
            }
        )
    )
}
export { execute, slash }

