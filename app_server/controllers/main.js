/* GET home page.*/
// module.exports.index = function (req, res){
//     res.render('index',{title: 'CitizensOrg'});
// };

var mongoose = require('mongoose');
var Action = mongoose.model('Action');

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

module.exports.calendar = function (req, res){
    res.render('calendar',{title: 'Calendar'});
};

module.exports.findyourcongressperson = function (req, res){
    res.render('findCongress', {title: 'findyourcongressperson'});
};

module.exports.results = function (req, res) {
	var apiurl = "https://congress.api.sunlightfoundation.com/legislators/locate?zip=" + req.params.zipcode;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', apiurl, false);
	xhr.send();
	var text = xhr.responseText;
	var textObject = JSON.parse(text);
    
    var textArray = [];
    for(var i = 0; i < textObject["results"].length; i++) {
    		var textResult = {Name: textObject["results"][i]["first_name"] + " " + textObject["results"][i]["last_name"],
    								Email: textObject["results"][i]["oc_email"],
    								Office: textObject["results"][i]["office"],
    								Party: textObject["results"][i]["party"],
									State: textObject["results"][i]["state"],
									Twitter: textObject["results"][i]["twitter_id"],
									Website: textObject["results"][i]["website"],
									YouTube: textObject["results"][i]["youtube_id"]};
			textArray.push(textResult);
	}
    
    
    
	res.render('findCongressResults', {resultspage: textArray});
    }

module.exports.findpost = function(req, res)
{	
	var zipcode = req.body.zipcode;
	var url = "/findCongressResults/" + zipcode
	res.redirect(url);
}

module.exports.dashboard = function (req, res){

		
	Action.find({}).lean().exec(function(err, data)
	{
		var results = []
		results = data.reverse().slice(0, 5);
		var new_results = results.map(function(obj){
			obj["date"] = obj.date.toLocaleDateString("en-US");
			return obj;
		});
		res.render('dashboard',{title: 'dashboard', actionArray: new_results});
	});

    
};

module.exports.getDetail = function(req, res)
{
	Action.find({_id: req.params.id}, function(err, data)
	{
		console.log(data);
		res.render('details', {result:data});
	});
}

module.exports.actionform = function(req, res)
{
	res.render('actionpost', {});
}

module.exports.actionpost = function(req,res)
{
	Action.create({name: req.body.name, action: req.body.action, location: req.body.location, description: req.body.description, date: req.body.date}, function(err, data)
	{
		if (err) {
			res.redirect('/actionpost');
		}
		else
		{
			res.redirect('/dashboard');
		}
	})
}

module.exports.getToday = function(req, res)
{
	var createdTime = new Date().getTime()
	var newTime = createdTime + 86400000
	
	Action.find({"date": {"$gte": new Date(createdTime), "$lt": new Date(newTime)}}, function(err, data)
	{
		res.render('today', {result: data})
	});
}