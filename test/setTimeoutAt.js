const test = require('tape');
const timers = require('..');

test('setTimeoutAt', function (t) {
  const originalMaxInterval = timers.maxInterval;

  t.test('Crossing the maxInterval border', function (t) {
    timers.maxInterval = 2;

    timeout = timers.setTimeoutAt(function () {
      timers.maxInterval = originalMaxInterval;

      t.pass('timeout fired');
      t.end();
    }, Date.now() + 30);
  });

  t.test('Not crossing the maxInterval border', function (t) {
    timers.setTimeoutAt(function () {
      t.pass('timeout fired');
      t.end();
    }, Date.now() + 5);
  });

  t.test('clear()', function (t) {
    const timeout = timers.setTimeoutAt(function () {
      t.end('timeout fired despite clear()');
    }, Date.now() + 0);

    timeout.clear();

    setTimeout(function () {
      t.pass('timeout did not fire');
      t.end();
    }, 10);
  });

  t.end();
});
