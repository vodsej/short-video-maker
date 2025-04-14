/* eslint-disable @typescript-eslint/no-unused-vars */
import { Kokoro } from "./short-creator/libraries/Kokoro";
import { Remotion } from "./short-creator/libraries/Remotion";
import { Whisper } from "./short-creator/libraries/Whisper";
import { FFMpeg } from "./short-creator/libraries/FFmpeg";
import { PexelsAPI } from "./short-creator/libraries/Pexels";
import { PEXELS_API_KEY, PORT } from "./config";
import { ShortCreator } from "./short-creator/ShortCreator";
import { logger } from "./logger";
import { Server } from "./server/server";

async function main() {
  logger.debug("initializing remotion");
  const remotion = await Remotion.init();
  logger.debug("initializing kokoro");
  const kokoro = await Kokoro.init();
  logger.debug("initializing whisper");
  const whisper = await Whisper.init();
  const ffmpeg = new FFMpeg();
  const pexelsApi = new PexelsAPI(PEXELS_API_KEY);

  logger.debug("initializing the short creator");
  const shortCreator = new ShortCreator(
    remotion,
    kokoro,
    whisper,
    ffmpeg,
    pexelsApi,
  );

  logger.debug("initializing the server");
  const server = new Server(PORT, shortCreator);
  const app = server.start();

  // todo add shutdown handler
}

main().catch((err) => {
  logger.error(err, "Error starting server");
});
