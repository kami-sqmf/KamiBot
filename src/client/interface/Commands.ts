import { AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { client } from '../Clinet'

export interface ExecutePrototype {
    (client: client, interaction: ChatInputCommandInteraction, language: string): Promise<void>
}

export interface AutoCompletePrototype {
    (client: client, interaction: AutocompleteInteraction): Promise<void>
}

export interface ButtonInteractionPrototype {
    (client: client, interaction: ButtonInteraction): Promise<void>
}

export interface Command {
    slash: SlashCommandBuilder
    execute: ExecutePrototype
    autoComplete?: AutoCompletePrototype
    buttonInteraction?: ButtonInteractionPrototype
}
