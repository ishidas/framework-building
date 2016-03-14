# framework-building
Routing using RESTful Api, GET, POST DELETE method.

# Basic Usage
```javascript
var http = require('http');
var Router = require('./router.js');

//Your routing constructor object name
var YourRouterName = new Router();

YourRouterName.get('/example/:id', function(req, res){

  //writing a header {'content-type': 'text/html'}. It only works on text for now.
  res.lazyHeader('text');
})

//creating http server calls
http.createServer(YourRouterName.route()).listen(3000, function(){
  console.log('listening to port 3000...');
});
```

## How to Use
In command line:
```
npm init
```
