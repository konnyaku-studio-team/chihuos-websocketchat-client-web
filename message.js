function connectws(){
    var serversite=document.getElementById("serversite");
    var messagecontrol=document.getElementById("messagecontrol");
    wss=new WebSocket(serversite.value);
    wss.onmessage=function(msg){
        messagecontrol.innerHTML+="<br>"+msg.data;
        console.log(msg.data);
    }
}
function commitws(){
   var messageinput=document.getElementById("messageinput");
   wss.send(messageinput.value); 
}