var express = require('express');
var router = express.Router();


var ctrlMain = require('../controllers/main');
var ctrlLocations = require('../controllers/locations');
/* GET home page.*/
// router.get('/', ctrlMain.index);
router.get('/', ctrlMain.homepage);

/* GET about page. */ 
router.get('/about', ctrlMain.about);


/* GET calendar page */
router.get('/calendar', ctrlMain.calendar);

/* GET findyourcongressperson page. */ 
router.get('/findyourcongressperson', ctrlMain.findyourcongressperson);
router.post('/findyourcongressperson', ctrlMain.findpost);
router.get('/findcongressresults/:zipcode', ctrlMain.results);

/* GET dashboard page. */ 
router.get('/dashboard', ctrlMain.dashboard);


/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

/* Locations pages */

router.get('/login', ctrlLocations.login);
router.get('/register', ctrlLocations.register);
/* Other pages */
router.get('/actionget', ctrlMain.actionform);
router.post('/actionpost', ctrlMain.actionpost);


module.exports = router;
