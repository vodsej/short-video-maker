import z from "zod";
import { bundle } from "@remotion/bundler";
import {
  renderMedia,
  selectComposition,
  RenderMediaOnProgress,
} from "@remotion/renderer";
import path from "path";
import fs from "fs-extra";

import {
  MUSIC_PATH,
  VIDEOS_DIR_PATH,
  PACKAGE_DIR_PATH,
  DEV,
} from "../../config";
import { shortVideoSchema } from "../../components/videos/ShortVideo";
import { logger } from "../../logger";

// the component to render; it's not configurable (yet?)
const COMPONENT_TO_RENDER = "ShortVideo";
const RENDER_ENTRY_POINT = path.join(
  PACKAGE_DIR_PATH,
  DEV ? "src" : "dist",
  "components",
  "root",
  `index.${DEV ? "ts" : "js"}`,
);

export class Remotion {
  constructor(private bundled: string) {}

  static async init(): Promise<Remotion> {
    fs.ensureDirSync(VIDEOS_DIR_PATH);
    const bundled = await bundle({
      publicDir: MUSIC_PATH,
      entryPoint: RENDER_ENTRY_POINT,
    });

    return new Remotion(bundled);
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

    const outputLocation = path.join(VIDEOS_DIR_PATH, `${id}.mp4`);

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
      },
      inputProps: data,
      onProgress,
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
