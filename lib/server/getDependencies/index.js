var async = require('async');
var fs = require('graceful-fs');
var getDependencies = require('detective-amd');
var path = require('path');
var resolvePath = require('../resolvePath');

var getDependenciesForFile = function(runningTotal, fpath, cb) {
  var recurse = getDependenciesForFile.bind(null, runningTotal);
  var baseFolder = path.dirname(fpath);
  var dedupe = function(path) {
    return runningTotal.indexOf(path) === -1;
  };

  var resolve = resolvePath.bind(null, baseFolder);

  fs.readFile(fpath, function(err, contents){
    if (err) return cb(err);

    var deps = getDependencies(contents);
    var depFiles = deps.map(resolve).filter(dedupe);

    async.concat(depFiles, recurse, function(err, files){
      files.push({
        path: fpath,
        content: contents
      });

      files.forEach(function(file){
        runningTotal.push(file.path);
      });

      cb(null, files);
    });
  });
};

module.exports = function(paths, cb) {
  var runningTotal = [];
  var depScan = getDependenciesForFile.bind(null, runningTotal);
  async.concat(paths, depScan, cb);
};