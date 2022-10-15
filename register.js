function xd() {
    var mobile1 = document.getElementById("mobile").value;
     var user_name = document.getElementById("name").value;

    var emailx = document.getElementById("email").value;
    var passwordx = document.getElementById("pass").value;
    
     var addressx = document.getElementById("address").value;
// var credintials 
var cred=JSON.stringify({
name:`${user_name}`, 
mobile:`${mobile1}`,
email:`${emailx}`,
address:`${addressx}`,
pass:`${passwordx}`
});}