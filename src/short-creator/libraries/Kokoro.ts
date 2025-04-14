import { KokoroTTS } from "kokoro-js";
import type { Voices } from "../../types/shorts";

const MODEL = "onnx-community/Kokoro-82M-v1.0-ONNX";
const D_TYPE = "fp32"; // Options: "fp32", "fp16", "q8", "q4", "q4f16"

export class Kokoro {
  constructor(private tts: KokoroTTS) {}

  async generate(
    text: string,
    voice: Voices,
  ): Promise<{
    audio: ArrayBuffer;
    audioLength: number;
  }> {
    const audio = await this.tts.generate(text, {
      voice: voice,
    });

    return {
      audio: audio.toWav(),
      audioLength: audio.audio.length / audio.sampling_rate,
    };
  }

  static async init(): Promise<Kokoro> {
    const tts = await KokoroTTS.from_pretrained(MODEL, {
      dtype: D_TYPE,
      device: "cpu", // only "cpu" is supported in node
    });

    return new Kokoro(tts);
  }
}
