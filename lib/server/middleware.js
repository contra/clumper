var parseurl = require('parseurl');
var path = require('path');
var url = require('url');
var getDependencies = require('./getDependencies');
var resolvePath = require('./resolvePath');

var regex = /^\/clumper.(js|json)$/;

module.exports = function(root) {
  if (!root) throw new TypeError('root path required');

  // resolve root to absolute
  root = path.resolve(root);

  return function(req, res, next) {
    if ('GET' !== req.method && 'HEAD' !== req.method) return next();

    var pathname = parseurl(req).pathname;
    var formatMatches = pathname.match(regex);
    if (!formatMatches) return res.send(404);
    var format = formatMatches[1];

    if (typeof req.query.files !== 'string') return next();
    var files = req.query.files.split(',');
    if (files.length === 0) return res.send(400);

    var invalidExt = files.some(function(file){
      return path.extname(file) !== '.js';
    });
    if (invalidExt) return res.send(400);

    var filePaths = files.map(resolvePath.bind(null, root));

    getDependencies(filePaths, function(err, filesToServe){
      if (err) {
        if (err.code === 'ENOENT') return res.send(404);
        return res.send(500);
      }

      if (format === 'js') {
        res.type('js');
        // TODO: rescope
        var content = filesToServe.map(function(f){
          return f.contents;
        }).join('\n');
        res.send(200,content);
      }
      
      if (format === 'json') {
        res.type('json');
        res.send(200, filesToServe);
      }

    });
  };
};