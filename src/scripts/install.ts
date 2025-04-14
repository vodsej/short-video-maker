// ensure ffmpeg is installed

import { logger } from "../logger";
import { Kokoro } from "../short-creator/libraries/Kokoro";
import { ensureBrowser } from "@remotion/renderer";

export async function install() {
  logger.info("Installing dependencies...");
  logger.info("Installing Kokoro...");
  await Kokoro.init();
  logger.info("Installing browser shell...");
  await ensureBrowser();
  logger.info("Installing dependencies complete");
}

install()
  .then(() => {
    logger.info("Installation complete");
  })
  .catch((err: unknown) => {
    logger.error(err, "Installation failed");
  });
