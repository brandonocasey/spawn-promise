const test = require('ava');
const spawnPromise = require('../src/index.js');

test('general utf8', function(t) {
  return spawnPromise('node', ['-e', 'console.log("foo");console.error("bar")'], {encoding: 'utf8'}).then(function(result) {
    t.deepEqual(result.stdin, null, 'stdin');
    t.deepEqual(result.combined, 'foo\nbar\n', 'combined');
    t.deepEqual(result.stdout, 'foo\n', 'stdout');
    t.deepEqual(result.stderr, 'bar\n', 'stderr');
    t.deepEqual(result.output[0], null, 'output[0]');
    t.deepEqual(result.output[1], 'foo\n', 'output[1]');
    t.deepEqual(result.output[2], 'bar\n', 'output[2]');
    t.is(result.error, null, 'error');
    t.truthy(result.pid, 'pid');
    t.is(result.status, 0, 'status');
    t.is(result.signal, null, 'signal');
  });
});

test('general buffer', function(t) {
  return spawnPromise('node', ['-e', 'console.log("foo");console.error("bar")']).then(function(result) {
    t.deepEqual(result.stdin, null, 'stdin');
    t.deepEqual(result.combined, Buffer.from('foo\nbar\n'), 'combined');
    t.deepEqual(result.stdout, Buffer.from('foo\n'), 'stdout');
    t.deepEqual(result.stderr, Buffer.from('bar\n'), 'stderr');
    t.deepEqual(result.output[0], null, 'output[0]');
    t.deepEqual(result.output[1], Buffer.from('foo\n'), 'output[1]');
    t.deepEqual(result.output[2], Buffer.from('bar\n'), 'output[2]');
    t.is(result.error, null, 'error');
    t.truthy(result.pid, 'pid');
    t.is(result.status, 0, 'status');
    t.is(result.signal, null, 'signal');
  });
});

test('error', function(t) {
  return spawnPromise('this-does-not-exist-please', []).then(function(result) {
    t.deepEqual(result.stdin, null, 'stdin');
    t.deepEqual(result.combined, Buffer.from(''), 'combined');
    t.deepEqual(result.stdout, Buffer.from(''), 'stdout');
    t.deepEqual(result.stderr, Buffer.from(''), 'stderr');
    t.deepEqual(result.output[0], null, 'output[0]');
    t.deepEqual(result.output[1], Buffer.from(''), 'output[1]');
    t.deepEqual(result.output[2], Buffer.from(''), 'output[2]');
    t.truthy(result.error, 'error');
    t.falsy(result.pid, 'pid');
    t.not(result.status, 0, 'status');
    t.is(result.signal, null, 'signal');
  });
});
