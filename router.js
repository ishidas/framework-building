'use strict';
var Router = module.exports = function(){
  this.routes = {
    'GET': {},
    'POST': {},
    // 'PATCH': {},
    'DELETE': {}
  };
};

Router.prototype.get = function(route, cb){
  this.routes['GET'][route] = cb;
};

Router.prototype.post = function(route, cb){
  this.routes['POST'][route] = cb;
};

// Router.prototype.patch = function (route, cb) {
//   this.routes['PATCH'][route] = cb;
// };

Router.prototype.delete = function (route, cb) {
  this.routes['DELETE'][route] = cb;
};

Router.prototype.route = function () {
  return (req, res) => {
    var incomingUrl = req.url.split('/');
    var routeFunction = this.routes[req.method][req.url];
    if(incomingUrl[2] !== ':id' ){
      req.url = '/' + incomingUrl[1] + '/' + incomingUrl[2];
    }

    console.log(incomingUrl);
    console.log(req.method);
    routeFunction(req, res);
  };
};

// Router.prototype.getUrl = function(){
//   console.log(this.routes[req.method][req.url]);
//   return this.routes[req.method][req.url];
// };
