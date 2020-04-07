var express = require('express');
var router = express.Router();

//HTTP Calls:
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/snmp', function(req, res, next) {
  res.render('snmp', { title: 'Home Page' });
});
router.post('/nmap', function(req, res, next) {
  res.render('snmp', { title: 'Home Page' });
});


module.exports = router;