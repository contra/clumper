var path = require('path');

module.exports = function(folder, file){
  if (path.extname(file) === '') {
    file += '.js';
  }
  return path.join(folder, file);
};