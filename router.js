'use strict';
var Router = module.exports = function(){
  this.routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'DELETE': {}
  };
};

Router.prototype.get = function(route, cb){
  this.routes['GET'][route] = cb;
};

Router.prototype.post = function(route, cb){
  this.routes['POST'][route] = cb;
};

Router.prototype.PUT = function(route, cb){
  this.routes['POST'][route] = cb;
};

Router.prototype.delete = function (route, cb) {
  this.routes['DELETE'][route] = cb;
};

Router.prototype.route = function () {
  return (req, res) => {
    var incomingUrl = req.url.split('/');
    var id = '/'+ incomingUrl[1] + '/:id';
    // var id2 = '/' + incomingUrl[1];
    var routeFunction;
    if(req.method === 'GET'|| req.method ==='DELETE' && req.url !== id){
      routeFunction = this.routes[req.method][id];
    } else if (req.method === 'POST'){
      console.log('POST is hit');
      routeFunction = this.routes[req.method][req.url];
    }

    //lazy header function is created here
    res.lazyHeader = function (type) {
      if(type.toUpperCase() === 'TEXT'){
        console.log(type);
        res.writeHead(200, {'content-type': 'text/html'});
      }
      // still working on my lazyHeader for json format
      // } else if (type.toUpperCase() === 'JSON'){
      //   console.log('Here is JSON content-type setter: ' + type);
      //   res.writeHead(200, {'content-type': 'application/json'});
      // }
    };
    routeFunction(req, res);
  };
};
