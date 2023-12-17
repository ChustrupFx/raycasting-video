import { makeProject } from '@motion-canvas/core';

import audio from './audios/audio1.mp3';
import scene1 from './scenes/Scene1?scene';

export default makeProject({
  scenes: [scene1],
  audio: audio,
  name: "part2"
});
