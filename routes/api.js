var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nmap = require('node-nmap');

//This Page Is primarily done for extra pa-zaz

/**
nmap.n
 odenmap.nmapLocation = "C:\Program Files (x86)\Nmap";
var conf = router.get('projConfig');
var ip = conf.apiNmap.ip;
var subnet = conf.apiNmap.subnet;
ip = ip+'/'+subnet;
var nmapscan = nmap.nmapScan('ip', ip);
 **/
/* GET users listing. */
/**
 router.post('/api', function(req, res, next) {
    var dash_ip = req.body.daship;
    console.log("Dashboard IP:"+dash_ip);
});
 **/

router.get('/', function(req, res, next) {
    //debug line:
    res.send('api-get');
    //send back config.json
    //res.render
});

router.get('/nmap', function(req, res, next) {

    //send back current config of nmap
    //res.render
});

router.get('/snmp', function(req, res, next) {

    //send back current config of snmp
    //res.render
});

router.post('/', function(req, res, next) {
    //debug line:
    res.send('api-post');
    //update values for config.json
});

router.post('/nmap', function(req, res, next) {

    //update values for nmap config
});

router.post('/snmp', function(req, res, next) {

    //update values for snmp config
});

module.exports = router;