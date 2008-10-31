var webcam = document.createElement("div");
var webcam_buttons;
var fl = {
	opened: {},
	initiated: 0,
	loaded: 0,
	queue: []
};

//setTimeout(function(){ge('fl_webcam').width=320;ge('fl_webcam').height = 240;}, 10000);

function init_webcam(){
	if(fl.initiated){
		webcam_buttons.innerHTML = id == this_id
			? profileButton(l_stopbr, "stop_broadcast()")
			: profileButton(l_stopwtch, "stop_watch()");
		return;
	}		
	webcam.id = "webcam";
	var xy = absolute_xy(ge('left_photo'));
	var fl_size = ["100%", "100%"];
	//var webcam_size = [214, 200];
	var cont_size = [214, 152];
		
	//webcam.style.width = webcam_size[0] + "px"; 
	//webcam.style.height = webcam_size[1] + "px";	
	webcam.style.left = xy.left + "px";
	webcam.style.top = xy.top + "px";
	
	cont = document.createElement("div");	
	cont.style.width = cont_size[0] + "px"; 
	cont.style.height = cont_size[1] + "px";	
	
	webcam_buttons = document.createElement("div");
	webcam_buttons.style.width = "202px";
	webcam_buttons.innerHTML = id == this_id
		? profileButton(l_stopbr, "stop_broadcast()")
		: profileButton(l_stopwtch, "stop_watch()");
	
	webcam.appendChild(cont);
	webcam.appendChild(webcam_buttons);
	
	var version = parseInt((new Date())/1000); // XXX
		
	var flashVars = ""
			+ "uid=" + this_id 
			+ "&name=%username_" + this_id + "%"
			+ "&server=test.vkadre.ru";
		
	var html = ''
			+'		<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="' + fl_size[0] + '" height="' + fl_size[1] + '" id="fl_webcam" align="left">'
			+'			<param name="allowScriptAccess" value="sameDomain" />'
			+'			<param name="movie" value="flash/Webcam.swf?' + version + '" />'
			+'			<param name="quality" value="high" />'
			+'			<param name="wmode" value="opaque" />'
			+'			<param name="FlashVars" value="' + flashVars + '" />'
			+'			<param name="menu" value="false" />'
			+'			<embed '
			+'				src="flash/Webcam.swf?' + version + '"'
			+'				FlashVars="' + flashVars + '"'
			+'				menu="false"'
			+'				wmode="opaque"'
			+'				quality="high"'			
			+'				width="' + fl_size[0] + '"'
			+'				height="' + fl_size[1] + '"'
			+'				name="fl_webcam"'
			+'				align="left"'
			+'				allowScriptAccess="always"'
			+'				swLiveConnect="true"'
			+'				type="application/x-shockwave-flash"'
			+'				pluginspage="http://www.macromedia.com/go/getflashplayer" />'
			+'		</object>';		
	cont.innerHTML = html;	
	
	document.body.appendChild(webcam);
	//Log(webcam);
	fl.initiated = 1;
}

function Log(a){
	console.log(a);
}

function absolute_xy(el){
	if (!el)
    {
        return {left: 0, top: 0};
    }
    var _top  = el.offsetTop;
    var _left = el.offsetLeft;
    while (el.offsetParent)
    {
        _left += el.offsetParent.offsetLeft;
        _top  += el.offsetParent.offsetTop;
        el   = el.offsetParent;
    }
    return {left: _left, top: _top};
}

function start_broadcast(){
	init_webcam();
	switchWebcam(1);
	fl.opened[id] = 1;
	FLPush("start-broadcast");
}

function stop_broadcast(){
	switchWebcam(0);
	fl.opened[id] = 0;
	FLPush("stop-broadcast");	
}

function start_watch(){
	init_webcam();
	switchWebcam(1);
	fl.opened[id] = 1;
	FLPush("start-watch", {uid: id});
}

function stop_watch(){
	switchWebcam(0);
	fl.opened[id] = 0;
	FLPush("stop-watch");
}

function switchWebcam(showcam){	
	webcam.style.visibility = showcam ? 'visible' : 'hidden';
	showcam ? hide('img_cont') : show('img_cont');
	ge('left_photo').style.background = showcam ? "#FFF" : "#FFF no-repeat url('"+profile_photo+"')";	
}

function onTabSelect(tab){
	Log("onTabSelect: " + tab + " " + id + "/" + this_id + "/ " + (fl.opened[id] ? "opened" : "closed"));
	switchWebcam(tab == "main" && fl.opened[id]);
}

function FLPush(action, data){
	data = data || {};
	if(!fl.loaded){
		fl.queue.push({action: action, data: data});
	} else {
		try{
			Log("FLPush: " + action);			
			var exec = document.fl_webcam.JSCallback(action, data);			
			if(exec != "ok"){
				throw("error");
			}
		} catch(e) {
			alert("EI failed: " + e);
		}
	}
}

function FLCallback(action, data){
	// Log("FLCallback: " + action);
	switch(action){
		case "loaded":
			fl.loaded = 1;
			for(var k in fl.queue){
				FLPush(fl.queue[k].action, fl.queue[k].data);
			}
			break;
		case "Log":
			Log("FL: " + data);
			break;
	}
}
