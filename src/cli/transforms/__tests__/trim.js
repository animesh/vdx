const test = require('tape')
const trim = require('../trim')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof trim === 'function')
})

test('throws for unexpected formats', function (t) {
  const unexpectedFormats = ['', 'foo', '5,', '5:']
  t.plan(unexpectedFormats.length)
  unexpectedFormats.forEach(function (unexpectedFormat) {
    t.throws(function () {
      trim(unexpectedFormat)
    })
  })
})

test('parses start duration, specified in seconds', function (t) {
  t.plan(1)
  const actual = trim('5')
  const expected = {
    start: '5'
  }
  t.deepEqual(actual, expected)
})

test('parses start and end durations, specified in seconds', function (t) {
  t.plan(1)
  const actual = trim('5,10')
  const expected = {
    start: '5',
    end: '10'
  }
  t.deepEqual(actual, expected)
})

test('parses start duration, specified as a timestamp', function (t) {
  t.plan(1)
  const actual = trim('0:05')
  const expected = {
    start: '0:05'
  }
  t.deepEqual(actual, expected)
})

test('parses start and end durations, specified as timestamps', function (t) {
  t.plan(1)
  const actual = trim('0:05,02:03:04.567')
  const expected = {
    start: '0:05',
    end: '02:03:04.567'
  }
  t.deepEqual(actual, expected)
})
