const test = require('tape');
const timers = require('..');

test('setTimeout', function (t) {
	const originalMaxInterval = timers.maxInterval;

	t.test('Crossing the maxInterval border', function (t) {
		timers.maxInterval = 2;

		timeout = timers.setTimeout(function () {
			t.pass('timeout fired');
			timers.maxInterval = originalMaxInterval;
			t.end();
		}, 30);
	});

	t.test('Not crossing the maxInterval border', function (t) {
		timers.setTimeout(function () {
			t.pass('timeout fired');
			t.end();
		}, 5);
	});

	t.test('clear()', function (t) {
		const timeout = timers.setTimeout(function () {
			t.end('TimeOut fired despite clear()');
		}, 0);

		timeout.clear();

		setTimeout(function () {
			t.pass('timeout did not fire');
			t.end();
		}, 10);
	});

	t.end();
});
