'use strict';
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
var server = require( __dirname + '/../server.js');

describe('Testing if the server is routing req', function(){
  after(()=> server.close());
  it('should write head when req come through /articles via get route', (done) =>{
    request('localhost:3000')
    .get('/articles')
    .end((err, res)=>{
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should write head when req come through /articles via post route', (done) =>{
    request('localhost:3000')
    .post('/articles')
    .send({})
    .end((err, res)=>{
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should write head when req come through /articles via delete route', (done)=>{
    console.log('is this test working??');
    request('localhost:3000')
    .delete('/articles')
    .send({'content-type': 'text/html'})
    .end((err, res)=>{
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
});
