import type { MusicConfig, Music } from "../types/shorts";

const musicList: MusicConfig[] = [
  {
    file: "emotional-piano-music-322389.mp3",
    duration: 129,
    start: 1,
    tags: ["cinematic", "classical", "pensive", "piano"],
  },
  {
    file: "experimental-cinematic-hip-hop-315904.mp3",
    duration: 140,
    start: 15,
    tags: ["dramatic", "cinematic"],
  },
  {
    file: "gardens-stylish-chill-303261.mp3",
    duration: 116,
    start: 1,
    tags: ["chill", "lo-fi"],
  },
  {
    file: "gorila-315977.mp3",
    duration: 115,
    start: 2,
    tags: ["energetic", "hip-hop"],
  },
  {
    file: "indigo-lo-fi-hip-hop-320827.mp3",
    duration: 195,
    start: 1,
    tags: ["chill", "lo-fi", "chillhop"],
  },
  {
    file: "jazz-lounge-elevator-music-322314.mp3",
    duration: 134,
    start: 1,
    tags: ["jazz", "piano", "smooth jazz"],
  },
  {
    file: "just-relax-11157.mp3",
    duration: 160,
    start: 1,
    tags: ["piano", "relaxing", "soft guitar"],
  },
  {
    file: "next-level-323002.mp3",
    duration: 169,
    start: 1,
    tags: ["corporate", "upbeat", "inspiring"],
  },
  {
    file: "vlog-music-beat-trailer-showreel-promo-background-intro-theme-274290.mp3",
    duration: 61,
    start: 11,
    tags: ["synth pop", "upbeat"],
  },
];

export const musicConfig: Music[] = musicList.map((music: MusicConfig) => {
  return {
    ...music,
    realDuration: music.duration - music.start,
  };
});
