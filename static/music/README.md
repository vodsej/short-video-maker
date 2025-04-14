# Music Library for Shorts Creator

This directory contains background music tracks for use in the shorts creator project. All music files are sourced from [Pixabay](https://pixabay.com/music/) and are free to use under their license.

## Example

<video src="examples/hello_world.mp4" width="270" height="480"></video>

## Available Music Tracks

| File                                                                                                                                                   | Duration | Start Time | Tags                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---------- | ------------------------------------ |
| [emotional-piano-music-322389.mp3](./emotional-piano-music-322389.mp3)                                                                                 | 129s     | 1s         | cinematic, classical, pensive, piano |
| [experimental-cinematic-hip-hop-315904.mp3](./experimental-cinematic-hip-hop-315904.mp3)                                                               | 140s     | 15s        | dramatic, cinematic                  |
| [gardens-stylish-chill-303261.mp3](./gardens-stylish-chill-303261.mp3)                                                                                 | 116s     | 1s         | chill, lo-fi                         |
| [gorila-315977.mp3](./gorila-315977.mp3)                                                                                                               | 115s     | 2s         | energetic, hip-hop                   |
| [indigo-lo-fi-hip-hop-320827.mp3](./indigo-lo-fi-hip-hop-320827.mp3)                                                                                   | 195s     | 1s         | chill, lo-fi, chillhop               |
| [jazz-lounge-elevator-music-322314.mp3](./jazz-lounge-elevator-music-322314.mp3)                                                                       | 134s     | 1s         | jazz, piano, smooth jazz             |
| [just-relax-11157.mp3](./just-relax-11157.mp3)                                                                                                         | 160s     | 1s         | piano, relaxing, soft guitar         |
| [next-level-323002.mp3](./next-level-323002.mp3)                                                                                                       | 169s     | 1s         | corporate, upbeat, inspiring         |
| [vlog-music-beat-trailer-showreel-promo-background-intro-theme-274290.mp3](./vlog-music-beat-trailer-showreel-promo-background-intro-theme-274290.mp3) | 61s      | 11s        | synth pop, upbeat                    |

## Artist Attribution

- **Emotional Piano Music**
  Music by [Ievgen Poltavskyi](https://pixabay.com/users/hitslab-47305729/) from [Pixabay](https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=322389)

- **Experimental Cinematic Hip-Hop**
  Music by [Rockot](https://pixabay.com/users/rockot-1947599/) from [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=315904)

- **Gardens - Stylish Chill**
  Music by [Oleksandr Stepanov](https://pixabay.com/users/penguinmusic-24940186/) from [Pixabay](https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=303261)

- **Gorilla**
  Music by [Oleksandr Savochka](https://pixabay.com/users/alex_makemusic-24186663/) from [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=315977)

- **Indigo (Lo-fi Hip Hop)**
  Music by [Grand_Project](https://pixabay.com/users/grand_project-19033897/) from [Pixabay](https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=320827)

- **Jazz Lounge Elevator Music**
  Music by [Ievgen Poltavskyi](https://pixabay.com/users/hitslab-47305729/) from [Pixabay](https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=322314)

- **Just Relax**
  Music by [music_for_video](https://pixabay.com/users/music_for_video-22579021/) from [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=11157)

- **Next Level**
  Music by [Grand_Project](https://pixabay.com/users/grand_project-19033897/) from [Pixabay](https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=323002)

- **Vlog Music (Beat Trailer Showreel Promo Background Intro Theme)**
  Music by [Mykola Sosin](https://pixabay.com/users/mfcc-28627740/) from [Pixabay](https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=274290)

## How to Add New Music

To add new music to the project, follow these steps:

1. Add your MP3 file to this directory (`static/music/`)
2. Update the `src/short-creator/music.ts` file by adding a new record to the `musicList` array:

```typescript
{
  file: "your-new-music-file.mp3",  // Filename of your MP3
  duration: 120,                   // Total duration of the track in seconds
  start: 5,                        // Start time in seconds (when to begin playing)
  tags: ["tag1", "tag2"],          // Tags that describe the music style
}
```

### Available Tags

The following tags are predefined in `src/types/shorts.ts` as `MusicTagsEnum`:

- `cinematic`
- `classical`
- `pensive`
- `piano`
- `dramatic`
- `chill`
- `lo-fi`
- `chillhop`
- `energetic`
- `hip-hop`
- `jazz`
- `smooth jazz`
- `relaxing`
- `soft guitar`
- `corporate`
- `upbeat`
- `inspiring`
- `synth pop`

If you need to add a new tag:

1. Add the new tag to the `MusicTagsEnum` in `src/types/shorts.ts`
2. Use the new tag in your music record

## Music File Selection

The shorts creator uses these tags to filter and match appropriate music with video content. Choose tags carefully to ensure proper matching between music mood and video content.
