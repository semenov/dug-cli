#!/usr/bin/env node
"use strict";

var request = require('request');
var tar = require('tar');
var zlib = require('zlib');
var path = require('path');
var child_process = require('child_process');
var fs = require('fs');
var R = require('ramda');
var pipe = R.pipe;

var cwd = process.cwd();

var program = require('commander');

program.version('0.0.1');

program
    .command('init')
    .action(function() {
        console.log('init');
        var templateUrl = 'https://github.com/semenov/drug-template/archive/v0.0.1.tar.gz';
        var outputDir = cwd;

        console.log('Downloading project template');

        request(templateUrl)
            .pipe(zlib.Unzip())
            .pipe(tar.Extract({ path: outputDir, strip: 1 }));
    });

program
    .command('start')
    .action(function() {
        console.log('Running start command');
        var taskPath = path.join(cwd, 'tasks/watch');
        var watch = require(taskPath);
        watch();
    });

function touchFile(filepath) {
    var fd = fs.openSync(filepath, 'a');
    fs.closeSync(fd);
}

function createDir(dirPath) {
    try {
        fs.mkdirSync(dirPath);
    } catch (e) {
        if (e.code != 'EEXIST') {
            throw e;
        }
    }
}

function makeComponentPath(baseDir, name) {
    return path.join(baseDir, 'components', name);
}

function makeFilePath(baseDir, name, extension) {
    let filename = name + '.' + extension;
    return path.join(makeComponentPath(baseDir, name), filename);
}

var createComponentDir = pipe(
    makeComponentPath,
    createDir
);

var createFile = pipe(
    makeFilePath,
    touchFile
);

program
    .command('component')
    .action(function(name) {
        console.log('Running component command with name', name);

        createComponentDir(cwd, name);
        createFile(cwd, name, 'js');
        createFile(cwd, name, 'css');
    });

program.parse(process.argv);




