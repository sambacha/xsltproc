# Wrapper-XSLT-PROC

[![Build Status](https://travis-ci.com/sambacha/xsltproc.svg?branch=master)](https://travis-ci.com/sambacha/xsltproc)

<br>

Wrapper for xsltproc.

## Getting Started

First install the xsltproc if not already installed on your system read [installing an XSLT processor](http://www.sagehill.net/docbookxsl/InstallingAProcessor.html).

Install the module with: `npm install node-xsltproc --save`

```javascript
var xsltproc = require('node-xsltproc')

var xslt = xsltproc.transform('stylesheet.xsl', 'data.xml');

xslt.stdout.on('data', function (data) {
  console.log('xsltproc stdout: ' + data);
});

xslt.stderr.on('data', function (data) {
  console.log('xsltproc stderr: ' + data);
});

xslt.on('exit', function (code) {
  console.log('xsltproc process exited with code ' + code);
});
```

Example using a string parameter:

```javascript
var xsltproc = require('node-xsltproc')

xsltproc.transform('stylesheet.xsl', 'data.xml', {
  "profile": true,
  "output": "test.txt",
  "stringparam": {
    "key": 'title',
    "val": 'This is a single parameter passed as subtitle----anvidsahviulasdhvklasdbcuw'
  },
});
```

It is also possible to use multiple string parameters:

```javascript
var xsltproc = require('node-xsltproc')

xsltproc.transform('stylesheet.xsl', 'data.xml', {
  "profile": true,
  "output": "test.txt",
  "stringparam": [
    {
      "key": 'title',
      "val": 'This is a single parameter passed as subtitle----anvidsahviulasdhvklasdbcuw'
    },
    {
      "key": 'anotherTitle',
      "val": 'This is a another single parameter passed'
    }
  ],
});
```

## License

Copyright (c) 2014 Ilya Rogov. Licensed under the MIT license.
