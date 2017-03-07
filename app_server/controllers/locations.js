var request = require('request');
var apiOptions = {
  server : "http://localhost:8080"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://getting-mean-loc8r.herokuapp.com";
}



module.exports.login = function(req, res){
  res.render('login', {});
};

module.exports.register = function(req, res){
  res.render('registertest', {});
};
