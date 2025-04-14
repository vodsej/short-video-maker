export type Scene = {
  captions: Caption[];
  video: string;
  audio: {
    dataUri: string;
    duration: number;
  };
};
export type SceneInput = {
  text: string;
  searchTerm: string;
};
export type RenderConfig = {
  paddingBack?: number;
  music?: MusicTag;
};
export type Voices =
  | "af_heart"
  | "af_alloy"
  | "af_aoede"
  | "af_bella"
  | "af_jessica"
  | "af_kore"
  | "af_nicole"
  | "af_nova"
  | "af_river"
  | "af_sarah"
  | "af_sky"
  | "am_adam"
  | "am_echo"
  | "am_eric"
  | "am_fenrir"
  | "am_liam"
  | "am_michael"
  | "am_onyx"
  | "am_puck"
  | "am_santa"
  | "bf_emma"
  | "bf_isabella"
  | "bm_george"
  | "bm_lewis"
  | "bf_alice"
  | "bf_lily"
  | "bm_daniel"
  | "bm_fable";
export type Video = {
  id: string;
  url: string;
  width: number;
  height: number;
};
export type Caption = {
  text: string;
  startMs: number;
  endMs: number;
};

export type CaptionLine = {
  texts: Caption[];
};
export type CaptionPage = {
  startMs: number;
  endMs: number;
  lines: CaptionLine[];
};
export type CreateShortInput = {
  scenes: SceneInput[];
  config: RenderConfig;
};

export type VideoStatus = "processing" | "ready" | "failed";
export enum MusicTagsEnum {
  cinematic = "cinematic",
  classical = "classical",
  pensive = "pensive",
  piano = "piano",
  dramatic = "dramatic",
  chill = "chill",
  lofi = "lo-fi",
  chillhop = "chillhop",
  energetic = "energetic",
  hiphop = "hip-hop",
  jazz = "jazz",
  smoothjazz = "smooth jazz",
  relaxing = "relaxing",
  softguitar = "soft guitar",
  corporate = "corporate",
  upbeat = "upbeat",
  inspiring = "inspiring",
  synthpop = "synth pop",
}

export type MusicConfig = {
  file: string;
  duration: number;
  start: number;
  tags: MusicTag[];
};
export type Music = MusicConfig & {
  realDuration: number;
};

export type MusicTag = `${MusicTagsEnum}`;
