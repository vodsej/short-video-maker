import z from "zod";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import { ensureBrowser } from "@remotion/renderer";

import { Config } from "../../config";
import { shortVideoSchema } from "../../components/videos/ShortVideo";
import { logger } from "../../logger";

// the component to render; it's not configurable (yet?)
const COMPONENT_TO_RENDER = "ShortVideo";
export class Remotion {
  constructor(
    private bundled: string,
    private config: Config,
  ) {}

  static async init(config: Config): Promise<Remotion> {
    await ensureBrowser();

    const bundled = await bundle({
      publicDir: config.musicDirPath,
      entryPoint: path.join(
        config.packageDirPath,
        config.devMode ? "src" : "dist",
        "components",
        "root",
        `index.${config.devMode ? "ts" : "js"}`,
      ),
    });

    return new Remotion(bundled, config);
  }

  // the schema is hardcoded for now
  async render(data: z.infer<typeof shortVideoSchema>, id: string) {
    const composition = await selectComposition({
      serveUrl: this.bundled,
      id: COMPONENT_TO_RENDER,
      inputProps: data,
    });

    logger.debug(
      { component: COMPONENT_TO_RENDER, videoID: id },
      "Rendering video with Remotion",
    );

    const outputLocation = path.join(this.config.videosDirPath, `${id}.mp4`);

    const onProgress = (() => {
      let progress = 0;
      return ({ progress: newProgress }: { progress: number }) => {
        newProgress = Math.floor(newProgress * 100);
        if (newProgress > progress) {
          logger.debug(`Rendering ${id} ${newProgress}% complete`);
          progress = newProgress;
        }
      };
    })();

    await renderMedia({
      codec: "h264",
      composition,
      serveUrl: this.bundled,
      outputLocation,
      chromiumOptions: {
        enableMultiProcessOnLinux: true,
        gl: "vulkan",
      },
      inputProps: data,
      onProgress,
      hardwareAcceleration: "if-possible",
    });

    logger.debug(
      {
        outputLocation,
        component: COMPONENT_TO_RENDER,
        videoID: id,
      },
      "Video rendered with Remotion",
    );
  }
}
