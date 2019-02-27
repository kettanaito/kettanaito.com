---
date: 2019-05-01
category: OSS
author: kettanaito
title: Serverless API mocking with Service Workers
description: Learn how to mock an API without spawning a server, or changing a single character in your existing code base. Intercept production requests, and mock their responses.
thumbnail: https://images.unsplash.com/photo-1550828486-68812fa3f966?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80
keywords: api, mocking, service worker, msw, mock service worker, serverless
---

Following Agile methodologies often means developing in parallel. While it has its benefits, it's certainly hard to assume details about an API that doesn't exist yet.

And the closer your mock is to the actual implementation, the faster it will be to adopt it.

Today I would like to drop some light onto modern technique of API mocking.

---

## Pain points

Let me address what aches me when doing API mocking.

1. **Spawning a server.** All the current tools rely on spawning a dedicated mocking server, which you need to maintain. Obviously, you use packages to establish a server, and those package dependencies bring extra complexity to mocking.
1. **Resource replacement.** It's common to conditionally compose request urls so that your application requests data from a mocking server during development. This serves close to nothing in the future adoption of a real API, as you are effectively **communicating with another server, instead of mocking a non-existing one.**

---

## Using Service Workers

Service Worker is [...]

### How can Service Worker help in API mocking?

---

## Getting started

### 1. Install

```bash
yarn add msw --dev
```

### 2. Generate ServiceWorker

```bash
msw create <rootDir>
```

> Replace `rootDir` with a relative path to your server's root directory.

### 3. Define mocks

Create a simple JavaScript module that describes your mocks.

```js
// src/app/mocks.js
import { msw } from 'msw'

msw.get('https://api.github.com/users/:username', (req, res, { json }) => {
  return res(json({ firstName: 'John', lastName: 'Doe' }))
})

msw.start()
```

### 4. Integrate

Mocking is a **development-only procedure**. We highly recommend to include your mocking module (app/mocks.js) into your application's entry during the build. Please see examples of how this can be done below.

#### Using webpack

```js
// ./webpack.config.js
const __DEV__ = process.env.NODE_ENV === 'development'

module.exports = {
  entry: [
    /* Include mocks when in development */
    __DEV__ && 'src/app/mocks.js',

    /* Include your application's entry */
    'src/app/index.js',
  ].filter(Boolean),

  /* Rest of your config here */
}
```

#### Client-side import

Alternatively, you can import mocking file(s) conditionally in your client bundle.

```js
// src/app/index.js

if (__DEV__) {
  require('./mocks.js')
}
```
