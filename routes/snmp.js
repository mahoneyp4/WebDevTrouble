var express = require('express');
var router = express.Router();
var snmp = require("net-snmp");
router.get('/', function(req, res) {

    res.render('snmp');

});
var memOids='1.3.6.1.4.1.2021.4.3.0,1.3.6.1.4.1.2021.4.4.0,1.3.6.1.4.1.2021.4.5.0,1.3.6.1.4.1.2021.4.6.0,1.3.6.1.4.1.2021.4.11.0,1.3.6.1.4.1.2021.4.13.0,1.3.6.1.4.1.2021.4.14.0,1.3.6.1.4.1.2021.4.15.0'
var diskOids='1.3.6.1.4.1.2021.13.15.1.1.3.1,1.3.6.1.4.1.2021.13.15.1.1.4.1'
var netOids='1.3.6.1.2.1.2.2.1.10.1,1.3.6.1.2.1.2.2.1.10.2'
var cpuOids='1.3.6.1.4.1.2021.10.1.3.3,1.3.6.1.4.1.2021.11.50.0'
router.post('/', function(req, res){
    if(req.body.default){
        console.log('Default true')
        //ip ='192.168.0.10';
        oids = ["1.3.6.1.2.1.1.5.0","1.3.6.1.2.1.2.2.1.10.1","1.3.6.1.2.1.2.2.1.10.2","1.3.6.1.4.1.2021.10.1.3.3","1.3.6.1.4.1.2021.11.50.0"];
        
        ip=req.body.ip;
        //oids=req.body.ip;
        session = snmp.createSession(ip, "public");
        var snmpResponse ='';
        session.get(oids, function (error,varbinds){
            
            if (error){
                console.error(error.toString());
                res.render('snmpError');
            } else {
                for (var i = 0; i < varbinds.length; i++) {
                    console.log (varbinds[i].oid + " | "+ varbinds[i].value);
                    snmpResponse=snmpResponse.concat(varbinds[i].oid ," | " , varbinds[i].value, "<br/>");
                    console.log('snmpResonse');
                    console.log(snmpResponse);
                    
                    
                     if (snmp.isVarbindError (varbinds[i]))
                         console.error (snmp.varbindError (varbinds[i]));
                 }
                 data = {
                    resIp: ip,
                    resSubnet: req.body.subnet,
                    resSnmpResponse: snmpResponse
                }
                res.render('snmpSubmit', data);
                
            }
            session.close();
        });
        
        
    }else{
        console.log('Default false')
        ip = req.body.ip;
        //if(ip=='')ip='192.168.0.10'
        console.log(req.body);
        console.log('ip] '+ ip)
        oids=req.body.oid;
        console.log("oids before split");
        
        if(req.body.host){
            if(oids=='')oids='1.3.6.1.2.1.1.5.0'; else oids=oids.concat(',','1.3.6.1.2.1.1.5.0');
        }
        if(req.body.disk){
            if(oids=='')oids=diskOids; else oids=oids.concat(',',diskOids);
        }
        if(req.body.memory){
            if(oids=='')oids=memOids; else oids=oids.concat(',',memOids);

        }
        if(req.body.cpu){
            if(oids=='')oids=cpuOids; else oids=oids.concat(',',cpuOids);
        }
        if(req.body.network){
            if(oids=='')oids=netOids; else oids=oids.concat(',',netOids);
        }
       
        
    
        //////////////////////////////////////////
        console.log(oids);
        oids=oids.split(',');
        console.log('aftersplit')
        console.log(oids);
        
        session = snmp.createSession(ip,"public");
        var snmpResponse ='';
        
        session.get(oids, function (error,varbinds){
            
            if (error){
                console.error(error.toString());
                console.log('ERROR OCURRED OVER HERe')
                res.render('snmpError');
            } else {
                for (var i = 0; i < varbinds.length; i++) {
                    console.log (varbinds[i].oid + " | " + varbinds[i].value);
                    snmpResponse=snmpResponse.concat(varbinds[i].oid ," | " , varbinds[i].value, "<br/>");
                    console.log('snmpResonse');
                    console.log(snmpResponse);
                    
                    
                     if (snmp.isVarbindError (varbinds[i]))
                         console.error (snmp.varbindError (varbinds[i]));
                 }
                 data = {
                    resIp: ip,
                    resSubnet: req.body.subnet,
                    resSnmpResponse: snmpResponse
                }
                res.render('snmpSubmit', data);
                
            }
            session.close();
        });
    }
 
})


module.exports = router;
