function connectws(){
    var serversite=document.getElementById("serversite");
    var messagecontrol=document.getElementById("messagecontrol");
    wss=new WebSocket(serversite.value);
    wss.onmessage=function(msg){
        messagecontrol.innerHTML+="<br>"+msg.data;
        if("Notification" in Window){
            alert("草，你的浏览器是不是IE的？怎么连这个也不支持？");
        }
        else
        {
            if(Notification.permission === "granted"){
                msNotify = new Notification("新消息！",{body:msg.data});
            }
            else
            {
                if(Notification.permission === "default"){
                    Notification.requestPermission(function(){
                        if(Notification.permission === "granted"){
                            msNotify = new Notification("新消息！",{body:msg.data});
                        }
                    });
                }
            }
        }
    console.log(msg.data);
    }    
}
function commitws(){
   var messageinput=document.getElementById("messageinput");
   wss.send(messageinput.value); 
}