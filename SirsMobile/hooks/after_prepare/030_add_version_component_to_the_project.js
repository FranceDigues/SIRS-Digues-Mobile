#!/usr/bin/env node

var fs = require('fs');
var androidjson = require('../../platforms/android/android.json');
var parse = require('himalaya').parse;

var pathdir = 'www/js/data/';

if (fs.existsSync('../../platforms/android/android.json')) {
  if (!fs.existsSync(pathdir)) {
    fs.mkdirSync(pathdir);
  }

  fs.open(pathdir + 'version.json', 'w', function () {
    fs.readFile('./www/index.html', 'utf8', function (err, html) {
      getPouchDbVersion(html, err);
      fs.writeFile(pathdir + 'version.json', JSON.stringify(androidjson.plugin_metadata, null, 2));
    });
  });

  function getPouchDbVersion(html, err) {
    if (err) {
      return console.error(err);
    }
    const json = parse(html);
    let scripts = json[2].children[1].children.filter(function (elem) {
      return (elem.type === "element" && elem.tagName === "script");
    });
    let pouchdbObj = scripts.filter(function (elem) {
      return elem.attributes[0].value.includes("pouchdb-");
    })[0];
    let pouchdbFull = pouchdbObj.attributes[0].value
    pouchdbFull = pouchdbFull.split('/')[2].split('-');
    let versionFull = pouchdbFull[1].split('.');
    versionFull.pop();
    versionFull.pop();
    let version = versionFull.join('.');
    androidjson.plugin_metadata.pouchdb = version;
  }
} 
