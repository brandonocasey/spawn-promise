const spawn = require('child_process').spawn;
const exitHook = require('exit-hook');

const getDefault = (encoding) => encoding === 'buffer' ? Buffer.from('') : '';
const concatChunks = (a, b) => {
  if (Buffer.isBuffer(a)) {
    return Buffer.concat([a, b]);
  }

  return a + b;
};

const spawnPromise = function(bin, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, options);
    const removeHook = exitHook(() => child.kill());
    const encoding = options && options.encoding || 'buffer';

    const result = {
      parameters: [bin, args, options],
      pid: child.pid,
      output: [],
      stdin: null,
      stdout: getDefault(encoding),
      stderr: getDefault(encoding),
      combined: getDefault(encoding),
      error: null,
      status: null,
      signal: null
    };

    child.stdout.on('data', function(chunk) {
      result.stdout = concatChunks(result.stdout, chunk);
      result.combined = concatChunks(result.combined, chunk);
    });

    child.stderr.on('data', function(chunk) {
      result.stderr = concatChunks(result.stderr, chunk);
      result.combined = concatChunks(result.combined, chunk);
    });

    child.stdin.on('data', function(chunk) {
      if (result.stdin === null) {
        result.stdin = getDefault(encoding);
      }

      result.stdin = concatChunks(result.stdin, chunk);
    });

    child.on('error', function(error) {
      result.error = error;
    });

    child.on('close', function(status) {
      removeHook();
      result.signal = child.signalCode;
      result.status = status;
      result.output = [result.stdin, result.stdout, result.stderr];
      resolve(result);
    });
  });
};

module.exports = spawnPromise;
