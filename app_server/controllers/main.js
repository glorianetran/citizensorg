/* GET home page.*/
// module.exports.index = function (req, res){
//     res.render('index',{title: 'CitizensOrg'});
// };
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
module.exports.homepage = function (req, res){
    res.render('homepage',{title: 'CitizensOrg'});
};

module.exports.about = function (req, res){
    res.render('about',{title: 'About'});
};

module.exports.register = function (req, res){
    res.render('register',{title: 'Register'});
};

module.exports.login = function (req, res){
    res.render('login',{title: 'Login'});
};

module.exports.findyourcongressperson = function (req, res){
    res.render('findCongress', {title: 'findyourcongressperson'});
};

module.exports.results = function (req, res) {
	var apiurl = "https://congress.api.sunlightfoundation.com/legislators/locate?zip=" + req.params.zipcode;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', apiurl, false);
	xhr.send();
	var text = xhr.responseText
	var textObject = JSON.parse(text);
    var textresult = JSON.stringify(textObject[0]);
	res.render('findCongressResults', {results: "hi"});
	
    }

module.exports.findpost = function(req, res)
{	
	var zipcode = req.body.zipcode;
	var url = "/findCongressResults/" + zipcode
	res.redirect(url);
}

module.exports.dashboard = function (req, res){
    res.render('dashboard',{title: 'dashboard'});
};
