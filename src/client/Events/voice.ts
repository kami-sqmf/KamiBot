import { VoiceConnectionStatus } from '@discordjs/voice'
import { client } from '../Clinet'
import { ExecutePrototype } from '../interface/Events'
import { Events, VoiceChannel, VoiceState } from 'discord.js'
import { VoiceManager } from '../../plugins/voice/voice'

const name = Events.VoiceStateUpdate
const execute: ExecutePrototype = async function (client: client, oldState: VoiceState, newState: VoiceState) {
  if (newState && newState.member && newState.member.voice && newState.member.voice.channel && newState.member.voice.channel instanceof VoiceChannel) {
    // newState.member.voice.disconnect()
    // const voice = new VoiceManager();
    // voice.join(newState.member.voice.channel)
  }

}

export { execute, name }

