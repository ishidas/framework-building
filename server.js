var http = require('http');
var fs = require('fs');
var Router = require('./router.js');
// var url = require('url');
var Articles = new Router();
// var urlNums;

Articles.get('/articles', (req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  console.log('I am here at get.');
  res.end();
});

Articles.post('/articles', (req, res) =>{
  // console.dir('Here is current : ' + url.pathname);
  var date = new Date();
  var time = date.getTime();
  req.on('data', (data) =>{
    var incoming = data.toString();
    console.log('stringified data : ' + incoming );
    fs.writeFile( __dirname + '/log/' + time + '.txt', date + ' ' + time, (err)=>{
      console.log(err);
      res.writeHead(200, {'content-type': 'text/html'});
      console.log('my post: ' + data);
      res.end();
    });
  });
});

Articles.delete('/articles' , (req, res) => {
  fs.readdir( __dirname + '/log', (err, files)=>{
    try {
      res.writeHead(200, {'content-type': 'text/html'});
      files.forEach((file)=>{
        fs.unlink( __dirname + '/log/' + file);
      });
      console.log('delete is working');
      res.end();
    } catch (err){
      console.log('This is file deleting err : ' + err);
    }
  });
});

module.exports = http.createServer(Articles.route()).listen(3000, function(){
  console.log('listening to port 3000...');
});
