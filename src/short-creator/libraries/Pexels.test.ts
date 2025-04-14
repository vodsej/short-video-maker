process.env.LOG_LEVEL = "debug";

import nock from "nock";
import { PexelsAPI } from "./Pexels";
import { test, assert } from "vitest";
import fs from "fs-extra";
import path from "path";

test("test pexels", async () => {
  const mockResponse = fs.readFileSync(
    path.resolve("__mocks__/pexels-response.json"),
    "utf-8",
  );
  nock("https://api.pexels.com")
    .get(/videos\/search/)
    .reply(200, mockResponse);
  const pexels = new PexelsAPI("asdf");
  const video = await pexels.findVideo("dog", 2.4, []);
  assert.isObject(video, "Video should be an object");
});
