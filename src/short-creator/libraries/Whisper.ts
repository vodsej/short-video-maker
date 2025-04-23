import {
  downloadWhisperModel,
  installWhisperCpp,
  transcribe,
} from "@remotion/install-whisper-cpp";
import fs from "fs-extra";
import path from "path";

import { Config } from "../../config";
import type { Caption } from "../../types/shorts";
import { logger } from "../../logger";

export class Whisper {
  constructor(private config: Config) {}

  static async init(config: Config): Promise<Whisper> {
    if (!config.runningInDocker) {
      await installWhisperCpp({
        to: config.whisperInstallPath,
        version: "1.5.5",
        printOutput: config.whisperVerbose,
      });

      await downloadWhisperModel({
        model: "medium",
        folder: path.join(config.whisperInstallPath, "models"),
        printOutput: config.whisperVerbose,
      });
    }

    return new Whisper(config);
  }

  // todo shall we extract it to a Caption class?
  async CreateCaption(audioPath: string): Promise<Caption[]> {
    logger.debug("Starting to transcribe audio");
    const { transcription } = await transcribe({
      model: "medium", // possible options: "tiny", "tiny.en", "base", "base.en", "small", "small.en", "medium", "medium.en", "large-v1", "large-v2", "large-v3", "large-v3-turbo"
      whisperPath: this.config.whisperInstallPath,
      modelFolder: path.join(this.config.whisperInstallPath, "models"),
      whisperCppVersion: "1.5.5",
      inputPath: audioPath,
      tokenLevelTimestamps: true,
      printOutput: this.config.whisperVerbose,
      onProgress: (progress) => {
        logger.debug(`Transcribing is ${progress} complete`);
      },
    });
    logger.debug("Transcription finished");

    // remove the audio file
    await fs.remove(audioPath);

    logger.debug("Creating captions from transcription");
    const captions: Caption[] = [];
    transcription.forEach((record) => {
      if (record.text === "") {
        return;
      }

      record.tokens.forEach((token) => {
        if (token.text.startsWith("[_TT")) {
          return;
        }
        // if token starts without space and the previous node didn't have space either, merge them
        if (
          captions.length > 0 &&
          !token.text.startsWith(" ") &&
          !captions[captions.length - 1].text.endsWith(" ")
        ) {
          captions[captions.length - 1].text += record.text;
          captions[captions.length - 1].endMs = record.offsets.to;
          return;
        }
        captions.push({
          text: token.text,
          startMs: record.offsets.from,
          endMs: record.offsets.to,
        });
      });
    });
    logger.debug("Captions created");
    return captions;
  }
}
