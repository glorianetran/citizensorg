var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/main');

/* GET home page.*/
// router.get('/', ctrlMain.index);
router.get('/',ctrlMain.homepage);

/* GET about page. */ 
router.get('/about', ctrlMain.about);

/* GET login page. */ 
router.get('/login', ctrlMain.login);

/* GET register page. */ 
router.get('/register', ctrlMain.register);

/* GET findyourcongressperson page. */ 
router.get('/findyourcongressperson', ctrlMain.findyourcongressperson);


/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = router;
