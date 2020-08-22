var storage_setting;
if(localStorage.getItem("localstorage_settings")==null){
    localStorage.setItem("localstorage_settings",false);
}else{
    var storage_setting=localStorage.getItem("localstorage_settings");
    var checkbox=document.getElementById("checkstorage");
    checkbox.checked=storage_setting;
}
if(storage_setting){
    if(!(localStorage.getItem("server_address")==null)){
        var serversite=document.getElementById("serversite");
        serversite.value=localStorage.getItem("server_address");
        alert("检测到您有服务器存储，已为您自动填充。");
    }   
}
function commitws(){
    console.debug("[debug]["+new Date()+"]运行了commitws函数！");
    var messageinput=document.getElementById("messageinput");
    wss.send(base64.encode(messageinput.value)); 
}
function getKey(){
    console.debug("[debug]["+new Date()+"]运行了getkey函数！");
    if(event.keyCode==13){
        commitws();
    }
}
function changeStorage(){
    console.debug("[debug]["+new Date()+"]运行了changeStorage函数！");
    storage_setting=!storage_setting;
    localStorage.setItem("localstorage_settings",storage_setting);
}
function clearSettingData(){
    console.debug("[debug]["+new Date()+"]运行了clearSettingData函数！");
    var c=confirm("您确定要清空所有设置的数据吗？");
    if(c){
        localStorage.clear();
        alert("设置数据清除完成。");
    }
}
function changeSettingData(){
    
}
function addEmote(emotename){
    console.debug("[debug]["+new Date()+"]运行了addEmote函数！");
    var messageinput=document.getElementById("messageinput");
    messageinput.value+="{$emote:"+emotename+":etmoe$}";
}