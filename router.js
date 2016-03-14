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
    var id = '/'+ incomingUrl[1] + '/:id';
    var id2 = '/' + incomingUrl[1];
    var routeFunction;
    if(req.method === 'GET'|| req.method ==='DELETE' && req.url !== id){
      console.log('Thi is id : ' + this.routes[req.method][id]);
      routeFunction = this.routes[req.method][id];
    } else if (req.method === 'POST' && req.url !== id2){
      console.log('Thi is id2 : ' + this.routes[req.method][id2]);
      routeFunction = this.routes[req.method][id2];
    }
    routeFunction(req, res);
  };
};

// Router.prototype.getUrl = function(){
//   console.log(this.routes[req.method][req.url]);
//   return this.routes[req.method][req.url];
// };
