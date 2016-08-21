import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { $hook, initialize as initializeHook } from 'ember-hook';
import { initializeQUnitAssertions } from 'ember-message-bus';
import { initialize as initializeStage } from 'affinity-engine-stage';

const {
  getOwner
} = Ember;

moduleForComponent('affinity-engine-stage-scene-window', 'Integration | Component | ember engine stage scene window', {
  integration: true,

  beforeEach() {
    const appInstance = getOwner(this);

    initializeHook();
    initializeQUnitAssertions(appInstance);
    initializeStage(appInstance);
  }
});

test('it applies `directable.windowClassNames`', function(assert) {
  assert.expect(1);

  this.set('directable', { windowClassNames: ['foo'] });

  this.render(hbs`{{affinity-engine-stage-scene-window directable=directable engineId="foo" sceneWindowId="bar"}}`);

  assert.ok($hook('affinity_engine_stage_scene_window_main').hasClass('foo'), 'has class');
});

test('it applies a z-index based on `directable.priority``', function(assert) {
  assert.expect(1);

  this.set('directable', { priority: 5 });

  this.render(hbs`{{affinity-engine-stage-scene-window directable=directable engineId="foo" sceneWindowId="bar"}}`);

  assert.equal($hook('affinity_engine_stage_scene_window_main').attr('style'), 'z-index: 5000;', 'style is correct');
});

test('it applies the screen based on `directable.screen`', function(assert) {
  assert.expect(1);

  this.set('directable', { screen: true });

  this.render(hbs`{{affinity-engine-stage-scene-window directable=directable engineId="foo" sceneWindowId="bar"}}`);

  assert.ok($hook('affinity_engine_stage_scene_window_screen').length > 0, 'screen is visible');
});

test('it gives the screen a priority based on `directable.priority`', function(assert) {
  assert.expect(1);

  this.set('directable', { screen: true, priority: 5 });

  this.render(hbs`{{affinity-engine-stage-scene-window directable=directable engineId="foo" sceneWindowId="bar"}}`);

  assert.ok($hook('affinity_engine_stage_scene_window_screen').attr('style'), 'z-index: 5000;', 'style is correct');
});

test('it renders a child stage', function(assert) {
  assert.expect(1);

  this.render(hbs`{{affinity-engine-stage-scene-window engineId="foo" sceneWindowId="bar"}}`);

  assert.ok($hook('affinity_engine_stage').length > 0, 'stage is rendered');
});

test('hides the screen by default', function(assert) {
  assert.expect(1);

  this.render(hbs`{{affinity-engine-stage-scene-window engineId="foo" sceneWindowId="bar"}}`);

  assert.ok($hook('affinity_engine_stage_scene_window_screen').length === 0, 'screen is hidden');
});

test('sets data scene-window-id', function(assert) {
  assert.expect(1);

  const sceneWindowId = 'foo';

  this.set('sceneWindowId', sceneWindowId);

  this.render(hbs`{{affinity-engine-stage-scene-window engineId="foo" sceneWindowId=sceneWindowId}}`);

  assert.ok($hook('affinity_engine_stage_scene_window').data('scene-window-id'), 'foo', 'data set correctly');
});
