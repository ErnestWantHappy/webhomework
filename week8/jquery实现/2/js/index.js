var tabs = document.getElementsByClassName("m-menu")[0].getElementsByTagName("div"),
    contents = document.getElementsByClassName("m-content")[0].getElementsByClassName("content");
    $(contents[0]).show(); 
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
$(init)

function init() {
    $("body").on('click', '.btn-del', function () {
      $(this).parent().remove();
    });
    $("body").on('click', '.btn-add', function () {
      var $li = $("li:last").clone(true);
      $("li:last").after($li);
      var s=$("li:last>span").text();//字符串，代表当前span元素的序号
      var number=parseInt(s); 
      $("li:last>span").text(number+1);
    });
}


//js实现图片放大缩小
var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');
var hiddenCanvas = document.createElement("canvas");
var hiddenContext = hiddenCanvas.getContext('2d');
 hiddenCanvas.width = canvas.width;
    hiddenCanvas.height = canvas.height;
var img1 = new Image();
img1.src = 'img/1.jpg';
var img2 = new Image();
img2.src = 'img/2.jpg';
var flag=1;
img1.onload = function () { 
   context.drawImage(img1, 5, 10, 50, 50);
   context.drawImage(img1, 65, 10, 50, 50);
   context.drawImage(img1, 125, 10, 50, 50);
   context.drawImage(img1, 185, 10, 50, 50);
   context.drawImage(img1, 245, 10, 50, 50);
}
img2.onload = function () { 
   context.drawImage(img2, 5, 80, 50, 50);
   context.drawImage(img2, 65, 80, 50, 50);
   context.drawImage(img2, 125, 80, 50, 50);
   context.drawImage(img2, 185, 80, 50, 50);
   context.drawImage(img2, 245, 80, 50, 50);  
}
    hiddenContext.drawImage(canvas, 0, 0);

function drawBackground() {
   console.log("sxxs");
    context.drawImage(hiddenCanvas, 0, 0);
}


canvas.onmousedown = function () {
    x=event.clientX;
    y=event.clientY;
    console.log(x,y);
    if(flag){
      if((y>=40)&&(y<=205)){
        if((x>=30)&&(x<=1180)){
         context.drawImage(img1, 100, 0, 150, 150);
         flag=0;
        }
      }
      if((y>=275)&&(y<=435)){
         if((x>=30)&&(x<=1180)){
         context.drawImage(img2, 100, 0, 150, 150);
         flag=0;
        }
      }
    }
    else{
      context.clearRect(0, 0, canvas.width, canvas.height);
      flag=1;
      context.drawImage(img1, 5, 10, 50, 50);
   context.drawImage(img1, 65, 10, 50, 50);
   context.drawImage(img1, 125, 10, 50, 50);
   context.drawImage(img1, 185, 10, 50, 50);
   context.drawImage(img1, 245, 10, 50, 50);
   context.drawImage(img2, 5, 80, 50, 50);
   context.drawImage(img2, 65, 80, 50, 50);
   context.drawImage(img2, 125, 80, 50, 50);
   context.drawImage(img2, 185, 80, 50, 50);
   context.drawImage(img2, 245, 80, 50, 50);
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