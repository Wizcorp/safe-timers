'use strict';

const test = require('tape');
const timers = require('..');

test('setTimeout', function (t) {
	const originalMaxInterval = timers.maxInterval;

	t.test('Crossing the maxInterval border', function (t) {
		timers.maxInterval = 2;

		timers.setTimeout(function () {
			timers.maxInterval = originalMaxInterval;

			t.pass('timeout fired');
			t.equal(arguments.length, 0);
			t.end();
		}, 30);
	});

	t.test('Crossing the maxInterval border with args', function (t) {
		timers.maxInterval = 2;

		timers.setTimeout(function (a, b) {
			timers.maxInterval = originalMaxInterval;

			t.pass('timeout fired');
			t.equal(arguments.length, 2);
			t.equal(a, 1);
			t.equal(b, 2);
			t.end();
		}, 30, 1, 2);
	});

	t.test('Not crossing the maxInterval border', function (t) {
		timers.setTimeout(function () {
			t.pass('timeout fired');
			t.equal(arguments.length, 0);
			t.end();
		}, 5);
	});

	t.test('Not crossing the maxInterval border with args', function (t) {
		timers.setTimeout(function (a, b) {
			t.pass('timeout fired');
			t.equal(arguments.length, 2);
			t.equal(a, 1);
			t.equal(b, 2);
			t.end();
		}, 5, 1, 2);
	});

	t.test('clear()', function (t) {
		const timeout = timers.setTimeout(function () {
			t.end('timeout fired despite clear()');
		}, 0);

		timeout.clear();

		setTimeout(function () {
			t.pass('timeout did not fire');
			t.end();
		}, 10);
	});

	t.test('clearTimeout', function (t) {
		const timeout = timers.setTimeout(function () {
			t.end('timeout fired despite clearTimeout()');
		}, 0);

		timers.clearTimeout(timeout);

		setTimeout(function () {
			t.pass('timeout did not fire');
			t.end();
		}, 10);
	});

	t.test('clearTimeout without timer', function (t) {
		timers.clearTimeout(null);
		t.pass('no error was thrown');
		t.end();
	});

	t.end();
});
