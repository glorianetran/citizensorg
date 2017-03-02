/* GET home page.*/
// module.exports.index = function (req, res){
//     res.render('index',{title: 'CitizensOrg'});
// };

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
    res.render('findCongress',{title: 'findyourcongressperson'});
};

module.exports.dashboard = function (req, res){
    res.render('dashboard',{title: 'dashboard'});
};