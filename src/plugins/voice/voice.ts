import { OpusEncoder } from "@discordjs/opus";
import { AudioPlayer, AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, demuxProbe, entersState, getVoiceConnection, joinVoiceChannel, PlayerSubscription, StreamType, VoiceConnectionStatus } from "@discordjs/voice";
import { Guild, GuildBasedChannel, VoiceChannel } from "discord.js";
import { Duplex, Readable } from "stream";
import { VoiceQueue } from "./queue";
import EventEmitter from "events";
import { resolve } from "path";

const encoder = new OpusEncoder(48000, 2);

export class VoiceManager extends EventEmitter {
  public guild: Guild;
  private player: AudioPlayer | null;
  private subscription: PlayerSubscription | undefined;
  constructor(guild: Guild) {
    super();
    this.guild = guild;
    this.player = null;
  }
  public isPlayer = (): boolean => !!this.player;
  public isConnection = (): boolean => !!getVoiceConnection(this.guild.id);
  public join(voiceChannelId: string): boolean {
    this.removeAllListeners();
    const connection = joinVoiceChannel({
      channelId: voiceChannelId,
      guildId: this.guild.id,
      adapterCreator: this.guild.voiceAdapterCreator,
    });
    connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
      try {
        await Promise.race([
          entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
          entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
        ]);
      } catch (error) {
        connection.destroy();
        if (this.player) this.player.stop();
        this.player = null;
      }
    });
    this.player = createAudioPlayer();
    this.subscription = connection.subscribe(this.player);
    this.player.on('error', error => console.error(error));
    this.player.on(AudioPlayerStatus.Idle, () => this.emit('idle'));
    return true;
  }
  public async play(data: VoiceQueue): Promise<boolean> {
    if (!this.player) return false;
    if (data.readable) this.player.play(await this.convertResource(data.readable));
    else return false;
    return true;
  }
  public pause(): void {
    if (this.player) this.player.pause();
  }
  public unpause(): void {
    if (this.player) this.player.unpause();
  }
  public skip(): void {
    this.emit('idle');
  }
  public stop(): void {
    this.emit('stop');
    this.quit()
  }
  public quit(): void {
    const connection = getVoiceConnection(this.guild.id);
    if (connection) connection.destroy();
    if (this.player) this.player.stop();
    this.player = null;
  }
  public async convertResource(readable: Readable): Promise<AudioResource> {
    const { stream, type } = await demuxProbe(readable);
    const resource = createAudioResource(stream, { inputType: type });
    return resource;
  }
}