Generate non-standard InnoDB-optimized UUIDs in JavaScript

## About
 
If you are using MySQL, [uuids can add overhead](http://www.percona.com/blog/2014/12/19/store-uuid-optimized-way/). We can create
more performant, but non-standard UUIDs that help speed up insets
and is sized to fit inside a binary(16) column.

[![Build Status](https://travis-ci.org/fisdap/innodb-optimized-uuid.svg)](https://travis-ci.org/fisdap/innodb-optimized-uuid)

Here are the steps involved in this process:

1. 13341cb5-c1f8-11e4-91e7-080027880ca6 (Standard UUID v1)
2. 11e4-c1f8-13341cb5-91e7-080027880ca6 (Transposed, non-standard UUID)
3. 11E4C1F813341CB591E7080027880CA6 (Resized, transposed, non-standard UUID)

## Usage Instructions

### Install (node.js using npm)

```bash
npm install innodb-optimized-uuid
```

###  Install (browser using bower)

```bash
bower install innodb-optimized-uuid
```

```html
<script src="bower_components/innodb-optimized-uuid/dist/innodb-optimized-uuid.js"></script>
```

### Include 

```js
var iouuid = require('innodb-optimized-uuid');
```

### Generate a non-standard InnoDB-optimized UUID

```js
iouuid.generate();
```

## Output

The above steps will output non-standard InnoDB-optimized UUID in this format:

```
11E4C1F813341CB591E7080027880CA6
```

### Development

## Tests

Clone this repo.
Run `npm install && npm test`

## Browser example

1. Clone the repo
2. `npm install -g liveserver`
3. run `live-server` in the project root

## Building

To build, simply execute:
`gulp build`

## Increasing (bumping) version

Commit all of your changes locally.
For a patch version bump: `gulp patch`
For a minor version bump: `gulp minor`
For a major version bump: `gulp major`
Then finally push using: `git push origin master --tags`

