var storage_setting;
var uname;
if(localStorage.getItem("localstorage_settings")==null){
    localStorage.setItem("localstorage_settings",false);
}else{
    var storage_setting=localStorage.getItem("localstorage_settings");
    var checkbox=document.getElementById("checkstorage");
    checkbox.checked=storage_setting;
}
if(localStorage.getItem("setting_comp_version")==null){
    var setting_comp_version="now";
    var comp_selected=document.getElementById("select-compversion-"+setting_comp_version);
    localStorage.setItem("setting_comp_version","now");
    comp_selected.selected=true;
}else{
    var setting_comp_version=localStorage.getItem("setting_comp_version");
    var comp_selected=document.getElementById("select-compversion-"+setting_comp_version);
    comp_selected.selected=true;
}
if(storage_setting){
    if(!(localStorage.getItem("server_address")==null)){
        var serversite=document.getElementById("serversite");
        var username=document.getElementById("username");
        serversite.value=localStorage.getItem("server_address");
        username.value=localStorage.getItem("username");
        alert("检测到您有服务器和用户名存储，已为您自动填充。");
    }   
}
function commitws(){
    console.debug("[debug]["+new Date()+"]运行了commitws函数！");
    var messageinput=document.getElementById("messageinput");
    var commituname=(uname!="")?uname:"匿名用户";
    jmessage={
        "uname":commituname,
        "text":messageinput.value,
        "committime":Math.round(new Date().getTime()/1000)
    }
    wss.send(base64.encode(JSON.stringify(jmessage))); 
    messageinput.value="";
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
    console.debug("[debug]["+new Date()+"]运行了changeSettingData函数！");
    var comp_select=document.getElementById("select-compversion");
    localStorage.setItem("setting_comp_version",comp_select.value);
    alert("设置更改成功！");
}
function addEmote(emotename){
    console.debug("[debug]["+new Date()+"]运行了addEmote函数！");
    var messageinput=document.getElementById("messageinput");
    messageinput.value+="{$emote:"+emotename+":etome$}";
}
var base64=new Base64();
const EMOTE_FILE_CDN="https://cdn.jsdelivr.net/gh/chihuos-wschat-filecdn/emote@master";//目前使用GayHub本人CDN源，以后设置可以调整吧......
function parsemotedata(realmsg,ename){
    while(realmsg.indexOf("{$emote:"+ename+":etome$}")!=-1){
        realmsg=realmsg.replace("{$emote:"+ename+":etome$}","<img src=\""+EMOTE_FILE_CDN+"/"+ename+".png\" class=\"emote-show-text\">");
    }
    return realmsg;
}
// EMOTE_FILE_CDN以后可以变化
function connectws(){   
    console.debug("[debug]["+new Date()+"]运行了connectws函数！");
    var serversite=document.getElementById("serversite");
    var username=document.getElementById("username");
    var messagecontrol=document.getElementById("messagecontrol");
    uname=username.value;
    if(storage_setting){
        localStorage.setItem("username",username.value);
        localStorage.setItem("server_address",serversite.value);
    }
    try{
        wss=new WebSocket(serversite.value);
    }catch(wse){
        alert("服务器连接错误！错误原因："+wse);
    }
    wss.onopen=function(){
        alert("连接成功！");
        wss.onmessage=function(msg){
            console.debug("[debug]["+new Date()+"]接收到了ws内容！内容："+msg.data);
            var realmsgj=JSON.parse(base64.decode(msg.data));
            var realmsg=realmsgj.text;
            realmsg=parsemotedata(realmsg,"tv_doge");
            realmsg=parsemotedata(realmsg,"tv_ll");
            realmsg=parsemotedata(realmsg,"tv_yx");
            realmsg=parsemotedata(realmsg,"tv_angry");
            realmsg=parsemotedata(realmsg,"tv_cute");
            realmsg=parsemotedata(realmsg,"tv_dk");
            realmsg=parsemotedata(realmsg,"tv_dz");
            realmsg=parsemotedata(realmsg,"tv_hx");
            realmsg=parsemotedata(realmsg,"tv_by");
            realmsg=parsemotedata(realmsg,"tv_dl");
            realmsg=parsemotedata(realmsg,"tv_fn");
            realmsg=parsemotedata(realmsg,"tv_gl");
            realmsg=parsemotedata(realmsg,"tv_lh");
            realmsg=parsemotedata(realmsg,"tv_lhcq");
            realmsg=parsemotedata(realmsg,"tv_xyx");
            realmsg=parsemotedata(realmsg,"tv_mdkd");
            realmsg=parsemotedata(realmsg,"bili_wx");
            realmsg=parsemotedata(realmsg,"bili_cg");
            realmsg=parsemotedata(realmsg,"bili_dcall");
            realmsg=parsemotedata(realmsg,"bili_dk");
            realmsg=parsemotedata(realmsg,"bili_doge");
            realmsg=parsemotedata(realmsg,"bili_hj");
            realmsg=parsemotedata(realmsg,"bili_ma");
            realmsg=parsemotedata(realmsg,"bili_xiao");
            realmsg=parsemotedata(realmsg,"bili_xk");
            var parsedmsg=realmsg;
            var unixTimestamp = new Date(realmsgj.committime * 1000)
            var commitLocalTime = unixTimestamp.toLocaleString();
            messagecontrol.innerHTML+="<br>"+realmsgj.uname+"在"+commitLocalTime+"说："+parsedmsg;
            // String类QAQ
            if("Notification" in Window){
                alert("草，你的浏览器是不是IE的？怎么连这个也不支持？");
            }
            else
            {
                if(Notification.permission === "granted"){
                    msNotify = new Notification("新消息！",{body:base64.decode(msg.data)});
                }
                else
                {
                    if(Notification.permission === "default"){
                        Notification.requestPermission(function(){
                            if(Notification.permission === "granted"){
                                msNotify = new Notification("新消息！",{body:base64.decode(msg.data)});
                            }
                        });
                    }
                }
            };
    };
    var connectwindow=document.getElementById("connectwindow");
    var mask=document.getElementById("mask");
    connectwindow.style.display="none";
    mask.style.display="none";
    console.log(msg.data);
    }    
}