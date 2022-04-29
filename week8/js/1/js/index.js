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