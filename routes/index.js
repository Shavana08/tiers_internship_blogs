var express = require('express');
var router = express.Router();
const blogRoutes = require('./blogs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/blogs', blogRoutes);

module.exports = router;
