var express = require('express');
var router = express.Router();


var ctrlMain = require('../controllers/main');

/* GET home page.*/
// router.get('/', ctrlMain.index);
router.get('/',ctrlMain.homepage);

/* GET about page. */ 
router.get('/about', ctrlMain.about);


/* GET findyourcongressperson page. */ 
router.get('/findyourcongressperson', ctrlMain.findyourcongressperson);

/* GET dashboard page. */ 
router.get('/dashboard', ctrlMain.dashboard);


/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/:locationid/review/new', ctrlLocations.addReview);
router.post('/location/:locationid/review/new', ctrlLocations.doAddReview);
router.get('/login', ctrlLocations.login);
router.get('/register', ctrlLocations.register);
/* Other pages */
router.get('/about', ctrlOthers.about);


module.exports = router;
