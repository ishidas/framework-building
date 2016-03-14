'use strict';
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
var server = require( __dirname + '/../server.js');

describe('Testing if the server is routing req', function(){
  after(()=> server.close());
  it('should write header when req comes through /articles via get route', (done) =>{
    request('localhost:3000')
    .get('/articles/:id')
    .end((err, res)=>{
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type','text/html');
      done();
    });
  });
  it('should write header when post request is made', (done) =>{
    request('localhost:3000')
    .post('/articles')
    .send({})
    .end((err, res)=>{
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      console.log('Here is err' + err);
      expect(res).to.have.header('content-type','text/html');
      done();
    });
  });
  it('should write head when req come through /articles via delete route', (done)=>{
    console.log('is this test working??');
    request('localhost:3000')
    .delete('/articles/me')
    .send({})
    .end((err, res)=>{
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type','text/html');
      done();
    });
  });
});
