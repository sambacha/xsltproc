/* eslint-disable func-names */
/* eslint-disable consistent-return */
/*
 * xsltproc
 * https://github.com/ilyar/xsltproc
 *
 * Copyright (c) 2014 Ilya Rogov
 * Licensed under the MIT license.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const which = require('which').sync;

/**
 * xslt processor
 * @param stylesheet
 * @param file
 * @param options
 * @returns EventEmitter
 */
exports.transform = function (stylesheet, file, options) {
  let cmd = 'xsltproc';
  const args = this.getArgs(options);

  args.push(stylesheet);
  args.push(file);

  try {
    cmd = which(cmd);
  } catch (err) {
    console.error(err); // code 127
    return;
  }

  const xslt = spawn(cmd, args);

  if (options && typeof options.profile !== 'undefined') {
    xslt.stderr.on('data', (data) => {
      const profilePath = options.profile === true ? 'profile.txt' : options.profile;

      fs.writeFile(profilePath, data, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  }

  if (options && typeof options.debug !== 'undefined') {
    console.log(args);
  }
  return xslt;
};

/**
 * Parses received string params.
 *
 * @param stringParam
 * @param args
 */
function parseStringParam(stringParam, args) {
  // check if it's an array of multiple stringparam
  if (Array.isArray(stringParam)) {
    stringParam.forEach((param) => {
      args.push('--stringparam', param.key, param.val);
    });
  } else { // if it's only one stringparam
    args.push('--stringparam', stringParam.key, stringParam.val);
  }
}

/**
 * Gating arguments
 * @param options
 * @returns {Array}
 */
exports.getArgs = function (options) {
  const args = [];

  // do XInclude processing on document input
  if (options && typeof options.xinclude !== 'undefined') {
    args.push('--xinclude');
  }

  // skip the DTD loading phase
  if (options && typeof options.novalid !== 'undefined') {
    args.push('--novalid');
  }

  // the input string param, multiple stringparam
  if (options && typeof options.stringparam !== 'undefined') {
    parseStringParam(options.stringparam, args);
  }

  //  dump profiling informations
  if (options && typeof options.profile !== 'undefined') {
    args.push('--profile');
  }

  // save to a given file
  if (options && typeof options.output !== 'undefined') {
    args.push('--output', options.output);
  }

  // the input document character encoding
  if (options && typeof options.encoding !== 'undefined') {
    args.push('--encoding', options.encoding);
  }

  return args;
};
