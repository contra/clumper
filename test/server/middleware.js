var clumper = require('../../');
var should = require('should');
var request = require('supertest');
require('mocha');

describe('middleware()', function() {
  it('should return a middleware function', function(done) {
    var middle = clumper.middleware(this.fixtures);
    should.exist(middle);
    (typeof middle).should.equal('function');
    middle.length.should.equal(3);
    done();
  });

  it('should error when no root given', function(done) {
    try {
      clumper.middleware();
    } catch (err) {
      should.exist(err);
      done();
    }
  });

  it('should not respond with invalid clumper extension', function(done) {
    request(this.app)
      .get('/clumper.lol?files=a.js,b.js')
      .expect(404)
      .end(done);
  });

  it('should not respond with invalid file extension', function(done) {
    request(this.app)
      .get('/clumper.js?files=a.txt')
      .expect(400)
      .end(done);
  });

  it('should not respond with non-existent file', function(done) {
    request(this.app)
      .get('/clumper.js?files=no-exist.js')
      .expect(404)
      .end(done);
  });

  it('should respond with files via JS', function(done) {
    request(this.app)
      .get('/clumper.js?files=a.js,b.js')
      .expect('Content-Type', 'application/javascript')
      .expect(200)
      .end(done);
  });

  it('should respond with files via JSON', function(done) {
    request(this.app)
      .get('/clumper.json?files=a.js,b.js')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end(done);
  });

  it('should respond with dependencies via JS', function(done) {
    request(this.app)
      .get('/clumper.js?files=c.js')
      .expect('Content-Type', 'application/javascript')
      .expect(200)
      .end(done);
  });

});