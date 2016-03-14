var http = require('http');
var fs = require('fs');
var Router = require('./router.js');

var Articles = new Router();



Articles.get('/articles/:id', (req, res) => {
  // res.writeHead(200, {'content-type': 'text/html'});
  res.lazyHeader('text');
  res.write('Hello World');
  res.end();
});

Articles.post('/articles', (req, res) =>{
  var date = new Date();
  var time = date.getTime();
  var array = [];

  req.on('data', (data) =>{
    console.log('Is this buffer? : ' + data);
    array.push(data);
  });
  req.on('end',function(){
    fs.writeFile( __dirname + '/log/' + time + '.txt',array, (err)=>{
      console.log('This is err : ' + err);
      console.log('This is array : ' + array);
      console.log('time : ' + time);
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
      console.log('This is file deleting err : ' + err);
    }
  });
});

module.exports = http.createServer(Articles.route()).listen(3000, function(){
  console.log('listening to port 3000...');
});
