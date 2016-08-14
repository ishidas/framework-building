# framework-building
Routing using RESTful Api, GET, POST DELETE method. Basic http code provided by Charlie Crawford III.

# Basic Usage
```javascript
const http = require('http');
const Router = require('./router.js');
//Your routing constructor object name
const YourRouterName = new Router();

YourRouterName.get('/example/:id', (req, res) => {
  //writing a header {'content-type': 'text/html'}.
  res.lazyHeader('text');
  
  // writing a header {'content-type': 'application/json'}
  // Make sure what you write is json, otherwise errors.
  res.lazyHeader('json');

})

//creating http server calls
http.createServer(YourRouterName.route()).listen(3000, function(){
  debug('listening to port 3000...');
});
