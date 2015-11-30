#!/usr/bin/env node

var request = require('request');
var tar = require('tar');
var zlib = require('zlib');
var path = require('path');
var child_process = require('child_process');

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


program.parse(process.argv);




