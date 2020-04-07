//todo: check if user has entered enough information to click on submit

function validateForm(){
    var isValid = false;
    var validIp = false;
    var hasOidOrCheck = false;

    var ip = document.getElementById('ip').value;
    validIp = validateIpAddress(ip);

    //var hasOid = !('' ==document.getElementById('oid').value);
    
    var hasOid = validateOid(document.getElementById('oid').value);

    var hasBoxCheck= validateCheckBox(document.getElementsByClassName('box'));
    isValid= (validIp & (hasBoxCheck||hasOid));
    //window.alert("oid: "+ hasOid+ " box: "+hasBoxCheck)
   
    if(!isValid){
        window.alert("Please be sure to enter an IP address and check a box or enter an OID")
    }
    return isValid;
    }
   


function validateCheckBox(boxes){
    var oneHasCheck = false;
    for  (i= 0; i<boxes.length;i++){
        if(boxes[i].checked) oneHasCheck=true;
    }
    return oneHasCheck;
}
function validateOid(oid){
    var oidPattern = /^([\.,\d]*$)/;
    
    oidRes = oid.search(oidPattern)==0;
    if(oid==''){
        oidRes=false;
    }
    //window.alert(oidRes)
    if(!oidRes){
        //window.alert('Please enter a valid oid');
    }
    return oidRes;
    
}

function validateIpAddress(ip){
    //This is a regex for a valid IP that follows 000.000.000.000
    var ipPattern = /^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}$/;
    ipRes = (ip.search(ipPattern)==0);
    //window.alert(res)
    if(!ipRes){
       // window.alert('Please enter a valid IP address');
    }
    //window.alert(ipRes)
    return ipRes;
}

window.onload = function(){
    //console.log('loaded')

    document.getElementById("default").addEventListener("change", function(){
    if(this.checked){
        console.log('default checked');
        var a = document.getElementsByClassName("non-default");
        //console.log(a);
        for(i = 0; i<a.length; i++){
            a[i].checked = false;
        }
    }
    });

    document.querySelectorAll('.non-default').forEach(item => {
        item.addEventListener('change', event =>{
            document.getElementById('default').checked = false;
        })
    })

   var checkSubmit = document.getElementById('mainForm');

   checkSubmit.addEventListener('submit', function(e){
    
    if(!validateForm())
        e.preventDefault();
   });


};