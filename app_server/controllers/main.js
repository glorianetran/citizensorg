/* GET home page.*/
module.exports.index = function (req, res){
    res.render('index',{title: 'CitizensOrg'});
};

module.exports.homepage = function (req, res){
    res.render('homepage',{title: 'CitizensOrg'});
};