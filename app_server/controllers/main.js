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
	var text = xhr.responseText;
	var textObject = JSON.parse(text);
	
    // var textResult = JSON.stringify({Name: textObject["results"][0]["first_name"] + " " + textObject["results"][0]["last_name"],
    // 								Email: textObject["results"][0]["oc_email"],
    // 								Office: textObject["results"][0]["office"],
    // 								Party: textObject["results"][0]["party"],
				// 					State: textObject["results"][0]["state"],
				// 					Twitter: textObject["results"][0]["twitter_id"],
				// 					Website: textObject["results"][0]["website"],
				// 					YouTube: textObject["results"][0]["youtube_id"]}, null, '\t'
    // 					 );
    
    var textResult = "";
    
    for(var i = 0; i < textObject["results"].length; i++) {
    		textResult += JSON.stringify({Name: textObject["results"][i]["first_name"] + " " + textObject["results"][i]["last_name"],
    								Email: textObject["results"][i]["oc_email"],
    								Office: textObject["results"][i]["office"],
    								Party: textObject["results"][i]["party"],
									State: textObject["results"][i]["state"],
									Twitter: textObject["results"][i]["twitter_id"],
									Website: textObject["results"][i]["website"],
									YouTube: textObject["results"][i]["youtube_id"]}, null, "\t");
			 textResult += "br";
    }
    
    
    
	res.render('findCongressResults', {resultspage: textResult});
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
