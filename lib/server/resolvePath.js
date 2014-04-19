var path = require('path');

module.exports = function(folder, file){
  // sanitize it
  file = path.normalize(file).replace('..', '');
  if (path.extname(file) === '') {
    file += '.js';
  }
  return path.join(folder, file);
};