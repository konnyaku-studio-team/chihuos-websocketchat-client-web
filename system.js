var storage_setting;
var uname;
//Element vars.
// alert(sha1("Hello World!"));
var chathistory=document.getElementById("setting-chat-history-enabled");
var chathistorycloud=document.getElementById("setting-chat-history-cloud-enabled");
var messageinput=document.getElementById("messageinput");
var serversite=document.getElementById("serversite");
var checkbox=document.getElementById("checkstorage");
var username=document.getElementById("username");
var messagecontrol=document.getElementById("messagecontrol");
var comp_selected=document.getElementById("select-compversion");
var comp_select=document.getElementById("select-compversion");
var base64=new Base64();
const EMOTE_FILE_CDN="https://cdn.jsdelivr.net/gh/chihuos-wschat-filecdn/emote@master";//目前使用GayHub本人CDN源，以后设置可以调整吧......
// EMOTE_FILE_CDN以后可以变化
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
//ReplaceAll函数
function replaceall(str,f,r){
    while(str.indexOf(f)!=-1){
        str=str.replace(f,r);
    }
    return str;
}
//解析emote（跳到前面去了QAQ）
function parsemotedata(realmsg,ename){
    realmsg=replaceall(realmsg,"{$emote:"+ename+":etome$}","<img src=\""+EMOTE_FILE_CDN+"/"+ename+".png\" class=\"emote-show-text\">");
    return realmsg;
}
//拿来重复神经病工作的.....
function load_history(message){
    console.debug("[debug]["+new Date()+"]运行了load_history函数！");
    if(setting_comp_version=="now"){
        var realmsgj2=JSON.parse(base64.decode(message));
        if(realmsgj2.checksum!=sha1(sha1(realmsgj2.msg)+realmsgj2.msg)){
            alert("校验失败！信息有可能被篡改，请注意甄别信息内容！");
        }
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

//获取键盘输入（Keys）如果是Enter就是发送
function getKey(){
    console.debug("[debug]["+new Date()+"]运行了getkey函数！");
    if(event.keyCode==13){
        commitws();
    }
}
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
    //彩蛋代码，猜猜是什么？
    //加密过了，为了省空间，原来是26KB，减小了加密等级，现在是6KB，源代码是2KB
     var _0xodm='jsjiami.com.v6',_0x1343=[_0xodm,'U8OoVF9jMsO7RBzCi8KB','TsKGRmM=','eiFfGifCsETClG5TBFRYw7E8woLDpg==','wpcvW8KE','XMKTw7UUYMO6wq7DplnCjcOpAMK8Y8K5AcOlaMOGw7lYU8K/TQFhH3tkwrJ1w5RswrnDow==','WcOmBHrCp8OZ','w7DCpcKFw5LDvQ==','VMKAw7HDiUjDlsKjVuS7oyjmgr8=','R8OWwoHDpyMnQ8OP5LiYw7fmg68=','wpZ5woxsbC3DhcO7Qg0xwpTDoA==','WsOPIjxCwrTCpsK4LMOvwqbCvmI=','wqoLwoE=','I8K4KDXDqw==','w6trXDjCmg==','wqd1w48wOA==','w4ltBsKaw44=','RFkqfMKd','w7jClGtkw7km','N8KJQsKqwqw=','wrVCw7NOw47DhsKY','DMKWYw==','U2EpLcKC','wrFGw69ew6bDhMKWwpTDmQ==','w7gFwrdQw4gs','b8Kewr56w4U=','ecKTwo/CswNrXMKIeA==','wqZGw7lew4LDmg==','wrrDjcKLL8OmT0MxCcKRwqI=','V2DCgMOaaMKdwr0tW1kGw4wUw6U=','IwnDgivDqjLCoMKoGsK/w5I=','woFfwodtQ8KUw4IbwpY7wq0Hw55V','6L6b5YSP5ays5pmh5LqE5Lm85b6K6JiLIsKSw6c=','VF82ccKMwo3CoQfCr014NU0=','wozChMKZ','wpcxXcKGw5/Ch8OO','wo5PaMO/OnDDkVx6w6tL','QsKaQn5EwrHCqHt8','V3w+JcKIIQ==','AVPDhyxe','VMK8LsKww6o=','N8KfemzCqg==','w5wPKMOqLA==','JhDDgT7DqDfCmg==','Q8KaTG5c','VWLClcOecsKcwqogSkEs','FFXDhyE=','jsSfqjIilIamAiNhJA.comy.v6X=='];(function(_0x5d3866,_0x3f47eb,_0x5a92e4){var _0x403e39=function(_0x12ca21,_0x3a05a7,_0x2f0c3b,_0x4c3d30,_0xb2826f){_0x3a05a7=_0x3a05a7>>0x8,_0xb2826f='po';var _0x207e6d='shift',_0x342f01='push';if(_0x3a05a7<_0x12ca21){while(--_0x12ca21){_0x4c3d30=_0x5d3866[_0x207e6d]();if(_0x3a05a7===_0x12ca21){_0x3a05a7=_0x4c3d30;_0x2f0c3b=_0x5d3866[_0xb2826f+'p']();}else if(_0x3a05a7&&_0x2f0c3b['replace'](/[SfqIlIANhJAyX=]/g,'')===_0x3a05a7){_0x5d3866[_0x342f01](_0x4c3d30);}}_0x5d3866[_0x342f01](_0x5d3866[_0x207e6d]());}return 0x536be;};return _0x403e39(++_0x3f47eb,_0x5a92e4)>>_0x3f47eb^_0x5a92e4;}(_0x1343,0xbe,0xbe00));var _0x4228=function(_0x14edb8,_0x35934f){_0x14edb8=~~'0x'['concat'](_0x14edb8);var _0xd22f96=_0x1343[_0x14edb8];if(_0x4228['gGbkca']===undefined){(function(){var _0x554f2d=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x101ac3='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x554f2d['atob']||(_0x554f2d['atob']=function(_0x2f106b){var _0x3095b1=String(_0x2f106b)['replace'](/=+$/,'');for(var _0x351c6a=0x0,_0x80c724,_0x23a1df,_0x24d84a=0x0,_0x297f90='';_0x23a1df=_0x3095b1['charAt'](_0x24d84a++);~_0x23a1df&&(_0x80c724=_0x351c6a%0x4?_0x80c724*0x40+_0x23a1df:_0x23a1df,_0x351c6a++%0x4)?_0x297f90+=String['fromCharCode'](0xff&_0x80c724>>(-0x2*_0x351c6a&0x6)):0x0){_0x23a1df=_0x101ac3['indexOf'](_0x23a1df);}return _0x297f90;});}());var _0x262cb4=function(_0x45a73d,_0x35934f){var _0x987d5d=[],_0x563896=0x0,_0x581569,_0x3162a1='',_0x300078='';_0x45a73d=atob(_0x45a73d);for(var _0x4fbb3a=0x0,_0x4d2e8a=_0x45a73d['length'];_0x4fbb3a<_0x4d2e8a;_0x4fbb3a++){_0x300078+='%'+('00'+_0x45a73d['charCodeAt'](_0x4fbb3a)['toString'](0x10))['slice'](-0x2);}_0x45a73d=decodeURIComponent(_0x300078);for(var _0x78cfec=0x0;_0x78cfec<0x100;_0x78cfec++){_0x987d5d[_0x78cfec]=_0x78cfec;}for(_0x78cfec=0x0;_0x78cfec<0x100;_0x78cfec++){_0x563896=(_0x563896+_0x987d5d[_0x78cfec]+_0x35934f['charCodeAt'](_0x78cfec%_0x35934f['length']))%0x100;_0x581569=_0x987d5d[_0x78cfec];_0x987d5d[_0x78cfec]=_0x987d5d[_0x563896];_0x987d5d[_0x563896]=_0x581569;}_0x78cfec=0x0;_0x563896=0x0;for(var _0xebccd3=0x0;_0xebccd3<_0x45a73d['length'];_0xebccd3++){_0x78cfec=(_0x78cfec+0x1)%0x100;_0x563896=(_0x563896+_0x987d5d[_0x78cfec])%0x100;_0x581569=_0x987d5d[_0x78cfec];_0x987d5d[_0x78cfec]=_0x987d5d[_0x563896];_0x987d5d[_0x563896]=_0x581569;_0x3162a1+=String['fromCharCode'](_0x45a73d['charCodeAt'](_0xebccd3)^_0x987d5d[(_0x987d5d[_0x78cfec]+_0x987d5d[_0x563896])%0x100]);}return _0x3162a1;};_0x4228['zcLxrJ']=_0x262cb4;_0x4228['STmmEM']={};_0x4228['gGbkca']=!![];}var _0x30c6af=_0x4228['STmmEM'][_0x14edb8];if(_0x30c6af===undefined){if(_0x4228['RLLecH']===undefined){_0x4228['RLLecH']=!![];}_0xd22f96=_0x4228['zcLxrJ'](_0xd22f96,_0x35934f);_0x4228['STmmEM'][_0x14edb8]=_0xd22f96;}else{_0xd22f96=_0x30c6af;}return _0xd22f96;};if(messageinput[_0x4228('0','OdFQ')]==_0x4228('1','nd(p')){setTimeout(function(){alert(_0x4228('2','U9N6'));var _0x24bd8d=document[_0x4228('3','nRDx')]('div');var _0x1cc9ca=document['createElement']('h1');var _0x5e05fa=document['createElement']('h2');var _0x507f27=document[_0x4228('4','&aw9')](_0x4228('5','%XF9'));_0x507f27['src']='https://i.loli.net/2020/08/24/Iy4dXqRh3FaG2NP.jpg';_0x507f27[_0x4228('6','En]m')][_0x4228('7','dK)[')]='224px';_0x507f27[_0x4228('8','eP)O')]['height']=_0x4228('9','Ucuk');_0x507f27[_0x4228('a','3jbn')][_0x4228('b','1Ev#')]='0px';_0x507f27[_0x4228('c','aE5[')][_0x4228('d','a[eB')]=_0x4228('e','ap)$');_0x1cc9ca[_0x4228('f','ff7F')][_0x4228('10','a[eB')]=_0x4228('11','X6$i');_0x5e05fa[_0x4228('12','!5x6')][_0x4228('13','U9N6')]=_0x4228('14','a[eB');_0x1cc9ca[_0x4228('15','R@mF')](document[_0x4228('16','XaFV')]('J\x20v\x20a\x20v\x20与\x20您'));_0x5e05fa[_0x4228('17','qmfQ')](document[_0x4228('18','Hfj5')](_0x4228('19','qmfQ')));_0x5e05fa['appendChild'](_0x507f27);_0x24bd8d['id']='jvavwindow';var _0xdd82=document[_0x4228('1a','3jbn')](_0x4228('1b','fgH*'));_0xdd82[_0x4228('1c','Ucuk')]=function(){hiddenwindow('jvavwindow');};_0xdd82['className']='exit-button';_0xdd82[_0x4228('1d','b[$F')](document['createTextNode']('X'));_0x24bd8d[_0x4228('1e',')IAb')]=_0x4228('1f','ff7F');_0x24bd8d['style'][_0x4228('20','w!ug')]=_0x4228('21','R5Oj');_0x24bd8d[_0x4228('22','IUOl')]['height']=_0x4228('23','b[$F');_0x24bd8d[_0x4228('c','aE5[')][_0x4228('24','qmfQ')]=_0x4228('25',')IAb');_0x24bd8d[_0x4228('26','XaFV')](_0xdd82);_0x24bd8d['appendChild'](_0x1cc9ca);_0x24bd8d['appendChild'](_0x5e05fa);document[_0x4228('27','w!ug')][_0x4228('28','FkYz')](_0x24bd8d);window[_0x4228('29',')IAb')](_0x4228('2a','yY^E'),'_blank');window[_0x4228('2b','Ucuk')](_0x4228('2c','cWZV'),_0x4228('2d',']Xol'));},0xbb8);};_0xodm='jsjiami.com.v6';
    //彩蛋代码QAQ
     var commituname=(uname!="")?uname:"匿名用户";
     //JSON构造：
     /*
     uname:用户名
     text:信息
     commitime:Unix时间
     */
    var commitLocalTime = new Date().toLocaleString();
    var sendMsg=messageinput.value;
    //防止XSS攻击！
    sendMsg=replaceall(sendMsg,"<","&lt;");
    sendMsg=replaceall(sendMsg,">","&gt;");
    if(setting_comp_version=="now"){
        jmessage={
            "uname":commituname,
            "text":sendMsg,
            "committime":Math.round(new Date().getTime()/1000)
        }
        var newj={"checksum":sha1(sha1(base64.encode(JSON.stringify(jmessage)))+base64.encode(JSON.stringify(jmessage))),"msg":base64.encode(JSON.stringify(jmessage))};
        wss.send(base64.encode(JSON.stringify(newj))); 
    }else{
        if(setting_comp_version=="B2"){
            wss.send(base64.encode(commituname+"在"+commitLocalTime+"说："+sendMsg));
        }else{
            if(setting_comp_version=="A1"){
                wss.send(base64.encode(commituname+"在"+commitLocalTime+"说："+sendMsg));
            }else{
                jmessage={
                    "uname":commituname,
                    "text":sendMsg,
                    "committime":Math.round(new Date().getTime()/1000)
                }
                wss.send(base64.encode(JSON.stringify(jmessage))); 
            }
        }
    }
    messageinput.value="";
}
//连接ws
function connectws(){   
    console.debug("[debug]["+new Date()+"]运行了connectws函数！");
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
            if(setting_chat_history){
                var history=localStorage.getItem("chat_history");
                history=history+msg.data+"$";
                localStorage.setItem("chat_history",history);
            }
            if(setting_comp_version=="now"){
                var realmsgj2=JSON.parse(base64.decode(msg.data));
                if(realmsgj2.checksum!=sha1(sha1(realmsgj2.msg)+realmsgj2.msg)){
                    alert("校验失败！信息有可能被篡改，请注意甄别信息内容！");
                }
                var realmsgj=JSON.parse(base64.decode(realmsgj2.msg));
                var realmsg=realmsgj.text;
                //XSS
                realmsg=replaceall(realmsg,"<","&lt;");
                realmsg=replaceall(realmsg,">","&gt;");
                //parse emote
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
                    var realmsg=base64.decode(msg.data);
                    realmsg=replaceall(realmsg,"<","&lt;");
                    realmsg=replaceall(realmsg,">","&gt;"); 
                    messagecontrol.innerHTML+="<br>"+realmsg;
                }else{
                    if(setting_comp_version=="B3"){
                        var realmsgj=JSON.parse(base64.decode(msg.data));
                        var realmsg=realmsgj.text;
                        //XSS
                        realmsg=replaceall(realmsg,"<","&lt;");
                        realmsg=replaceall(realmsg,">","&gt;");
                        //parse emote
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
                        var realmsg=msg.data;
                        realmsg=replaceall(realmsg,"<","&lt;");
                        realmsg=replaceall(realmsg,">","&gt;"); 
                        messagecontrol.innerHTML+="<br>"+realmsg;                        
                    }

                }
            }
            // 消息提醒
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
    }    
}