import { ensureBrowser } from "@remotion/renderer";

import { logger } from "../logger";
import { Kokoro } from "../short-creator/libraries/Kokoro";
import { MusicManager } from "../short-creator/music";
import { Config } from "../config";

// runs in docker
export async function install() {
  logger.info("Installing dependencies...");
  logger.info("Installing Kokoro...");
  await Kokoro.init();
  logger.info("Installing browser shell...");
  await ensureBrowser();
  logger.info("Installing dependencies complete");

  logger.info("Ensuring the music files exist...");
  const musicManager = new MusicManager(new Config());
  try {
    musicManager.ensureMusicFilesExist();
  } catch (err) {
    logger.error(err, "Missing music files");
    process.exit(1);
  }
}

install()
  .then(() => {
    logger.info("Installation complete");
  })
  .catch((err: unknown) => {
    logger.error(err, "Installation failed");
  });
