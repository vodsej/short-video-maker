import path from "path";
import type { MusicConfig, Music } from "../types/shorts";
import fs from "fs-extra";
import { MUSIC_PATH } from "../config";

const musicList: MusicConfig[] = [
  {
    file: "sad-violin-150146.mp3",
    start: 0,
    end: 110,
    mood: "sad",
  },
  {
    file: "sad-piano-one-181090.mp3",
    start: 2,
    end: 101,
    mood: "sad",
  },
  {
    file: "sad-emotional-beat-cry-alone-121597.mp3",
    start: 0,
    end: 195,
    mood: "sad",
  },
  {
    file: "melancholic-reflective-floating-piano-atmosphere-324686.mp3",
    start: 2,
    end: 133,
    mood: "melancholic",
  },
  {
    file: "tension-113661.mp3",
    start: 0,
    end: 117,
    mood: "melancholic",
  },
  {
    file: "lofi-chill-melancholic-259764.mp3",
    start: 2,
    end: 235,
    mood: "melancholic",
  },
  {
    file: "upbeat-funk-happy-315162.mp3",
    start: 1,
    end: 101,
    mood: "happy",
  },
  {
    file: "fun-upbeat-background-music-311769.mp3",
    start: 0,
    end: 113,
    mood: "happy",
  },
  {
    file: "heerful-99148.mp3",
    start: 1,
    end: 86,
    mood: "happy",
  },
  {
    file: "into-the-wild-315582.mp3",
    start: 27,
    end: 81,
    mood: "euphoric/high",
  },
  {
    file: "sunset-rising-113685.mp3",
    start: 5,
    end: 75,
    mood: "euphoric/high",
  },
  {
    file: "80s-synthwave-chill-166744.mp3",
    start: 17,
    end: 87,
    mood: "euphoric/high",
  },
  {
    file: "exciting-upbeat-background-music-306032.mp3",
    start: 0,
    end: 89,
    mood: "excited",
  },
  {
    file: "powerful-energy-upbeat-rock-advertising-music-245728.mp3",
    start: 0,
    end: 0,
    mood: "excited",
  },
  {
    file: "bright-energetic-upbeat-pop-324997.mp3",
    start: 2,
    end: 159,
    mood: "excited",
  },
  {
    file: "upbeat-funky-vlog-background-music-313080.mp3",
    start: 1,
    end: 106,
    mood: "chill",
  },
  {
    file: "upbeat-background-music-315196.mp3",
    start: 5,
    end: 96,
    mood: "chill",
  },
  {
    file: "upbeat-hip-hop-vlog-music-322878.mp3",
    start: 0,
    end: 104,
    mood: "chill",
  },
  {
    file: "vintage-wonder-142553.mp3",
    start: 3,
    end: 106,
    mood: "chill",
  },
  {
    file: "mellow-smooth-rap-beat-20230107-132480.mp3",
    start: 0,
    end: 175,
    mood: "chill",
  },
  {
    file: "anxious-heartbeat-dark-thriller-180565.mp3",
    start: 0,
    end: 137,
    mood: "uneasy",
  },
  {
    file: "dark-anxious-tension-dramatic-suspense-112169.mp3",
    start: 1,
    end: 93,
    mood: "uneasy",
  },
  {
    file: "frenzy-story-234221.mp3",
    start: 2,
    end: 104,
    mood: "uneasy",
  },
  {
    file: "dark-mysterious-tense-piano-cinematic-soundtrack-226665.mp3",
    start: 3,
    end: 78,
    mood: "uneasy",
  },
  {
    file: "angry-trap-beat-136015.mp3",
    start: 7,
    end: 229,
    mood: "angry",
  },
  {
    file: "unforgiving-253312.mp3",
    start: 11,
    end: 119,
    mood: "angry",
  },
  {
    file: "dark-electronic-207913.mp3",
    start: 0,
    end: 100,
    mood: "angry",
  },
  {
    file: "dark-140112.mp3",
    start: 14,
    end: 540,
    mood: "dark",
  },
  {
    file: "haunting-dark-atmosphere-304116.mp3",
    start: 10,
    end: 382,
    mood: "dark",
  },
  {
    file: "horror-dark-spooky-piano-251474.mp3",
    start: 0,
    end: 75,
    mood: "dark",
  },
  {
    file: "dark-intentions-288498.mp3",
    start: 14,
    end: 104,
    mood: "dark",
  },
  {
    file: "deep-282969.mp3",
    start: 0,
    end: 145,
    mood: "hopeful",
  },
  {
    file: "hopeful-optimism-266072.mp3",
    start: 0,
    end: 113,
    mood: "hopeful",
  },
  {
    file: "hopeful-cinematic-248601.mp3",
    start: 0,
    end: 82,
    mood: "hopeful",
  },
  {
    file: "better-day-186374.mp3",
    start: 0,
    end: 88,
    mood: "hopeful",
  },
  {
    file: "cinematic-documentary-115669.mp3",
    start: 4,
    end: 127,
    mood: "hopeful",
  },
  {
    file: "no-place-to-go-216744.mp3",
    start: 0,
    end: 333,
    mood: "contemplative",
  },
  {
    file: "mellow-fellow-in-the-bellow-peaceful-lofi-instrumental-262780.mp3",
    start: 0,
    end: 137,
    mood: "contemplative",
  },
  {
    file: "funny-comedy-quirky-background-music-316889.mp3",
    start: 0,
    end: 64,
    mood: "funny/quirky",
  },
  {
    file: "quirky-169825.mp3",
    start: 1,
    end: 178,
    mood: "funny/quirky",
  },
  {
    file: "sneaky-and-quirky-music-loop-287412.mp3",
    start: 0,
    end: 64,
    mood: "funny/quirky",
  },
];

export const musicConfig: Music[] = musicList.map((music: MusicConfig) => {
  if (!fs.existsSync(path.join(MUSIC_PATH, music.file))) {
    throw new Error(`Music file not found: ${music.file}`);
  }
  return {
    ...music,
    duration: music.end - music.start,
  };
});
