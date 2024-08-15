import { GuildManager, TextChannel, VoiceChannel } from "discord.js";
import { Readable } from "stream";
import { MusicInfo } from "../music/getMusicDatas";
import { VoiceManager } from "./voice";

export class QueueManager {
  public VoiceManager: Map<string, VoiceManager>;
  private GuildManager: GuildManager;
  private GuildsPlaylists: Map<string, VoiceQueue[]>;
  constructor(GuildManager: GuildManager) {
    this.GuildManager = GuildManager;
    this.VoiceManager = new Map<string, VoiceManager>();
    this.GuildsPlaylists = new Map<string, VoiceQueue[]>()
  }
  public getQueue(guild_id: string): VoiceQueue[] {
    return this.GuildsPlaylists.get(guild_id) || [];
  }
  public async addQueue(guild_id: string, text_channel: string, voice_channel: string, added_by: string, info: MusicInfo): Promise<boolean> {
    let playlist: VoiceQueue[] = [];
    if (this.GuildsPlaylists.has(guild_id)) {
      playlist = this.GuildsPlaylists.get(guild_id)!;
    }
    const guild = await this.GuildManager.fetch(guild_id);
    playlist.push({
      queue_id: Math.random().toString(36).slice(2, 9),
      text_channel: guild.channels.cache.get(text_channel)! as TextChannel,
      voice_channel: guild.channels.cache.get(voice_channel)! as VoiceChannel,
      added_timestamp: Date.now(),
      added_by: added_by,
      moved_by: null,
      title: info.title,
      url: info.url,
      thumbnail: info.thumbnail,
      readable: info.readable || undefined,
      is_playing: false,
    })
    this.GuildsPlaylists.set(guild_id, playlist);
    this.triggerVoiceManager(guild_id);
    return true;
  }
  public deleteQueue(guild_id: string, queue_id: string): boolean {
    let playlist: VoiceQueue[] = [];
    if (!this.GuildsPlaylists.has(guild_id)) return false;
    playlist = this.GuildsPlaylists.get(guild_id)!;
    const index = playlist.findIndex((q) => q.queue_id === queue_id);
    if (index === -1) return false;
    playlist.splice(index, 1);
    return true;
  }
  public clearQueue(guild_id: string): boolean {
    if (!this.GuildsPlaylists.has(guild_id)) return false;
    this.GuildsPlaylists.set(guild_id, []);
    return true;
  }
  public moveQueue(guild_id: string, queue_id: string, movement: "up" | "down" | "first" | "last"): boolean {
    // let playlist: VoiceQueue[] = [];
    // if (!this.GuildsPlaylists.has(guild_id)) return false;
    // playlist = this.GuildsPlaylists.get(guild_id)!;
    // const index = playlist.findIndex((q) => q.queue_id === queue_id);
    // if (index === -1) return false;
    // const first = playlist.splice(index, 1)[0];
    // playlist.unshift(first);
    return true;
  }
  private existsVoiceManager(guild_id: string): boolean {
    return this.VoiceManager.has(guild_id);
  }
  public async createVoiceManager(guild_id: string): Promise<void> {
    if (this.existsVoiceManager(guild_id)) this.destroyVoiceManager(guild_id);
    const voice = await new VoiceManager(await this.GuildManager.fetch(guild_id));
    this.VoiceManager.set(guild_id, voice);
  }
  private getVoiceManager(guild_id: string): VoiceManager | null {
    if (!this.existsVoiceManager(guild_id)) return null;
    else return this.VoiceManager.get(guild_id)!;
  }
  private destroyVoiceManager(guild_id: string): void {
    if (this.existsVoiceManager(guild_id)) {
      const voice = this.getVoiceManager(guild_id)!;
      voice.quit();
      this.VoiceManager.delete(guild_id);
    }
  }
  private async triggerVoiceManager(guildId: string) {
    const queue = this.getQueue(guildId);
    if (!this.existsVoiceManager(guildId)) await this.createVoiceManager(guildId);
    if (queue.length <= 0) return this.destroyVoiceManager(guildId);
    const voice = this.getVoiceManager(guildId)!;
    const current = queue[0];
    if (current.is_playing) return;
    if (!voice.isConnection()) voice.join(current.voice_channel.id);
    current.is_playing = true;
    voice.play(current);
    current.text_channel.send(`正在播放: **[${current.title}](${current.url})**`);
    voice.removeAllListeners();
    voice.on('idle', () => {
      this.deleteQueue(guildId, current.queue_id);
      this.triggerVoiceManager(guildId);
    });
    voice.on('stop', () => {
      this.clearQueue(guildId);
    });
  }
}

export interface VoiceQueue {
  queue_id: string;
  text_channel: TextChannel;
  voice_channel: VoiceChannel;
  added_timestamp: number;
  added_by: string;
  moved_by: string | null;
  title: string;
  url: string;
  thumbnail: string;
  readable: Readable | undefined;
  is_playing: boolean;
}