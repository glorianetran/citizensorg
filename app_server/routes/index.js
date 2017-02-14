var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/main');

/* GET home page.*/
// router.get('/', ctrlMain.index);
router.get('/', ctrlMain.homepage)

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = router;
