const test = require('tape');
const timers = require('..');

test('setTimeoutAt', function (t) {
  const originalMaxInterval = timers.maxInterval;

  t.test('Crossing the maxInterval border', function (t) {
    timers.maxInterval = 2;

    timeout = timers.setTimeoutAt(function () {
      timers.maxInterval = originalMaxInterval;

      t.pass('timeout fired');
      t.equal(arguments.length, 0);
      t.end();
    }, Date.now() + 30);
  });

  t.test('Crossing the maxInterval border with args', function (t) {
    timers.maxInterval = 2;

    timeout = timers.setTimeoutAt(function (a, b) {
      timers.maxInterval = originalMaxInterval;

      t.pass('timeout fired');
      t.equal(arguments.length, 2);
      t.equal(a, 1);
      t.equal(b, 2);
      t.end();
    }, Date.now() + 30, 1, 2);
  });

  t.test('Not crossing the maxInterval border', function (t) {
    timers.setTimeoutAt(function () {
      t.pass('timeout fired');
      t.equal(arguments.length, 0);
      t.end();
    }, Date.now() + 5);
  });

  t.test('Not crossing the maxInterval border with args', function (t) {
    timers.setTimeoutAt(function (a, b) {
      t.pass('timeout fired');
      t.equal(arguments.length, 2);
      t.equal(a, 1);
      t.equal(b, 2);
      t.end();
    }, Date.now() + 5, 1, 2);
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
