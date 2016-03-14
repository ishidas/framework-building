var http = require('http');
var fs = require('fs');
var Router = require('./router.js');

var Articles = new Router();



Articles.get('/articles/:id', (req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  res.write('Hello World');
  // console.log('I am here at get.');
  res.end();
});

Articles.post('/articles', (req, res) =>{
  var date = new Date();
  var time = date.getTime();
  req.on('data', (data) =>{
    fs.writeFile( __dirname + '/log/' + time + '.txt', date + ' ' + time, (err)=>{
      console.log(err);
      res.writeHead(200, {'content-type': 'text/html'});
      console.log('my post: ' + data);
      res.write('Hello');
      res.end();
    });
  });
});

Articles.delete('/articles', (req, res) => {
  fs.readdir( __dirname + '/log', (err, files)=>{
    try {
      res.writeHead(200, {'content-type': 'text/html'});
      files.forEach((file)=>{
        fs.unlink( __dirname + '/log/' + file);
      });
      // console.log('delete is working');
      res.end();
    } catch (err){
      // console.log('This is file deleting err : ' + err);
    }
  });
});

module.exports = http.createServer(Articles.route()).listen(3000, function(){
  console.log('listening to port 3000...');
});
