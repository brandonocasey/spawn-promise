# @brandonocasey/spawn-promise

A wrapper around spawn that returns a promise with the similar output to spawnSync.


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Install `@brandonocasey/spawn-promise` and `in-publish` via npm

```sh
$ npm install --save-dev @brandonocasey/spawn-promise in-publish
```

## Usage

Similar to `child_process.spawnSync` except we return a promise and use `child_process.spawn` internally. See the return value of `childProcess.spawnSync` for what the promise will be resolved with. In addion to the usual return values we also add in `stdin` and `combined`. `combined` is mixed stdout/stderr output.


## Support
Currently we support 1 to 1 the spawn API from child_process, but signals, killing, and stdin support has not been tested.
