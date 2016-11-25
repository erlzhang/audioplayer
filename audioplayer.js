/*Audio Player*/
var musiclist = [{
	"name" : "青の夜明け",
	"url" : "http://ognvs93or.bkt.clouddn.com/1.mp3",
	"author" : "矶村由纪子"
},{
	"name" : "New King",
	"url" : "http://ognvs93or.bkt.clouddn.com/2.mp3",
	"author" : "遠藤幹雄"
},{
	"name" : "Icy Cold as Winter",
	"url" : "http://ognvs93or.bkt.clouddn.com/3.mp3",
	"author" : "Swing Out Sister"
},{
	"name" : "碎月雨中奏",
	"url" : "http://ognvs93or.bkt.clouddn.com/4.mp3",
	"author" : "iw ix"
}];


var index = 0,//当前序号
	music,//当前音乐
	volume = 1,//当前音量
	len = musiclist.length - 1

//创建播放列表
var content = ""
for(var i = 0; i <= len;i++){
	content += '<li onclick="ChangeAudio('+ i +')" >' + musiclist[i].name + '</li>';
}
$(".list").html(content);


ShowAudio(index)

function ShowAudio(i){
	music = new Audio(musiclist[i].url)
	music.volume = volume;
	document.getElementById("name").innerHTML = musiclist[i].name
	document.getElementById("musician").innerHTML = musiclist[i].author

	PlayAudio(music)
	document.getElementById("play").addEventListener("click",PlayAudio)
	document.getElementById("muted").addEventListener("click",MuteAudio)
	document.getElementsByName("volume")[0].addEventListener("change",ChangeVolume)
	music.addEventListener("timeupdate",function(){
		//console.log(music.currentTime);
		var percentage = music.currentTime/music.duration;
		//console.log(percentage * 100 + "%");
		$(".current").css("width",percentage * 100 + "%");
	});
	music.addEventListener("ended",NextAudio);
	$(".list li").removeClass("current-audio").eq(i).addClass("current-audio");
}

//下一首
$("#forward").click(NextAudio);
	
//上一首
$("#backward").click(PrevAudio)	

function NextAudio(){
	RemoveAudioData(music);
	if(index == len){
		index = 0;
	}else{
		index++;
	}
	ShowAudio(index)
}


function PrevAudio(){
	RemoveAudioData(music);
	if(index == 0){
		index = len;
	}else{
		index--;
	}
	ShowAudio(index)
}

function ChangeAudio(i){
	RemoveAudioData(music);
	index = i;
	ShowAudio(index)
}


//清除当前音乐数据
function RemoveAudioData(music){
	music.currentTime = 0
	music.pause()
	document.getElementById("play").removeEventListener("click",PlayAudio)
	document.getElementById("muted").removeEventListener("click",MuteAudio)
	document.getElementsByName("volume")[0].removeEventListener("change",ChangeVolume)	
}
	
//播放/暂停音乐
function PlayAudio(){
	if(!music.paused){
		music.pause()
		$('#play').children().removeClass("fa-pause").addClass("fa-play")	
	}else{
		music.play()
		$('#play').children().removeClass("fa-play").addClass("fa-pause")			
	}
}

//静音
function MuteAudio(){
	if(!music.muted){
		music.muted = true
		$("#muted").children().removeClass("fa-volume-up").addClass("fa-volume-off")
	}else{
		music.muted = false
		$("#muted").children().removeClass("fa-volume-off").addClass("fa-volume-up")
	}	
}

//调节音量	
function ChangeVolume(){
	volume = this.value/10;
	music.volume = volume;
}

$(".progress").click(function(){
	var width = $(this).width();
	var x = event.offsetX;
	var p = ( x/width ) * music.duration;
	music.currentTime = p
	console.log(event.offsetX);
});

