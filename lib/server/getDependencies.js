var async = require('async');
var fs = require('graceful-fs');
var getDependencies = require('detective-amd');
var path = require('path');

var getDependenciesForFile = function(fpath, cb) {
  fs.readFile(fpath, function(err, contents){
    if (err) return cb(err);

    var deps = getDependencies(contents);
    var depFiles = deps.map(function(file){
      // TODO: check if file already has js ext
      return path.join(path.dirname(fpath), file+'.js');
    });

    async.concat(depFiles, getDependenciesForFile, function(err, files){
      files.push({
        path: fpath,
        content: contents
      });
      cb(null, files);
    });
  });
};

module.exports = function(paths, cb) {
  async.concat(paths, getDependenciesForFile, cb);
};