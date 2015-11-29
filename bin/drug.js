#!/usr/bin/env node

var request = require('request');
var tar = require('tar');
var zlib = require('zlib');
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
        console.log('start');
        var child = child_process.exec('npm run dev', function(err) {
            console.log('Done');
        });

        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
    });


program.parse(process.argv);




