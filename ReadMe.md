# Safe Timers

## About

Q: What's this all about? Aren't JavaScript timers safe?
A: Long story short: they're a bit broken. This module unbreaks them.

Whether it's by spec, or by accident, **all** major browsers and Node.js limit the interval a setTimeout can accept to a
32 bit signed integer. What that means in essence is that a timeout can never last longer than 24.85 days. Long enough,
right?

The problem is that:

- In human (non-binary) terms, this is a really arbitrary number.
- In long running processes (whether on the web, or in Node), you are limited.
- If the interval you provide overflows this limit, **the timer fires immediately**!

All the arguments about "you shouldn't need intervals this big anyway" go out the window the moment you provide a big
one and instead of never firing, it fires immediately. This is a real problem. And so here we are, Safe Timers solves
this for you.

Does that mean you should forego the browser native setTimeout and setInterval altogether? Absolutely not. Most of the
time, we pass constant short intervals, in which case Safe Timers are overkill. But when your interval comes from some
variable that depends on state or user input, using Safe Timers is a good idea.

## API

### Timeout

There are two ways to create a new `Timeout` instance: `setTimeout` and `setTimeoutAt`.

**Timeout setTimeout(Function callback, number interval, mixed arg1, mixed arg2, ...)**

Creates and returns a `Timeout` instance that will call `callback` after at least `interval` milliseconds have passed. All arguments passed after the `interval` will be passed to the callback once it gets invoked.

```js
const setTimeout = require('safe-timers').setTimeout;

setTimeout(function (msg) {
  console.log(msg);
}, 5000, 'Hello world');
```

**Timeout setTimeoutAt(Function callback, number timestamp, mixed arg1, mixed arg2, ...)**

Creates and returns a `Timeout` instance that will call `callback` when our clock reaches the given `timestamp` (in milliseconds). All arguments passed after the `interval` will be passed to the callback once it gets invoked.

```js
const setTimeoutAt = require('safe-timers').setTimeoutAt;

setTimeoutAt(function (msg) {
  console.log(msg);
}, Date.now() + 5000, 'Hello world');
```

To cancel a `Timeout`, use the instance's `clear` method, or pass it as an argument to `clearTimeout`:

```js
const st = require('safe-timers');
const setTimeout = st.setTimeout;
const clearTimeout = st.clearTimeout;

let timeout1 = setTimeout(function (msg) {
  console.log(msg);
}, 5000, 'Hello world');
let timeout2 = setTimeout(function (msg) {
  console.log(msg);
}, 5000, 'Hello world');

timeout1.clear(); // this clears the timeout
clearTimeout(timeout2); // this also clears the timeout!
```

### Interval

To create an `Interval`, use the `setInterval` function:

**Interval setInterval(Function callback, number interval, mixed arg1, mixed arg2, ...)**

Creates and returns an `Interval` instance that will call `callback` after at least every `interval` milliseconds. All arguments passed after the `interval` will be passed to the callback when it gets invoked.

```js
const setInterval = require('safe-timers').setInterval;

setInterval(function (msg) {
  console.log(msg);
}, 5000, 'Hello world');
```

To cancel an `Interval`, use the instance's `clear` method, or pass it as an argument to `clearInterval`:

```js
const st = require('safe-timers');
const setInterval = st.setInterval;
const clearInterval = st.clearInterval;

const interval1 = setInterval(function (msg) {
  console.log(msg);
}, 5000, 'Hello world');
const interval2 = setInterval(function (msg) {
  console.log(msg);
}, 5000, 'Hello world');

interval1.clear(); // this clears the interval
clearInterval(interval2); // this also clears the interval!
```
