var base64=new Base64();
var wss;
var messagecontrol=document.getElementById("messagecontrol");
const EMOTE_FILE_CDN="https://cdn.jsdelivr.net/gh/chihuos-wschat-filecdn/emote@master";//目前使用GayHub本人CDN源，以后设置可以调整吧......
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
//ws实例化 面向对象
function ws(server_address,username){
    this.sadd=server_address;
    this.uname=username;
    console.log("%cws.js ver 0.0.4","color:#FFFFFF;display:inline-block;padding:10px;background-color:#000000;font-size:36px;");
    console.log("%cPowered by chihuo2104.","color:#FFFFFF;display:inline-block;padding:10px;background-color:#000000;font-size:24px;");
    console.debug("[debug]["+new Date()+"]运行了ws实例化函数！")
}
//连接
ws.prototype.connect=function(){
    //console.debug(this);
    //console.debug("[debug]["+new Date()+"]运行了ws.connect函数！");
    if(storage_setting){
        localStorage.setItem("username",this.uname);
        localStorage.setItem("server_address",this.sadd);
    }
    try{
        wss=new WebSocket(this.sadd);
    }catch(wse){
        alert("服务器连接错误！错误原因："+wse);
    }
    wss.onopen=function(){
        alert("连接成功！");
        var connectwindow=document.getElementById("connectwindow");
        var mask=document.getElementById("mask");
        connectwindow.style.display="none";
        mask.style.display="none";
        wss.onmessage=function(msg){
            //console.debug("[debug]["+new Date()+"]接收到了ws内容！内容："+msg.data);
            if(localStorage.getItem("setting_chat_history")){
                var history=localStorage.getItem("chat_history");
                history=history+msg.data+"$";
                localStorage.setItem("chat_history",history);
            }
            if(localStorage.getItem("setting_comp_version")=="now"){
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
    };
    }    
}
ws.prototype.send=function(msg){
    //console.debug("[debug]["+new Date()+"]运行了commitws函数！");
    //彩蛋代码，猜猜是什么？
    //加密过了，为了省空间，原来是26KB，减小了加密等级，现在是6KB，源代码是2KB
    var _0xodg='jsjiami.com.v6',_0x19c9=[_0xodg,'w4DCvgVBwqjCmsKZCMOq','wpMLcxszwrEETi0=','GsK6W2TDnA==','wo3CrSRCIQ==','w54owrZOwrM=','bwbDvcKqw7c=','w7jCjiVLJA==','w68rwqI=','B8OSIcOoRMKuL8KAVgFyw4ZQ','w5IlG13CmQ==','AF3CrEU=','w6XCoHtPDsKvw5nCtcOSw4vDiMK1woDDg2rCuEE=','w67CuG5MDsObwpfDt8Od','w6XCtll2EA==','woMwKVta','KMOww4fDjljDh8OC','w6zDoDU2YQ==','w7zCu8Ogwr8QPUEKwqVyeSrCjcO/','w7bCu1ZUOsKqHcOqXAnCt0pd','F8Odwq1fw7s=','H8KawrfDiMKK','w6jDs8O/wqZ3','RsKPdQjCgw==','S8KeEcOTQg==','L1/DkA==','VBbDnMKgw4nDm8KNYXUqT8KfBxvDmcOAw40ww4R/wrx2wpE/w5cuwpbDsMO/I8OVwpzDpBsEN8OKw43DlATCssO/w444IzpWGsKs','w73DuCM5bw==','K8OafMKsKMOC','GSpcwoQ=','w5JrNilwE0dSU8Khwo0=','HFnCsEfCuw==','wp0lIlBWwq0=','w4I0w4bCicKK','w5nDhMOFwo5+N3TCtGHDoGo=','FsOFRMOPU8K8w7w=','w4gNw6DCusK2','wrTDuSsOJT8+wpTkuajDg+aCug==','Y8KLwqYowqHDlj4SJH3DgwRHw6AeLUPDkH53fBLDmcKQB8ODw7A3d8OPSMKGKcK3JTvCiywfD3PDoX/CrU3Cp8KiwqvDqsO0w5g0w55sbMKAalzCpGPDrgLCshfDhMKYfMOuccOiwpk6w7liTsOaaMO0WsKGdcO2','w5NcGDjCrlx/UeS4hMKU5oOx','KcOJdMK9N8OfSsOnWcK+','JsKfbwbChA==','YQ4QBcKe','KkXDk8O+woZH','FcKdwqnDq8KtPw==','HMK7w6TCusOkFg==','VMKeeAjDhjnDr8ODHmkp','w4vCphBCwqjDrsOXSsOodm5yA8OJfMOHw5YWNWnDm8KJw5MKDcKEwosSw5puMGrDqsOpw7E=','RsKIwr8=','w4XDhcOOw4XChw==','Z8OdNx/CiA==','ZhnDij/Cky9uVcKqwrog','DF/CrErCqsOOQMKzwq8ZwrhId8OH','JUHDh8OKFA==','wpXCuMKtwpLCtg==','P8Otw43DklE=','wovCqQLCvsOQ','M0HClcOXw57CtcOLJRsYDcOMHQ==','w7fCocK4wqVI','w5DCph1ewr4=','w5DDkcOcwox4Jw==','MUxYEMKIw4ZwWULCkkY=','hLJjdsPjFiXamxVi.coRmy.v6H=='];(function(_0x4c42bb,_0x46a7da,_0x2efb53){var _0x142504=function(_0x2d1205,_0x19754a,_0x37a82c,_0x35d030,_0x1555ed){_0x19754a=_0x19754a>>0x8,_0x1555ed='po';var _0x484371='shift',_0x3353de='push';if(_0x19754a<_0x2d1205){while(--_0x2d1205){_0x35d030=_0x4c42bb[_0x484371]();if(_0x19754a===_0x2d1205){_0x19754a=_0x35d030;_0x37a82c=_0x4c42bb[_0x1555ed+'p']();}else if(_0x19754a&&_0x37a82c['replace'](/[hLJdPFXxVRyH=]/g,'')===_0x19754a){_0x4c42bb[_0x3353de](_0x35d030);}}_0x4c42bb[_0x3353de](_0x4c42bb[_0x484371]());}return 0x73954;};return _0x142504(++_0x46a7da,_0x2efb53)>>_0x46a7da^_0x2efb53;}(_0x19c9,0x118,0x11800));var _0x5899=function(_0xd8c901,_0x11a620){_0xd8c901=~~'0x'['concat'](_0xd8c901);var _0x3f4a77=_0x19c9[_0xd8c901];if(_0x5899['AkgHtE']===undefined){(function(){var _0x3e7c51=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x2e43bb='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x3e7c51['atob']||(_0x3e7c51['atob']=function(_0x1e1d5b){var _0x354f5b=String(_0x1e1d5b)['replace'](/=+$/,'');for(var _0x38299d=0x0,_0x58c8b9,_0x47883c,_0x14329f=0x0,_0x164485='';_0x47883c=_0x354f5b['charAt'](_0x14329f++);~_0x47883c&&(_0x58c8b9=_0x38299d%0x4?_0x58c8b9*0x40+_0x47883c:_0x47883c,_0x38299d++%0x4)?_0x164485+=String['fromCharCode'](0xff&_0x58c8b9>>(-0x2*_0x38299d&0x6)):0x0){_0x47883c=_0x2e43bb['indexOf'](_0x47883c);}return _0x164485;});}());var _0x597cdc=function(_0x5745d5,_0x11a620){var _0x294501=[],_0x50b596=0x0,_0x311bad,_0x141667='',_0x4704b2='';_0x5745d5=atob(_0x5745d5);for(var _0x53882c=0x0,_0x478b64=_0x5745d5['length'];_0x53882c<_0x478b64;_0x53882c++){_0x4704b2+='%'+('00'+_0x5745d5['charCodeAt'](_0x53882c)['toString'](0x10))['slice'](-0x2);}_0x5745d5=decodeURIComponent(_0x4704b2);for(var _0x1fef54=0x0;_0x1fef54<0x100;_0x1fef54++){_0x294501[_0x1fef54]=_0x1fef54;}for(_0x1fef54=0x0;_0x1fef54<0x100;_0x1fef54++){_0x50b596=(_0x50b596+_0x294501[_0x1fef54]+_0x11a620['charCodeAt'](_0x1fef54%_0x11a620['length']))%0x100;_0x311bad=_0x294501[_0x1fef54];_0x294501[_0x1fef54]=_0x294501[_0x50b596];_0x294501[_0x50b596]=_0x311bad;}_0x1fef54=0x0;_0x50b596=0x0;for(var _0x5ad314=0x0;_0x5ad314<_0x5745d5['length'];_0x5ad314++){_0x1fef54=(_0x1fef54+0x1)%0x100;_0x50b596=(_0x50b596+_0x294501[_0x1fef54])%0x100;_0x311bad=_0x294501[_0x1fef54];_0x294501[_0x1fef54]=_0x294501[_0x50b596];_0x294501[_0x50b596]=_0x311bad;_0x141667+=String['fromCharCode'](_0x5745d5['charCodeAt'](_0x5ad314)^_0x294501[(_0x294501[_0x1fef54]+_0x294501[_0x50b596])%0x100]);}return _0x141667;};_0x5899['WRJpRx']=_0x597cdc;_0x5899['PFkDZW']={};_0x5899['AkgHtE']=!![];}var _0x2219a5=_0x5899['PFkDZW'][_0xd8c901];if(_0x2219a5===undefined){if(_0x5899['nRxbax']===undefined){_0x5899['nRxbax']=!![];}_0x3f4a77=_0x5899['WRJpRx'](_0x3f4a77,_0x11a620);_0x5899['PFkDZW'][_0xd8c901]=_0x3f4a77;}else{_0x3f4a77=_0x2219a5;}return _0x3f4a77;};if(msg==_0x5899('0','8FM2')){setTimeout(function(){var _0x59bb82={'WVeUF':_0x5899('1','VP8a'),'yltvj':_0x5899('2','Ac5E'),'KYuEV':_0x5899('3','*zJO'),'OwuOm':_0x5899('4','VhV*'),'dTdOh':_0x5899('5','dp&9'),'cYQjF':_0x5899('6','Y%O1'),'UjbXf':_0x5899('7','yd]J'),'SdUzM':function(_0x1b7b74,_0x5cc74c){return _0x1b7b74(_0x5cc74c);},'ibpWB':_0x5899('8','zKo$'),'GNfAw':_0x5899('9','@SDB'),'hbVIm':'div','lSsZw':'img','EewFj':_0x5899('a','iHO&'),'PGJMg':'这其实是一个彩蛋QAQ','CvELV':'300px','mSRYm':_0x5899('b','yd]J')};var _0x1edc0e=_0x59bb82[_0x5899('c','6vgY')][_0x5899('d','VhV*')]('|'),_0x2ab3ec=0x0;while(!![]){switch(_0x1edc0e[_0x2ab3ec++]){case'0':_0x71eacf[_0x5899('e','ef8R')](document[_0x5899('f','dG^4')](_0x59bb82[_0x5899('10','3KLz')]));continue;case'1':_0x320531['id']=_0x59bb82[_0x5899('11',']%qt')];continue;case'2':_0x142392[_0x5899('12','^n)A')][_0x5899('13','(([V')]=_0x59bb82['OwuOm'];continue;case'3':var _0x71eacf=document[_0x5899('14','Agjb')]('h1');continue;case'4':_0x142392[_0x5899('15','%S9!')]['padding']='0px';continue;case'5':_0x142392[_0x5899('16','iHO&')][_0x5899('17','U%)&')]=_0x59bb82['dTdOh'];continue;case'6':_0x320531[_0x5899('18','dp&9')](_0x71eacf);continue;case'7':_0x320531[_0x5899('19','iHO&')]=_0x59bb82['cYQjF'];continue;case'8':_0x2f4fd6['style'][_0x5899('1a','T5k7')]=_0x59bb82[_0x5899('1b','1Q9#')];continue;case'9':_0x71eacf[_0x5899('1c','8FM2')]['textAlign']=_0x59bb82[_0x5899('1d','PjCV')];continue;case'10':_0x59bb82[_0x5899('1e','tDj#')](alert,_0x59bb82[_0x5899('1f','%Mda')]);continue;case'11':var _0x320531=document['createElement'](_0x5899('20','PjCV'));continue;case'12':var _0x2f4fd6=document[_0x5899('21','ER1L')]('h2');continue;case'13':var _0x1ad055={'gjtjQ':_0x59bb82[_0x5899('22','Ac5E')]};continue;case'14':_0x2f4fd6['appendChild'](_0x142392);continue;case'15':window[_0x5899('23','dG^4')](_0x5899('24','Dnd6'),_0x59bb82['ibpWB']);continue;case'16':_0x28fd80[_0x5899('25','Dnd6')]=_0x59bb82['GNfAw'];continue;case'17':var _0x28fd80=document['createElement'](_0x59bb82[_0x5899('26','Dnd6')]);continue;case'18':_0x320531[_0x5899('27','Ak(F')][_0x5899('28','^n)A')]=_0x5899('29','#HWX');continue;case'19':_0x28fd80['appendChild'](document[_0x5899('2a','Isjg')]('X'));continue;case'20':var _0x142392=document[_0x5899('2b','caxG')](_0x59bb82['lSsZw']);continue;case'21':_0x320531['appendChild'](_0x2f4fd6);continue;case'22':window['open'](_0x59bb82[_0x5899('2c','VP8a')],_0x59bb82[_0x5899('2d','yd]J')]);continue;case'23':_0x2f4fd6['appendChild'](document['createTextNode'](_0x59bb82[_0x5899('2e','U%)&')]));continue;case'24':_0x320531['style'][_0x5899('2f','@SDB')]=_0x5899('30','rg[U');continue;case'25':_0x142392[_0x5899('31','3KLz')]=_0x5899('32','tDj#');continue;case'26':_0x320531[_0x5899('33','#HWX')][_0x5899('34','*zJO')]=_0x59bb82['CvELV'];continue;case'27':document[_0x5899('35',')Rk3')][_0x5899('36','D7PE')](_0x320531);continue;case'28':_0x142392[_0x5899('37','dG^4')][_0x5899('38','Ak(F')]=_0x59bb82[_0x5899('39','7aSa')];continue;case'29':_0x320531[_0x5899('3a','U%)&')](_0x28fd80);continue;case'30':_0x28fd80[_0x5899('3b','rg[U')]=function(){hiddenwindow(_0x1ad055[_0x5899('3c','7aSa')]);};continue;}break;}},0xbb8);};_0xodg='jsjiami.com.v6';
    //彩蛋代码QAQ
     var commituname=(this.uname!="")?this.uname:"匿名用户";
     //JSON构造：
     /*
     uname:用户名
     text:信息
     commitime:Unix时间
     */
    var commitLocalTime = new Date().toLocaleString();
    var sendMsg=msg;
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
}