import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../../../tests/helpers/module-for-acceptance';
import { $hook, hook } from 'ember-hook';

moduleForAcceptance('Acceptance | affinity-engine/stage/directions/basic-direction');

test('Affinity Engine | stage | Directions | BasicDirection', function(assert) {
  assert.expect(12);

  visit('/affinity-engine/test-scenarios/stage/directions/basic-direction').then(() => {
    assert.ok(Ember.$(`
      .et-stage
      .et-layer-
      .et-layer-engine
      .et-layer-engine-meta
      .et-layer-engine-meta-basic
      ${hook('basic_direction')}
    `).length > 0, 'basic direction is rendered in correct layer');
    assert.equal($hook('basic_direction_header').text().trim(), 'First Basic Header', 'first header is initialized correctly');
    assert.equal($hook('basic_direction_text').text().trim(), '', 'first text is initially blank');

    return step();
  }).then(() => {
    assert.equal($hook('basic_direction_header').text().trim(), 'First Basic Header', 'first header is unchanged');
    assert.equal($hook('basic_direction_text').text().trim(), 'foo', 'first basic text is changed');

    return step();
  }).then(() => {
    assert.equal(Ember.$(`${hook('basic_direction_header')}:nth(1)`).text().trim(), 'Second Basic Header', 'second header is correct');
    assert.equal(Ember.$(`${hook('basic_direction_text')}:nth(1)`).text().trim(), 'bar', 'second basic text set initially');
    assert.equal(Ember.$(`${hook('basic_direction_header')}:nth(0)`).text().trim(), 'First Basic Header', 'first header is unchanged after second inserted');
    assert.equal(Ember.$(`${hook('basic_direction_text')}:nth(0)`).text().trim(), 'foo', 'first basic text unchanged after second inserted');

    return step();
  }).then(() => {
    assert.equal(Ember.$(`${hook('basic_direction_header')}:nth(2)`).text().trim(), 'Third Basic Header', 'third header is correct');
    assert.equal(Ember.$(`${hook('basic_direction_text')}:nth(2)`).text().trim(), 'baz', 'third basic text set initially');
    assert.equal(Ember.$(`${hook('basic_direction_footer')}:nth(2)`).text().trim(), 'alpha omega', 'direction passed successfully');
  });
});
