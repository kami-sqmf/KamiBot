import { APIEmbedField, AutocompleteInteraction, ChatInputCommandInteraction, EmbedData, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'
import { update } from '../../../databases/Guilds/language'
import { client } from '../../Clinet'
import emoji from '../../Config/emoji'
import { AutoCompletePrototype, ExecutePrototype } from '../../interface/Commands'

const slash = new SlashCommandBuilder()
    .setName('language')
    .setDescription('機器人顯示語言 (per伺服器)')
    .addSubcommand(subcommand =>
        subcommand
            .setName('current')
            .setDescription('查看目前機器人在伺服器的顯示語言')
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('set')
            .setDescription('設定目前機器人在伺服器的顯示語言')
            .addStringOption(option => option.setName('language').setDescription('語言代碼').setRequired(true).setAutocomplete(true))
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false);

const execute: ExecutePrototype = async function (client: client, interaction: ChatInputCommandInteraction, language: string): Promise<any> {
    const text = client.Translate.get(language)!.admin.language;
    const action = interaction.options.getSubcommand();
    if (!interaction.guild) {
        return interaction.reply({
            ...client.$e(
                client.$t(text.rp_errorNotGuild, {
                    emoji: emoji.general.uSuck,
                    lang: `${client.Translate.get(language)!.lang.language} ${language}`,
                })
            ), ephemeral: true
        })
    }
    const guildId = interaction.guild.id;
    if (action == 'current') {
        return interaction.reply(
            client.$e(
                client.$t(text.rp_sayLang, {
                    lang: `${client.Translate.get(language)!.lang.language} ${language}`,
                })
            )
        )
    }
    else if (action == 'set') {
        const lang = interaction.options.getString('language')!;
        let langs = [...client.Translate.keys()]
        if (!langs.includes(lang)) {
            await interaction.reply(
                client.$e(
                    client.$t(text.rp_errorLangCode, {
                        emoji: emoji.general.cross,
                    })
                )
            )
            return interaction.followUp(client.$e('', makeSupportedLangEmbed(client, text, langs)))
        }
        const res = await update(client, guildId, lang)
        if (res.error) {
            return interaction.reply({
                ...client.$e(
                    client.$t(text.rp_errorDB, {
                        emoji: emoji.general.cross,
                    })
                ), ephemeral: true
            })
        }
        return interaction.reply(
            client.$e(
                client.$t(text.rp_updatedLang, {
                    emoji: emoji.general.check,
                    lang: `${client.Translate.get(lang)!.lang.language} ${lang}`,
                })
            )
        )
    }
}
function makeSupportedLangEmbed(client: client, text: any, langs: Array<string>): EmbedData {
    const format = {
        title: text.embed_supportedLang,
        color: 6939554,
        fields: [] as APIEmbedField[],
    }
    langs.forEach((lang) => {
        format.fields.push({
            name: `${client.Translate.get(lang)!.lang.language}`,
            value: `${lang}`,
        })
    })
    return format
}

const autoComplete: AutoCompletePrototype = async function (client: client, interaction: AutocompleteInteraction): Promise<any> {
    try {
        const focusedValue = interaction.options.getFocused();
        const choices = [...client.Translate.keys()];
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: client.Translate.get(choice)!.lang.language, value: choice })),
        );
    } catch (error) {
        console.error(error);
    }
}
export { autoComplete, execute, slash }
