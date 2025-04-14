import z from "zod";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs-extra";

import {
  MUSIC_PATH,
  VIDEOS_DIR_PATH,
  NODE_ENV,
  PACKAGE_DIR_PATH,
} from "../../config";
import { shortVideoSchema } from "../../components/videos/ShortVideo";
import { logger } from "../../logger";

// the component to render; it's not configurable (yet?)
const COMPONENT_TO_RENDER = "ShortVideo";
const RENDER_ENTRY_POINT = path.join(
  PACKAGE_DIR_PATH,
  NODE_ENV === "production" ? "dist" : "src",
  "components",
  "root",
  `index.${NODE_ENV === "production" ? "js" : "ts"}`,
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
    await renderMedia({
      codec: "h264",
      composition,
      serveUrl: this.bundled,
      outputLocation,
      chromiumOptions: {
        enableMultiProcessOnLinux: true,
      },
      inputProps: data,
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
