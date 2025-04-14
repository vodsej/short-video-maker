import {
  downloadWhisperModel,
  installWhisperCpp,
  transcribe,
} from "@remotion/install-whisper-cpp";
import fs from "fs-extra";

import {
  DOCKER,
  TEMP_DIR_PATH,
  WHISPER_INSTALL_PATH,
  WHISPER_VERBOSE,
} from "../../config";
import type { Caption } from "../../types/shorts";
import path from "path";

export class Whisper {
  static async init(): Promise<Whisper> {
    fs.ensureDir(TEMP_DIR_PATH);
    if (!DOCKER) {
      await installWhisperCpp({
        to: WHISPER_INSTALL_PATH,
        version: "1.5.5",
        printOutput: WHISPER_VERBOSE,
      });

      await downloadWhisperModel({
        model: "medium.en",
        folder: path.join(WHISPER_INSTALL_PATH, "models"),
        printOutput: WHISPER_VERBOSE,
      });
    }

    return new Whisper();
  }

  // todo shall we extract it to a Caption class?
  async CreateCaption(audioPath: string): Promise<Caption[]> {
    const { transcription } = await transcribe({
      model: "medium.en", // possible options: "tiny", "tiny.en", "base", "base.en", "small", "small.en", "medium", "medium.en", "large-v1", "large-v2", "large-v3", "large-v3-turbo"
      whisperPath: WHISPER_INSTALL_PATH,
      modelFolder: path.join(WHISPER_INSTALL_PATH, "models"),
      whisperCppVersion: "1.5.5",
      inputPath: audioPath,
      tokenLevelTimestamps: true,
      printOutput: WHISPER_VERBOSE,
    });

    // remove the audio file
    await fs.remove(audioPath);

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
    return captions;
  }
}
