'use strict';
const http = require('http');
const fs = require('fs');
const Router = require('./router.js');
const Articles = new Router();
const debug = require('debug')('http:server');

Articles.get('/articles/:id', (req, res) => {
  res.lazyHeader('json');
  res.write('Hello World');
  res.end();
});

Articles.post('/articles', (req, res) =>{
  var date = new Date();
  var time = date.getTime();
  var array = [];

  req.on('data', (data) =>{
    debug('Is this buffer? : ', data);
    array.push(data);
  });
  req.on('end',function(){
    fs.writeFile( __dirname + '/log/' + time + '.txt',array, (err)=>{
      debug('This is err : ', err);
      debug('This is array : ', array);
      debug('time : ', time);
      // res.writeHead(200, {'content-type': 'text/html'});
    });
    res.lazyHeader('text');
    res.write('Hello');
    res.end();
  });
});

Articles.delete('/articles/:id', (req, res) => {
  fs.readdir( __dirname + '/log', (err, files)=>{
    try {
      // res.writeHead(200, {'content-type': 'text/html'});
      res.lazyHeader('text');
      files.forEach((file)=>{
        fs.unlink( __dirname + '/log/' + file);
      });
      res.end();
    } catch (err){
      debug('This is file deleting err : ', err);
    }
  });
});

module.exports = http.createServer(Articles.route()).listen(3000, ()=>{
  debug('listening to port 3000...');
});
