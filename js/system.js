var connection;
var uname;
//Element vars.
// alert(sha1("Hello World!"));
var chathistory=document.getElementById("setting-chat-history-enabled");
var chathistorycloud=document.getElementById("setting-chat-history-cloud-enabled");
var serversite=document.getElementById("serversite");
var checkbox=document.getElementById("checkstorage");
var username=document.getElementById("username");
var messageinput=document.getElementById("messageinput");
var comp_selected=document.getElementById("select-compversion");
var comp_select=document.getElementById("select-compversion");
//获取键盘输入（Keys）如果是Enter就是发送
function getKey(){
    console.debug("[debug]["+new Date()+"]运行了getkey函数！");
    if(event.keyCode==13){
        commitws();
    }
}
//LS存储设置
if(localStorage.getItem("localstorage_settings")==null){
    localStorage.setItem("localstorage_settings",false);
}else{
    var storage_setting=localStorage.getItem("localstorage_settings");
    checkbox.checked=storage_setting;
}
//版本兼容性
if(localStorage.getItem("setting_comp_version")==null){
    var setting_comp_version="now";
    localStorage.setItem("setting_comp_version","now");
    comp_selected.value=setting_comp_version;
}else{
    var setting_comp_version=localStorage.getItem("setting_comp_version");
    comp_selected.value=setting_comp_version;
}
//聊天记录存储
if(localStorage.getItem("setting_chat_history")==null){
    localStorage.setItem("setting_chat_history",true);
    localStorage.setItem("chat_history","");
    //默认开启 
}
//拿来重复神经病工作的.....
function load_history(message){
    console.debug("[debug]["+new Date()+"]运行了load_history函数！");
    if(setting_comp_version=="now"){
        var realmsgj2=JSON.parse(base64.decode(message));
        var realmsgj=JSON.parse(base64.decode(realmsgj2.msg));
        var realmsg=realmsgj.text;
        //XSS
        realmsg=replaceall(realmsg,"<","&lt;");
        realmsg=replaceall(realmsg,">","&gt;");
        //parse emote可能以后会搞个好的
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
    }else{
        if(setting_comp_version=="B2"){
            var realmsg=base64.decode(message);
            realmsg=replaceall(realmsg,"<","&lt;");
            realmsg=replaceall(realmsg,">","&gt;"); 
            messagecontrol.innerHTML+="<br>"+realmsg;
        }else{
            if(setting_comp_version=="B3"){
                var realmsgj=JSON.parse(base64.decode(message));
                var realmsg=realmsgj.text;
                //XSS
                realmsg=replaceall(realmsg,"<","&lt;");
                realmsg=replaceall(realmsg,">","&gt;");
                //parse emote可能以后会搞个好的
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
            }else{
                var realmsg=message;
                realmsg=replaceall(realmsg,"<","&lt;");
                realmsg=replaceall(realmsg,">","&gt;"); 
                messagecontrol.innerHTML+="<br>"+realmsg;
            }
        }
}}//不知道哪里出了点问题，请大佬指点一下（为什么要两个括号）
//拿来加载聊天记录的......（但是存储只能存你在与他人的聊天哦~实在不行等下开发个云端存储？？因为是端对端的，服务器端的话得搞个Express？？）
if(localStorage.getItem("setting_chat_history")){
    //console.debug("有吗有吗？");
    var history_old=localStorage.getItem("chat_history");
    var his_arr=history_old.split('$');
    //console.debug(his_arr);
    for(var i=0;i<his_arr.length-1;i++){
        load_history(his_arr[i]);
    }
}
//存储自动填充（以后可能会搞鉴权了）
if(storage_setting){
    if(!(localStorage.getItem("server_address")==null)){
        serversite.value=localStorage.getItem("server_address");
        username.value=localStorage.getItem("username");
        alert("检测到您有服务器和用户名存储，已为您自动填充。");
    }   
}
//早就存了？
var setting_chat_history=localStorage.getItem("setting_chat_history");


//更改LS属性
function changeStorage(){
    console.debug("[debug]["+new Date()+"]运行了changeStorage函数！");
    storage_setting=!storage_setting;
    localStorage.setItem("localstorage_settings",storage_setting);
}
//清除设置
function clearSettingData(){
    console.debug("[debug]["+new Date()+"]运行了clearSettingData函数！");
    var c=confirm("您确定要清空所有设置的数据吗？");
    if(c){
        localStorage.clear();
        alert("设置数据清除完成。");
    }
}
//更改设置
function changeSettingData(){
    console.debug("[debug]["+new Date()+"]运行了changeSettingData函数！");
    localStorage.setItem("setting_comp_version",comp_select.value);
    localStorage.setItem("setting_chat_history",chathistory.checked);
    localStorage.setItem("setting_chat_history_cloud",chathistorycloud.checked);
    alert("设置更改成功！");
    location.reload();
}
//添加Emote
function addEmote(emotename){
    console.debug("[debug]["+new Date()+"]运行了addEmote函数！");
    messageinput.value+="{$emote:"+emotename+":etome$}";
}
function clearhistory(){
    if(confirm("你真的想要清除聊天记录吗？")){
        localStorage.setItem("chat_history","");
        alert("聊天记录清除成功！");
    }else{
        alert("操作已经被用户取消。");
    }
}
function commitws(){
    console.debug("[debug]["+new Date()+"]运行了commitws函数！");
    connection.send(messageinput.value);
}
//连接ws
function connectws(){   
    console.debug("[debug]["+new Date()+"]运行了connectws函数！");
    uname=username.value;
    connection=new ws(serversite.value,uname);
    connection.connect();
}