/* eslint-disable @remotion/deterministic-randomness */
import fs from "fs-extra";
import cuid from "cuid";
import path from "path";

import { Kokoro } from "./libraries/Kokoro";
import { Remotion } from "./libraries/Remotion";
import { Whisper } from "./libraries/Whisper";
import { FFMpeg } from "./libraries/FFmpeg";
import { PexelsAPI } from "./libraries/Pexels";
import { VIDEOS_DIR_PATH, TEMP_DIR_PATH } from "../config";
import { logger } from "../logger";
import { musicConfig } from "./music";
import { type Music } from "../types/shorts";
import type {
  SceneInput,
  RenderConfig,
  Scene,
  VideoStatus,
  MusicMoodEnum,
  MusicTag,
} from "../types/shorts";

export class ShortCreator {
  private queue: {
    sceneInput: SceneInput[];
    config: RenderConfig;
    id: string;
  }[] = [];
  constructor(
    private remotion: Remotion,
    private kokoro: Kokoro,
    private whisper: Whisper,
    private ffmpeg: FFMpeg,
    private pexelsApi: PexelsAPI,
  ) {}

  // todo create a processing queue for the videos;

  public status(id: string): VideoStatus {
    const videoPath = ShortCreator.getVideoPath(id);
    logger.debug({ videoPath }, "Checking video status");
    if (fs.existsSync(videoPath)) {
      return "ready";
    }
    if (this.queue.find((item) => item.id === id)) {
      return "processing";
    }
    return "failed";
  }

  public addToQueue(sceneInput: SceneInput[], config: RenderConfig): string {
    // todo add mutex lock
    const id = cuid();
    this.queue.push({
      sceneInput,
      config,
      id,
    });
    if (this.queue.length === 1) {
      this.processQueue();
    }
    return id;
  }

  private async processQueue(): Promise<void> {
    // todo semaphore
    if (this.queue.length === 0) {
      return;
    }
    const { sceneInput, config, id } = this.queue[0];
    logger.debug(
      { sceneInput, config, id },
      "Processing video item in the queue",
    );
    try {
      await this.createShort(id, sceneInput, config);
      logger.debug({ id }, "Video created successfully");
    } catch (error) {
      logger.error({ error }, "Error creating video");
    } finally {
      this.queue.shift();
      this.processQueue();
    }
  }

  private async createShort(
    videoId: string,
    inputScenes: SceneInput[],
    config: RenderConfig,
  ): Promise<string> {
    logger.debug(
      {
        inputScenes,
      },
      "Creating short video",
    );
    const scenes: Scene[] = [];
    let totalDuration = 0;
    const excludeVideoIds = [];
    for (const scene of inputScenes) {
      const audio = await this.kokoro.generate(scene.text, "af_heart");
      const { audioLength, audio: audioStream } = audio;

      const tempAudioPath = path.join(TEMP_DIR_PATH, `${cuid()}.wav`);
      await this.ffmpeg.normalizeAudioForWhisper(audioStream, tempAudioPath);
      const captions = await this.whisper.CreateCaption(tempAudioPath);
      fs.removeSync(tempAudioPath);

      const audioDataUri = await this.ffmpeg.createMp3DataUri(audioStream);
      const video = await this.pexelsApi.findVideo(
        scene.searchTerm,
        audioLength,
        excludeVideoIds,
      );
      excludeVideoIds.push(video.id);

      scenes.push({
        captions,
        video: video.url,
        audio: {
          dataUri: audioDataUri,
          duration: audioLength,
        },
      });

      totalDuration += audioLength;
    }
    if (config.paddingBack) {
      totalDuration += config.paddingBack / 1000;
    }

    const selectedMusic = this.findMusic(totalDuration, config.music);
    logger.debug({ selectedMusic }, "Selected music for the video");

    await this.remotion.render(
      {
        music: selectedMusic,
        scenes,
        config: {
          durationMs: totalDuration * 1000,
          paddingBack: config.paddingBack,
        },
      },
      videoId,
    );

    return videoId;
  }

  public static getVideoPath(videoId: string): string {
    return path.join(VIDEOS_DIR_PATH, `${videoId}.mp4`);
  }

  public deleteVideo(videoId: string): void {
    const videoPath = ShortCreator.getVideoPath(videoId);
    fs.removeSync(videoPath);
    logger.debug({ videoId }, "Deleted video file");
  }

  public getVideo(videoId: string): Buffer {
    const videoPath = ShortCreator.getVideoPath(videoId);
    if (!fs.existsSync(videoPath)) {
      throw new Error(`Video ${videoId} not found`);
    }
    return fs.readFileSync(videoPath);
  }

  private findMusic(videoDuration: number, tag?: MusicMoodEnum): Music {
    const musicFiles = musicConfig.filter((music) => {
      if (tag) {
        return music.mood === tag;
      }
      return true;
    });
    return musicFiles[Math.floor(Math.random() * musicFiles.length)];
  }

  public static ListAvailableMusicTags(): MusicTag[] {
    const tags = new Set<MusicTag>();
    musicConfig.forEach((music) => {
      tags.add(music.mood as MusicTag);
    });
    return Array.from(tags.values());
  }
}
