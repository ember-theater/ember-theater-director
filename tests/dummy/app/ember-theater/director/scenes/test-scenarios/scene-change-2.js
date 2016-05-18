import { Scene, step } from 'ember-theater-director';

export default Scene.extend({
  name: 'Scene Change 2',

  start: async function(script) {
    script.Basic('Scene Two');

    await step();

    script.Scene('test-scenarios/scene-change-3').window('simple-window');
    script.Scene('test-scenarios/scene-change-4').window('window-with-screen').screen('foo');
  }
});