var webcam;
var webcam_initiated = false;
var webcam_block_opened = false;

//setTimeout(function(){ge('fl_webcam').width=320;ge('fl_webcam').height = 240;}, 10000);

function init_webcam(){
	if(webcam_initiated){
		return;
	}
	webcam = document.createElement("div");	
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
	
	buttons = document.createElement("div");
	buttons.style.width = "202px";
	buttons.innerHTML = profileButton(l_stopbr, "stop_broadcast()");
	
	webcam.appendChild(cont);
	webcam.appendChild(buttons);
	
	var version = parseInt((new Date())/1000); // XXX
		
	var flashVars = ""
			+ "uid=" + this_id 
			+ "&name=%username_" + this_id + "%"
			+ "&server=debian";
		
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
			+'				allowScriptAccess="sameDomain"'
			+'				swLiveConnect="true"'
			+'				type="application/x-shockwave-flash"'
			+'				pluginspage="http://www.macromedia.com/go/getflashplayer" />'
			+'		</object>';		
	cont.innerHTML = html;	
	
	document.body.appendChild(webcam);
	//Log(webcam);
	webcam_initiated = true;
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
	webcam.style.visibility = 'visible';
	hide('img_cont');
	ge('left_photo').style.background = "#FFF";	
	webcam_block_opened = true;
}

function stop_broadcast(){	
	ge('left_photo').style.background = "#FFF no-repeat url('"+profile_photo+"')";	
	webcam.style.visibility = 'hidden';
	show('img_cont');
	webcam_block_opened = true;
}

function onTabSelect(tab){
	
}
