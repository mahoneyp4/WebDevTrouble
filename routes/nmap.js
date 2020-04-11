var nmap = require('node-nmap');
var fs = require('fs');
var isIp = require('is-ip');
var express = require('express');
var router = express.Router();
nmap.nmapLocation = "nmap";

//Main function to perform scans
function perfromScan(ipAddr, scanType, customString){
    var curScan = null;
    var fullNmap = ["-T4", "-A", "-v"];
    function actionFunction(data){
            console.log("Percentage complete" + curScan.percentComplete());
        }
    switch(scanType) {
        case "QuickScan":
            curScan = new nmap.QueuedQuickScan(ipAddr, actionFunction);
            break;
        case "OSPortScan":
            curScan = new nmap.QueuedOsAndPortScan(ipAddr, actionFunction);
            break;
        case "IntenseScan":
            curScan = new nmap.QueuedNmapScan(ipAddr, fullNmap, actionFunction);
            break;
        case "CustomScan":
            var params = customSyntax(customString);
            curScan = new nmap.QueuedNmapScan(ipAddr, params, actionFunction);
            break;
        }
        curScan.on('complete', function(data){
            //console.log(data);
            console.log("total scan time" + curScan.scanTime);
        });

        curScan.on('error', function(error){
            console.log(error);
        });

    curScan.startRunScan();
    return curScan;
}
//Parses custom syntax end user provided
function customSyntax(customString){
    var output = customString.split(" ");
    console.log(output);
    return output;
}

//Troubleshooting for JSON output
function saveJson(ent){
    let data = JSON.stringify(ent);
    fs.writeFile('./test.json', data, (err) => {
        if (err) throw err;
        console.log('Json Saved');
    });
}

/* POST from users requesting NMAP scans */
router.post('/', function(req, res, next) {
    var ipAddr = req.body.ipAddr;
    var scan = req.body.scan;
    var customParam = req.body.customScan;
    if( !isIp(ipAddr)){
        var empty = {};
        res.render('nmap', { errorResp: "Defined IP is not an IP", data: empty });
        res.end();
    }
    var curScan = perfromScan(ipAddr, scan, customParam)
    console.log(curScan.results());
    curScan.on('complete', function(data){
        console.log(data);
        console.log("total scan time" + curScan.scanTime);
        // Debugging: saveJson(curScan.results());
        //Will through a false error in console
        if(req.body.exportResult == "Export"){
            var json = JSON.stringify(data);
            var filename = 'results.json';
            var mimetype = 'application/json';
            res.setHeader('Content-Type', mimetype);
            res.setHeader('Content-disposition','attachment; filename='+filename);
            res.send(json);
        }
        res.render('nmap', {errorResp: "", data: curScan.results() });
    });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    var empty = {};
    res.render('nmap', { errorResp: "", data: empty });
});

module.exports = router;
