import path from "path";
import "dotenv/config";
import os from "os";
import fs from "fs-extra";

// paths
export const DATA_DIR_PATH =
  process.env.DATA_DIR_PATH ??
  path.join(os.homedir(), ".ai-agents-az-video-generator");

export const LIBS_DIR_PATH = path.join(DATA_DIR_PATH, "libs");
export const WHISPER_INSTALL_PATH = path.join(LIBS_DIR_PATH, "whisper.cpp");
export const VIDEOS_DIR_PATH = path.join(DATA_DIR_PATH, "videos");
export const TEMP_DIR_PATH = path.join(DATA_DIR_PATH, "temp");

fs.ensureDirSync(DATA_DIR_PATH);
fs.ensureDirSync(LIBS_DIR_PATH);
fs.ensureDirSync(VIDEOS_DIR_PATH);
fs.ensureDirSync(TEMP_DIR_PATH);

export const PACKAGE_DIR_PATH = path.join(__dirname, "..");
export const STATIC_DIR_PATH = path.join(PACKAGE_DIR_PATH, "static");
export const MUSIC_PATH = path.join(STATIC_DIR_PATH, "music");

export const PEXELS_API_KEY = process.env.PEXELS_API_KEY as string;
export const LOG_LEVEL = process.env.LOG_LEVEL ?? "info";
export const WHISPER_VERBOSE = process.env.WHISPER_VERBOSE === "true";

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3123;
export const DOCKER = process.env.DOCKER === "true";
export const DEV = process.env.DEV === "true";

// todo add check for PEXELS_API_KEY
