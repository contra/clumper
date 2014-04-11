var express = require('express');
var path = require('path');
var clumper = require('../');

// give each test an unused port
beforeEach(function(done){
  this.fixtures = path.join(__dirname, './fixtures');
  this.app = express();
  this.app.use(clumper.middleware(this.fixtures));
  done();
});
