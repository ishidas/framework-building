var http = require('http');
// var fs = require('fs');
var Router = require('./router.js');

var Articles = new Router();

Articles.get('/articles', (req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  console.log('I am here at get.');
  res.end();
});

Articles.post('/articles', (req, res) =>{
  req.on('data', (data) =>{
    res.writeHead(200, {'content-type': 'text/html'});
    console.log('my post: ' + data);
    res.end();
  });
});

Articles.delete('/articles', (req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  console.log('delete is working');
  res.end();
});

module.exports = http.createServer(Articles.route()).listen(3000, function(){
  console.log('listening to port 3000...');
});
