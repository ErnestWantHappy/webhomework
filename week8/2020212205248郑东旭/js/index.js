var tabs = document.getElementsByClassName("m-menu")[0].getElementsByTagName("div"),
    contents = document.getElementsByClassName("m-content")[0].getElementsByClassName("content");
    $(contents[0]).show(); 
    $(contents[2]).hide(); 
//jquery实现点击标签换页
function clk(e){
    for(var i = 0,len = tabs.length;i<len;i++){
        if(i+1==e){
            tabs[i].className = 'current';
            console.log($(contents[i]));
            $(contents[i]).show();  
        }else{
            tabs[i].className = '';
            $(contents[i]).hide();
        }
    }
}
//js实现点击标签换页
// function clk(e){
//     for(var i = 0,len = tabs.length;i<len;i++){
//         if(i+1==e){
//             tabs[i].className = 'current';
//             contents[i].style.display = "flex";
//         }else{
//             tabs[i].className = '';
//             contents[i].style.display = "none";
//         }
//     }
// }

//jqurey实现图片放大缩小
 $(function() {
        $(".img-responsive").click(function (){
            debugger
            var _this=$(this);
            imgShow("#outerdiv","#innerdiv","#bigimg",_this);
        });
    });
 
    function imgShow(outerdiv,innerdiv,bigimg,_this){
        debugger
        var src=_this.attr("src");
        $(bigimg).attr("src",src);
        $("<img/>").attr("src",src).on('load',function () {
            debugger
            var windowW=$(window).width()
            var windowH=$(window).height();
            var realWidth=this.width;
            var readHeight=this.height;
            var imgWidth,imgHeight;
            var scale=0.8;
            if(realWidth>windowW+scale){
                imgHeight=windowH*scale;
                imgWidth=imgHeight/readHeight*realWidth;
                if(imgWidth>windowW*scale){
                    imgWidth=windowW*scale;
                }
            }else if(realWidth>windowW*scale){
                imgWidth=windowW*scale;
                imgHeight=imgWidth/realWidth*readHeight;
            }else {
                imgWidth=realWidth;
                imgHeight=readHeight;
            }
            $(bigimg).css("width",imgWidth);
            var w=(windowW-imgWidth)/2;
            var h=(windowH-imgHeight)/2;
            $(innerdiv).css({"top":h,"left":w});
            $(outerdiv).fadeIn("fast");
        });
        $(outerdiv).click(function (){
            $(this).fadeOut("fast");
        });
    };
//jqurey实现数据管理操作
var lis = document.getElementsByClassName("m-index")[0].getElementsByTagName("li"),
    spans =document.getElementsByClassName("m-index")[0].getElementsByTagName("span");
function sort(){
    for(var i=1,len=lis.length;i<len;i++){
        // lis[i].id = "l"+i;
        lis[i].className = "";
        spans[i].innerHTML=i+1;
    }
}

$(init)

function init() {
    $("body").on('click', '.btn-del', function () {
      $(this).parent().remove();
      sort();
    });
    $("body").on('click', '.btn-add', function () {
      console.log($("li.haha:last"));
      var $li = $("li.haha:last").clone(true);
      $("li.haha:last").after($li);
      var s=$("li.haha:last>span").text();//字符串，代表当前span元素的序号
      var number=parseInt(s); 
      $("li.haha:last>span").text(number+1);
      sort();
    });
}


// js实现点击图片放大
var tmpimg = document.getElementById("showimg");
var timg = document.getElementById("t-img");
var interval1,interval2;
function imgclk(isrc){
    timg.src = isrc;
    tmpimg.style.display = "flex";
    tmpimg.style.opacity = 0;
    interval1= setInterval(imgin,10);
}

function imgin(){
    var tp = Number(tmpimg.style.opacity)
    if(tp>=1){
        clearInterval(interval1);
    }
    else{
        tp = tp+0.05
        tmpimg.style.opacity = tp;
    }
}
function timgclk(){
    interval2 = setInterval(imgout,10);
}
function imgout(){
    var tp = Number(tmpimg.style.opacity)
    if(tp<=0){
        clearInterval(interval2);
        tmpimg.style.display = "none";
    }
    else{
        tp = tp-0.05
        tmpimg.style.opacity = tp;
    }
}


//js实现数据管理操作
var number=3;
        window.onload = () => {
            // 给获取的 id 添加点击事件
            // 添加用户
            document.getElementById("btn_submit").onclick = function () {
            number=number+1;
            let username=number;
				
                // let tel = document.getElementById("tel").value;
                let tbody = document.getElementById("userTbody");
               
                    // 设置要插入的表格行信息
                    let tr = "<tr id=\"" + number + "\">\n" +
                        "<td>" + username + "</td>\n" +
                        "<td width=\"250\">" + "" + "</td>\n" +
                        "<td width=\"50\"><a href=\"javascript:delRow(number)\">删除</a></td>\n" +
                        "</tr>";

                    // 把新插入的行信息插入表格中
                    
                    tbody.innerHTML += tr;
            };

            document.getElementById("btn_removeAll").onclick = () => {
                var tbody = document.getElementById("userTbody");
                tbody.innerHTML = "";
                number=0;
            };
        };
        // 删除用户
        function delRow(id) {
            let tr = document.getElementById(id);
            tr.parentNode.removeChild(tr);
            console.log(id);
            console.log(number.toString());
            if(id==number.toString()){
            	number=number-1;
            	console.log("bfbbf");
            }
        }