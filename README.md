# Shorts Video Creator

An open source automated video creation tool for generating short-form video content. Shorts Video Creator combines text-to-speech, automatic captions, background videos, and music to create engaging short videos from simple text inputs.

This repository was open-source by the [AI Agents A-Z Youtube Channel](https://www.youtube.com/channel/UCloXqLhp_KGhHBe1kwaL2Tg). We encourage you to check out the channel for more AI-related content and tutorials.

## Example

<table>
  <tr>
    <td>
    <video src="https://github.com/user-attachments/assets/bb7ce80f-e6e1-44e5-ba4e-9b13d917f55b" width="270" height="480"></video>
    </td>
<td>
    
```json
{
    "scenes": [
      {
        "text": "Hello world! Enjoy using this tool to create awesome AI workflows",
        "searchTerm": "rainbow"
      }
    ],
    "config": {
      "paddingBack": 1500,
      "music": "cinematic"
    }
}
```

</td>
  </tr>
</table>

## Features

- Generate complete short videos from text prompts
- Text-to-speech conversion with multiple voice options
- Automatic caption generation and styling
- Background video search and selection via Pexels
- Background music with genre/mood selection
- Serve as both REST API and Model Context Protocol (MCP) server

## How It Works

Shorts Creator takes simple text inputs and search terms, then:

1. Converts text to speech using Kokoro TTS
2. Generates accurate captions via Whisper
3. Finds relevant background videos from Pexels
4. Composes all elements with Remotion
5. Renders a professional-looking short video with perfectly timed captions

## Dependencies

| Dependency                                             | Version  | License                                         | Purpose                             |
| ------------------------------------------------------ | -------- | ----------------------------------------------- | ----------------------------------- |
| [Remotion](https://remotion.dev/)                      | ^4.0.286 | MIT                                             | Video composition and rendering     |
| [Whisper CPP](https://github.com/ggml-org/whisper.cpp) | v1.5.5   | MIT                                             | Speech-to-text for captions         |
| [FFmpeg](https://ffmpeg.org/)                          | ^2.1.3   | LGPL/GPL                                        | Audio/video manipulation            |
| [Kokoro.js](https://www.npmjs.com/package/kokoro-js)   | ^1.2.0   | MIT                                             | Text-to-speech generation           |
| [Pexels API](https://www.pexels.com/api/)              | N/A      | [Pexels Terms](https://www.pexels.com/license/) | Background video sourcing           |
| [Express](https://expressjs.com/)                      | ^5.1.0   | MIT                                             | API server framework                |
| [MCP SDK](https://modelcontextprotocol.io/)            | ^1.9.0   | MIT                                             | Model Context Protocol support      |
| [React](https://react.dev/)                            | ^19.1.0  | MIT                                             | UI components for video composition |
| [Zod](https://zod.dev/)                                | ^3.24.2  | MIT                                             | Type validation                     |

## Prerequisites

- Node.js (v18 or higher)
- FFmpeg installed on your system
- Pexels API key
- Docker (for containerized deployment)
- NVIDIA GPU (optional, for improved performance)

## Running the Project

### Using NPX (recommended)

The easiest way to run the project with GPU support out of the box:

```bash
PEXELS_API_KEY=your_pexels_api_key npx @ai-agents-az/shorts-creator
```

### Using Docker

```bash
# Standard run
docker run -it --rm --name shorts-creator -p 3123:3123 \
  -e PEXELS_API_KEY=your_pexels_api_key \
  -v shorts_creator:/app/data gyoridavid/shorts-creator

# For NVIDIA GPUs, add --gpu=all
docker run -it --rm --name shorts-creator -p 3123:3123 \
  -e PEXELS_API_KEY=your_pexels_api_key \
  -v shorts_creator:/app/data --gpu=all \
  gyoridavid/shorts-creator
```

## Local Development

See the [CONTRIBUTING.md](CONTRIBUTING.md) file for instructions on setting up a local development environment.

## API Usage

### REST API

The following REST endpoints are available:

1. `GET /api/video/:id` - Get a video by ID
2. `POST /api/video` - Create a new video
   ```json
   {
     "scenes": [
       {
         "text": "This is the text to be spoken in the video",
         "searchTerm": "nature sunset"
       }
     ],
     "config": {
       "paddingBack": 3000,
       "music": "chill"
     }
   }
   ```
3. `DELETE /api/video/:id` - Delete a video by ID
4. `GET /api/music-tags` - Get available music tags

### Model Context Protocol (MCP)

The service also implements the Model Context Protocol:

1. `GET /mcp/sse` - Server-sent events for MCP
2. `POST /mcp/messages` - Send messages to MCP server

Available MCP tools:

- `create-short-video` - Create a video from a list of scenes
- `get-video-status` - Check video creation status

## License

This project is licensed under the ISC License.

## Acknowledgments

- [Remotion](https://remotion.dev/) for programmatic video generation
- [Whisper](https://github.com/ggml-org/whisper.cpp) for speech-to-text
- [Pexels](https://www.pexels.com/) for video content
- [FFmpeg](https://ffmpeg.org/) for audio/video processing
