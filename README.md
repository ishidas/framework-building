# framework-building
Routing using RESTful Api, GET, POST DELETE method.

# Basic Usage
```javascript
var http = require('http');
var Router = require('./router.js');

//Your routing constructor object name
var YourRouterName = new Router();


//creating http server calls
http.createServer(YourRouterName.route()).listen(3000, function(){
  console.log('listening to port 3000...');
});
```
