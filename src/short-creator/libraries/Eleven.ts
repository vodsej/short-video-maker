import { ElevenLabsClient } from "elevenlabs";
import { Readable } from "stream";
const getMP3Duration = require("get-mp3-duration");
import { Buffer } from "buffer";

export class Eleven {
  constructor(private tts: ElevenLabsClient) {}

  async generate(text: string): Promise<{
    audio: ArrayBuffer;
    audioLength: number;
  }> {
    const audio = await this.tts.generate({
      voice: "Adam",
      text: text,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128",
    });

    const audioBuffer = await this.streamToArrayBuffer(audio);

    return {
      audio: audioBuffer,
      audioLength: getMP3Duration(Buffer.from(audioBuffer)) / 1000,
    };
  }

  async streamToArrayBuffer(stream: Readable): Promise<ArrayBuffer> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    const buffer = Buffer.concat(chunks);
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    );
  }

  static async init(API_KEY: string): Promise<Eleven> {
    const tts = new ElevenLabsClient({
      apiKey: API_KEY,
    });
    return new Eleven(tts);
  }
}
