# FastAbortController

fast abort controller implementation that can be used as a ponyfill/polyfill

# Installation

```sh
npm i --save fast-abort-controller
```

# Usage

#### Supports both ESM and CommonJS

```js
// esm
import AbortController from 'fast-abort-controller'
// commonjs
const AbortController = require('fast-abort-controller').default
```

# Example with Fetch (which supports abort signals)

```js
import AbortController from 'fast-abort-controller'

const controller = new AbortController()

const signal = controller.signal

function cancel() {
  signal.abort()
}

try {
  await fetch('codeshare.io', { signal })
  console.log('request success')
} catch (err) {
  if (err.name === 'AbortError') {
    console.warn('request aborted')
  } else {
    console.error('request error', err)
  }
}

// ...
```

# Example with raceAbort

```js
import { readFile } from 'fs/promises'

import AbortController from 'fast-abort-controller'
import raceAbort from 'race-abort'

const controller = new AbortController()

const signal = controller.signal

function cancel() {
  signal.abort()
}

try {
  // readFile doesnt support cancellation so we wrap it with raceAbort provided by another module 'race-abort'
  raceAbort(readFile('foo/bar/qux'), signal)
  console.log('request success')
} catch (err) {
  if (err.name === 'AbortError') {
    console.warn('request aborted')
  } else {
    console.error('request error', err)
  }
}
```

# License

MIT
