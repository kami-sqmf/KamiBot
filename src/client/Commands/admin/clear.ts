import { ChatInputCommandInteraction, DMChannel, NewsChannel, PermissionFlagsBits, SlashCommandBuilder, TextChannel, ThreadChannel } from 'discord.js';
import { client } from '../../Clinet';
import emoji from '../../Config/emoji';
import { ExecutePrototype } from '../../interface/Commands';

const slash = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('移除訊息（至多 14 天）')
    .addNumberOption(option => option.setName('quantity').setDescription('數量').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false);
const execute: ExecutePrototype = async function (client: client, interaction: ChatInputCommandInteraction, language: string): Promise<any> {
    const text = client.Translate.get(language)!.admin.clear;
    let quantity = interaction.options.getNumber('quantity');
    if (!quantity || !Number.isInteger(quantity)) {
        return interaction.reply({
            ...client.$e(
                client.$t(text.rp_errorNumInput, {
                    emoji: emoji.general.uSuck,
                })
            ), ephemeral: true
        })
    }
    if (!interaction.channel || !(interaction.channel instanceof (TextChannel || ThreadChannel))) {
        return interaction.reply({
            ...client.$e(
                client.$t(text.rp_errorChannel, {
                    emoji: emoji.general.uSuck,
                })
            ), ephemeral: true
        })
    }
    const reply = await interaction.reply({
        ...client.$e(
            client.$t(text.rp_startClearing, {
                emoji: emoji.general.hourglass,
                lines: quantity,
            })
        ),
        ephemeral: true,
        fetchReply: true
    });
    const initial_qty = quantity;
    try {
        while (quantity > 100) {
            await interaction.channel.bulkDelete(99);
            quantity -= 99;
        }
        if (quantity > 0) await interaction.channel.bulkDelete(quantity);
        interaction.editReply(client.$e(
            client.$t(text.rp_successClearing, {
                emoji: emoji.general.check,
                lines: quantity,
            })
        ));
    } catch (e) {
        console.log(e);
        interaction.editReply(client.$e(
            client.$t(text.rp_successClearing, {
                emoji: emoji.general.check,
                lines: (initial_qty - quantity).toString()
            })
        ));
    }
}

export { execute, slash };

