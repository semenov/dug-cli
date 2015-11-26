#!/usr/bin/env node

var request = require('request');
var tar = require('tar');
var zlib = require('zlib');

var cwd = process.cwd();
var templateUrl = 'https://github.com/semenov/drug-template/archive/v0.0.1.tar.gz';
var outputDir = cwd;


console.log('Downloading project template');

request(templateUrl)
    .pipe(zlib.Unzip())
    .pipe(tar.Extract({ path: outputDir, strip: 1 }));





