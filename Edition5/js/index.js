var audio = new Audio();  // 创建Audio对象
$(function(){
    var playerContent1 = $('#player-content1');// 歌曲信息模块部分dom元素
    var musicName = $('.music-name');          // 歌曲名部分dom元素 
    var artistName = $('.artist-name');        // 歌手名部分dom元素
    
    var musicImgs = $('.music-imgs');          // 左侧封面图dom元素
  
    var playPauseBtn = $('.play-pause');       // 播放/暂停按钮 dom元素
    var playPrevBtn = $('.prev');              // 上一首按钮 dom元素
    var playNextBtn = $('.next')               // 下一首按钮 dom元素
    
    var time = $('.time');                     // 时间信息部分 dom元素
    var tProgress = $('.current-time');        // 当前播放时间文本部分 dom元素
    var totalTime = $('.total-time');          // 歌曲总时长文本部分 dom元素
    
    var sArea = $('#s-area');                  // 进度条部分
    var insTime = $('#ins-time');              // 鼠标移动至进度条上面，显示的信息部分
    var sHover = $('#s-hover');                // 鼠标移动至进度条上面，前面变暗的进度条部分
    var seekBar = $('#seek-bar');              // 播放进度条部分
    var play = $("#lrc_row1");
    
    // 一些计算所需的变量
    var currLrc;
    var seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0
    var musicImgsData = ['img/bg.jpg','img/bg1.jpg','img/bg2.jpg','img/bg3.jpg','img/bg4.jpg']    // 图片地址数组
    var musicNameData = ['出山','盗将行','归去来兮','迷人的危险','稻香'];                   // 歌曲名数组
    var artistNameData = ['花粥/王胜娚','花粥/马雨阳','花粥','蔡黄汝','周杰伦']            // 创作歌手数组
    var musicUrls=['mp3/music1.mp3','mp3/music2.mp3','mp3/music3.mp3','mp3/music4.mp3','mp3/music5.mp3'];// 歌曲mp3数组
    var lrcData = ['lrc/lrc1.lrc','lrc/lrc2.lrc','lrc/lrc3.lrc','lrc/lrc4.lrc','lrc/lrc5.lrc'];//lrc歌词文件数组
    var currIndex = -1;              // 当前播放索引
    
    var buffInterval = null;          // 初始化定时器 判断是否需要缓冲
    var len = musicNameData.length;  // 歌曲长度

    //歌词滚动
    function lrcDisplay() {
            //获取播放进度(转换的格式为: 00:00)
            var minute = parseInt(audio.currentTime / 60);//分钟
            minute = minute == 0 ? "00" : (minute + "").length < 2 ? "0" + minute : minute;
            //获取秒数
            var second = (parseInt(audio.currentTime)) % 60;
            second = second == 0 ? "00" : (second + "").length < 2 ? "0" + second : second;
            //正则表达匹配歌词
            // var regex = new RegExp('\\[' + (minute + ":" + second) + '.+\\].+\n');//把格式变成[00:10]
            var regex = new RegExp('\\[' + (curMinutes + ":" + curSeconds) + '.+\\].+\n');
            var text = regex.exec($("#div_1").text());
            // var regex = new RegExp('\\[' + (curMinutes + ":" + curSeconds) + '.+\\].+\n');
            // var text = regex.exec($("#div_1").text());
            if (text != null) {
                var str1 = new String($(play).next().text());
                var str2 = new String(text[0].substring(10));
                if (str1.trim() != str2.trim()) {
                    //歌词颜色变色
                    $(lrc_row1).text(str2);
                }
            }
        }
 

    // 点击 播放/暂停 按钮，触发该函数
    // 作用：根据audio的paused属性 来检测当前音频是否已暂停  true:暂停  false:播放中
    function playPause(){
        if(audio.paused){
            playerContent1.addClass('active'); // 内容栏上移
            musicImgs.addClass('active');      // 左侧图片开始动画效果
            playPauseBtn.attr('class','btn play-pause icon-zanting iconfont') // 显示暂停图标
            checkBuffering(); // 检测是否需要缓冲
            audio.play();     // 播放
            
        }else{
            playerContent1.removeClass('active'); // 内容栏下移
            musicImgs.removeClass('active');      // 左侧图片停止旋转等动画效果
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont'); // 显示播放按钮
            clearInterval(buffInterval);          // 清除检测是否需要缓冲的定时器
            musicImgs.removeClass('buffering');    // 移除缓冲类名
            audio.pause(); // 暂停
        }  
    }


    // 鼠标移动在进度条上， 触发该函数	
	function showHover(event){
		seekBarPos = sArea.offset();    // 获取进度条长度
		seekT = event.clientX - seekBarPos.left;  //获取当前鼠标在进度条上的位置
		seekLoc = audio.duration * (seekT / sArea.outerWidth()); //当前鼠标位置的音频播放秒数： 音频长度(单位：s)*（鼠标在进度条上的位置/进度条的宽度）
		
		sHover.width(seekT);  //设置鼠标移动到进度条上变暗的部分宽度
		
		cM = seekLoc / 60;    // 计算播放了多少分钟： 音频播放秒速/60
		
		ctMinutes = Math.floor(cM);  // 向下取整
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60); // 计算播放秒数
		
		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);  // 设置鼠标移动到进度条上显示的信息
            
		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);  // 淡入效果显示
		
	}

    // 鼠标移出进度条，触发该函数
    function hideHover()
	{
        sHover.width(0);  // 设置鼠标移动到进度条上变暗的部分宽度 重置为0
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0); // 淡出效果显示
    }

    // 鼠标点击进度条，触发该函数
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc; // 设置音频播放时间 为当前鼠标点击的位置时间
		seekBar.width(seekT);        // 设置进度条播放长度，为当前鼠标点击的长度
		hideHover();                 // 调用该函数，隐藏原来鼠标移动到上方触发的进度条阴影
    }

    // 在音频的播放位置发生改变是触发该函数
    function updateCurrTime()
	{
        nTime = new Date();      // 获取当前时间
        nTime = nTime.getTime(); // 将该时间转化为毫秒数

        // 计算当前音频播放的时间
		curMinutes = Math.floor(audio.currentTime  / 60);
        curSeconds = Math.floor(audio.currentTime  - curMinutes * 60);
        
		// 计算当前音频总时间
		durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);
        
		// 计算播放进度百分比
		playProgress = (audio.currentTime  / audio.duration) * 100;
        
        // 如果时间为个位数，设置其格式
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            totalTime.text('00:00');
        else
		    totalTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            time.removeClass('active');
        else
            time.addClass('active');

        // 设置播放进度条的长度
		seekBar.width(playProgress+'%');
        
        // 进度条为100 即歌曲播放完时
		if( playProgress == 100 )
		{
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont'); // 显示播放按钮
			seekBar.width(0);              // 播放进度条重置为0
            tProgress.text('00:00');       // 播放时间重置为 00:00
            musicImgs.removeClass('buffering').removeClass('active');  // 移除相关类名
            clearInterval(buffInterval);   // 清除定时器

            selectTrack(1);  // 添加这一句，可以实现自动播放
		}
    }

    // 定时器检测是否需要缓冲
    function checkBuffering(){
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            // 这里如果音频播放了，则nTime为当前时间毫秒数，如果没播放则为0；如果时间间隔过长，也将缓存
            if( (nTime == 0) || (bTime - nTime) > 1000  ){ 
                musicImgs.addClass('buffering');  // 添加缓存样式类
            } else{
                musicImgs.removeClass('buffering'); // 移除缓存样式类
            }
                
            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }
   
    // 点击上一首/下一首时，触发该函数。 
    //注意：后面代码初始化时，会触发一次selectTrack(0)，因此下面一些地方需要判断flag是否为0
    function selectTrack(flag){
        $("#div_lrc").empty();//清空之前的歌词
        $("#div_lrc").append('<p></p>');
        $("#div_lrc").children().attr("id", "lrc_row1");
        if( flag == 0 || flag == 1 ){  // 初始 || 点击下一首
            ++ currIndex;
            if(currIndex >=len){      // 当处于最后一首时，点击下一首，播放索引置为第一首
                currIndex = 0;
            }
        }else{                    // 点击上一首
            --currIndex;
            if(currIndex<=-1){    // 当处于第一首时，点击上一首，播放索引置为最后一首
                currIndex = len-1;
            }
        }

        if( flag == 0 ){
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont'); // 显示播放图标
        }else{
            musicImgs.removeClass('buffering');   
            playPauseBtn.attr('class','btn play-pause icon-zanting iconfont') // 显示暂停图标
        }

        seekBar.width(0);           // 重置播放进度条为0
        time.removeClass('active');
        tProgress.text('00:00');    // 播放时间重置
        totalTime.text('00:00');    // 总时间重置

        // 获取当前索引的:歌曲名，歌手名，图片，歌曲链接等信息
        currMusic = musicNameData[currIndex];
        currArtist = artistNameData[currIndex];
        currImg = musicImgsData[currIndex];
        audio.src = musicUrls[currIndex];
        currLrc = lrcData[currIndex];

        
        nTime = 0;
        bTime = new Date();
        bTime = bTime.getTime();

        // 如果点击的是上一首/下一首 则设置开始播放，添加相关类名，重新开启定时器
        if(flag != 0){
            audio.play();
            playerContent1.addClass('active');
            musicImgs.addClass('active');
        
            clearInterval(buffInterval);
            checkBuffering();
        }

        // 将歌手名，歌曲名，图片链接，设置到元素上
        artistName.text(currArtist);
        musicName.text(currMusic);
        musicImgs.find('.img').css({'background':'url('+currImg+')'})
        $('#div_1').load(currLrc);
        setInterval(lrcDisplay, 10);
    }


    // 初始化函数
    function initPlayer() {

        audio = new Audio();  // 创建Audio对象
		selectTrack(0);       // 初始化第一首歌曲的相关信息
		audio.loop = false;   // 取消歌曲的循环播放功能
		$('#div_1').load(currLrc);
        playPauseBtn.on('click',playPause); // 点击播放/暂停 按钮，触发playPause函数
        
		// 进度条 移入/移出/点击 动作触发相应函数
		sArea.mousemove(function(event){ showHover(event); }); 
        sArea.mouseout(hideHover);
        sArea.on('click',playFromClickedPos);
        
        // 实时更新播放时间
        $(audio).on('timeupdate',updateCurrTime); 

        // 上下首切换
        playPrevBtn.on('click',function(){ selectTrack(-1);} );
        playNextBtn.on('click',function(){ selectTrack(1);});
    }

    // 调用初始化函数
    initPlayer();

});
//山羊图标的js实现
var canvas = document.getElementById('p1');
// var context = canvas.getContext('2d');
let img = document.querySelector('.imgshan')
        // 定义小图片的旋转角度
        let deg = 0
        // 定义小图片位于网页左侧的位置      
        let imgx = 0
        // 定义小图片位于网页顶部的位置
        let imgy = 0
        // 定义小图片x轴的位置
        let imgl = 0
        // 定义小图片y轴的位置
        let imgt = 0
        // 定义小图片翻转的角度
        let y = 0 
        // 定义一个计数器
        let index = 0

        window.addEventListener('mousemove',function(xyz){
            var e = event || window.event;
            var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft;//获取当前页面滚动条横坐标的位置
            var scrolly= document.documentElement.scrollTop || document.body.scrollTop;//获取当前页面滚动条纵坐标的位置
            var x = e.pageX || e.clientX + scrollx;
            var y0 = e.pageY || e.clientY + scrolly;
            // 获取网页左侧距离的图片位置
            imgx = x - img.offsetLeft - img.clientWidth /2
            // 多去网页顶部距离图片的位置
            imgy = y0 - img.offsetTop - img.clientHeight /2
            // 套入公式，定义图片的旋转角度
            deg = 360*Math.atan(imgy/imgx)/(2*Math.PI)
            // 每当鼠标移动的时候重置index
            index= 0
            // 定义当前鼠标的位置
            // let x = e.clientX
            // 当鼠标的x轴大于图片的时候，提普安就要对着鼠标，所以需要将图片翻转过来
            // 否则就不用翻转
            if(img.offsetLeft<x){
                y=-180
            }else{
                y=0
            }
        })
        setInterval(()=>{
            // 设置小图片的旋转和翻转
            img.style.transform = "rotateZ("+deg+"deg) rotateY("+y+"deg)"
            index++
            // 在这里设置小图片的位置和速度，并判断小图片到达鼠标位置时停止移动
            if(index<80){
                imgl+=imgx/80
                imgt+=imgy/80
            }
            img.style.left = imgl+"px"
            img.style.top = imgt+"px"
        },10)

