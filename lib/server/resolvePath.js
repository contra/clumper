var path = require('path');
var resolve = require('resolve-path');

module.exports = function(root, file){
  if (path.extname(file) === '') {
    file += '.js';
  }

  try {
    return resolve(root, file);
  } catch (err) {
    return path.join(root, path.basename(file));
  }
};