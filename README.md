Generate non-standard InnoDB-optimized UUIDs in JavaScript

## About
 
If you are using MySQL, [uuids can add overhead](http://www.percona.com/blog/2014/12/19/store-uuid-optimized-way/). We can create
more performant, but non-standard UUIDs that help speed up insets
and is sized to fit inside a binary(16) column.

[![Build Status](https://travis-ci.org/fisdap/innodb-optimized-uuid.svg)](https://travis-ci.org/fisdap/innodb-optimized-uuid) [![Dependency Status](https://gemnasium.com/fisdap/innodb-optimized-uuid.svg)](https://gemnasium.com/fisdap/innodb-optimized-uuid) [![Code Climate](https://codeclimate.com/github/fisdap/innodb-optimized-uuid/badges/gpa.svg)](https://codeclimate.com/github/fisdap/innodb-optimized-uuid) [![Test Coverage](https://codeclimate.com/github/fisdap/innodb-optimized-uuid/badges/coverage.svg)](https://codeclimate.com/github/fisdap/innodb-optimized-uuid)

Here are the steps involved in this process:

1. 13341cb5-c1f8-11e4-91e7-080027880ca6 (Standard UUID v1)
2. 11e4-c1f8-13341cb5-91e7-080027880ca6 (Transposed, non-standard UUID)
3. 11E4C1F813341CB591E7080027880CA6 (Resized, transposed, non-standard UUID)

## Usage Instructions

### Install (in Node.js and/or Webpack)

```bash
npm install innodb-optimized-uuid --save-exact
```

If using Node or Webpack w/commonJS, import using:

```js
var iouuid = require('innodb-optimized-uuid');
```

Or if using ES6 module syntax, import using:

```js
import {iouuid} from 'innodb-optimized-uuid';
```

Note that if you're using Webpack, you should include [babel-loader](https://github.com/babel/babel-loader) if you wish you use the ES6 syntax. Here is an example webpack.config.js that you might use.

```js
module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
}
```


###  Install and Include (using bower)

```bash
bower install innodb-optimized-uuid
```

```html
<script src="bower_components/innodb-optimized-uuid/dist/innodb-optimized-uuid.js"></script>
```

```js
var iouuid = window.innodbOptimizedUuid;
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

## Increasing (bumping) the current version

Commit all of your changes locally.

For a patch version bump: `gulp patch`
For a minor version bump: `gulp feature`
For a major version bump: `gulp release`

Then, finally publish to github/bower and npm using: `gulp publish`

