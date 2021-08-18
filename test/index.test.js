const test = require('ava');
const spawnPromise = require('../src/index.js');

test('general utf8', function(t) {
  const bin = 'node';
  const args = ['-e', 'console.log("foo");console.error("bar")'];
  const options = {encoding: 'utf8'};

  return spawnPromise(bin, args, options).then(function(result) {
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
    t.deepEqual(result.parameters[0], bin, 'bin');
    t.deepEqual(result.parameters[1], args, 'args');
    t.deepEqual(result.parameters[2], options, 'options');
  });
});

test('general buffer', function(t) {
  const bin = 'node';
  const args = ['-e', 'console.log("foo");console.error("bar")'];

  return spawnPromise(bin, args).then(function(result) {
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
    t.deepEqual(result.parameters[0], bin, 'bin');
    t.deepEqual(result.parameters[1], args, 'args');
    t.falsy(result.parameters[2], 'options');
  });
});

test('error', function(t) {
  const bin = 'this-does-not-exist-please';
  const args = [];

  return spawnPromise(bin, args).then(function(result) {
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
    t.deepEqual(result.parameters[0], bin, 'bin');
    t.deepEqual(result.parameters[1], args, 'args');
    t.falsy(result.parameters[2], 'options');
  });
});
