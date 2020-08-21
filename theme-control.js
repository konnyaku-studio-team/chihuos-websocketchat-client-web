// 显示窗口。
function openwindow(wnm){
    console.debug("[debug]["+new Date()+"]运行了openwindow函数！");
    var connectwindow=document.getElementById(wnm);
    var mask=document.getElementById("mask");
    connectwindow.style.display="block";
    mask.style.display="block";
}
// 隐藏窗口。
function hiddenwindow(wnm){
    console.debug("[debug]["+new Date()+"]运行了hiddenwindow函数！");
    var connectwindow=document.getElementById(wnm);
    var mask=document.getElementById("mask");
    connectwindow.style.display="none";
    mask.style.display="none";
}
