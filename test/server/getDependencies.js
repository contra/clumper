var clumper = require('../../');
var should = require('should');
var path = require('path');
require('mocha');

describe('getDependencies()', function() {
  it('a.js should have no dependencies', function(done) {
    var fpath = path.join(this.fixtures, './a.js');
    clumper.getDependencies([fpath], function(err, files){
      should.not.exist(err);
      should.exist(files);
      files.length.should.equal(1);
      files[0].path.should.equal(fpath);
      done();
    });
  });

  it('b.js should have one dependency', function(done) {
    var fpath = path.join(this.fixtures, './b.js');
    clumper.getDependencies([fpath], function(err, files){
      should.not.exist(err);
      should.exist(files);
      files.length.should.equal(1);
      files[0].path.should.equal(fpath);
      done();
    });
  });

  it('c.js should have three dependencies', function(done) {
    var fpath = path.join(this.fixtures, './c.js');
    clumper.getDependencies([fpath], function(err, files){
      should.not.exist(err);
      should.exist(files);
      files.length.should.equal(3);
      files[2].path.should.equal(fpath);
      done();
    });
  });

  it('should not include duplicates for cross-over dependencies', function(done) {
    var fpath = path.join(this.fixtures, './a.js');
    var fpath2 = path.join(this.fixtures, './b.js');
    var fpath3 = path.join(this.fixtures, './c.js');
    clumper.getDependencies([fpath, fpath2, fpath3], function(err, files){
      should.not.exist(err);
      should.exist(files);
      files.length.should.equal(3);
      files[0].path.should.equal(fpath);
      done();
    });
  });


});