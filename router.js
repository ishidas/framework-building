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
    var routeFunction;
    if(req.method === 'GET'|| req.method ==='DELETE' && req.url !== id){
      routeFunction = this.routes[req.method][id];
    } else if (req.method === 'POST'){
      console.log('POST is hit');
      routeFunction = this.routes[req.method][req.url];
    }
    lazyHeaderCreater(req, res);
    routeFunction(req, res);
  };
}; //end of route fn

//lazy header function is created here
function lazyHeaderCreater (req, res){
  return res.lazyHeader = function (typeSelect) {
    if(typeSelect.toUpperCase() === 'TEXT'){
      res.writeHead(200, {'content-type': 'text/html'});
    } else if (typeSelect.toUpperCase() === 'JSON'){
      res.writeHead(200, {'content-type': 'application/json'});
    }
  };
}