//调节音量

// var rightBox=$("#rightBox");
var box=$("#box");
function init() {
    audio.volume = 1;//将控件音量初始值设置1
    mouseMove(rightBox, document);//其实rightbox是左边的那个月亮
}
 
function mouseMove(ele, parent) {
    ele.addEventListener('mousedown', moveHandler);//鼠标点击时触发moveHandler方法
    ele.style.position = 'absolute';
    ele.parent = parent;//传递父元素（可省略）
}
 
function moveHandler(e) {//moveHandler是个回调函数，鼠标按下，移动，松开都会触发，根据event的type判断事件类型
    if (e.preventDefault) {//取消系统默认事件
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
    if (e.type === 'mousedown') {
        // 下面将被点击的元素及元素在X方向的偏移通过父元素传递（放入内存中）
        this.parent.ele = this;
        this.parent.point = {
            x: e.offsetX
        }
        // 为元素添加鼠标移动和松开事件
        this.parent.addEventListener('mousemove', moveHandler);
        this.addEventListener('mouseup', moveHandler);
        this.addEventListener('mouseout',moveHandler);
    } else if (e.type === 'mousemove') {
        if (rightBox.offsetLeft - leftBox.offsetLeft >= 50 || rightBox.offsetLeft - leftBox.offsetLeft <= -50) {//当被移动元素与另一个元素无交集时，改变样式，使音量为0
            audio.volume = 1;
            // $(".vol").css("background","rgb(28,160,210)");
            // $(".m-volume1").css("background","linear-gradient(#1CA0D2, #57D2D9)");
            rightBox.style.background = 'rgba(250, 242, 107, 100)';
        } else {//当被移动元素与另一个元素有交集时，改变样式为渐变，使音量为相交面积的百分比（这里是两圆心之间的距离）
            var count = 1 - Math.abs(rightBox.offsetLeft - leftBox.offsetLeft) / 50;
            audio.volume = 1-count;
            var rgb1=28+50*count;
            var rgb2=160-136*count;
            var rgb3=210-133*count;
            $(".vol").css("background",'rgb('+ rgb1 +','+ rgb2 +','+ rgb3 +')');
            $(".m-volume1").css("background",'linear-gradient(rgb('+ rgb1 +','+ rgb2 +','+ rgb3 +'), #57D2D9)');
            rightBox.style.background = `rgb(${28+50*count},${160-136*count},${210-133*count})`;
        }
        this.ele.style.left = e.x - this.point.x + "px";
    } else if (e.type === 'mouseup') {
        // 鼠标松开时释放内存及事件监听
        this.parent.removeEventListener("mousemove", moveHandler);
        this.parent.ele = null;
        this.parent.point = null;
    } else if (e.type === 'mouseout') {
        // 鼠标松开时释放内存及事件监听
        this.parent.removeEventListener("mousemove", moveHandler);
        this.parent.ele = null;
        this.parent.point = null;
    }
}

init()//入口函数
