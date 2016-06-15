const test = require('tape');
const timers = require('..');

test('setInterval', function (t) {
	const originalMaxInterval = timers.maxInterval;

	t.test('Crossing the maxInterval border', function (t) {
		timers.maxInterval = 2;

		const interval = timers.setInterval(function () {
			t.pass('interval fired');
			interval.clear();
			timers.maxInterval = originalMaxInterval;
			t.end();
		}, 30);
	});

	t.test('Not crossing the maxInterval border', function (t) {
		const interval = timers.setInterval(function () {
			t.pass('interval fired');
			interval.clear();
			t.end();
		}, 5);
	});

	t.end();
});
