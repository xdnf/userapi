var Tagger = function(photoAreaId, photoId, newSize, isResizable) {
	// box decoration
	var boxDecoration = "<div id='taggerDecor1'></div>";
	// minimum W and H of the frame when resizing
	var frameMinW = 26, frameMinH = 26;
	// maximum frame W and H, -1 - no limit (not implemented)
	var frameMaxW = -1, frameMaxH = -1;
	// newly create frame size	
	var frameNewW = newSize ? newSize[0] : 100, frameNewH = newSize ? newSize[1] : 100;
  // frame padding for helpers
	var helpersPadding = -5;

	var resizable = isResizable !== undefined ? isResizable : true;
	
	// Helpers and the frame itself
	//	var frameElements = ['nw', 'n', 'ne', 'w', 'taggerBox', 'taggerBoxInside', 'spyphoto', 'e', 'sw', 's', 'se'];
	var frameElements = [];
	// Helpers only
	var frameHelpersNames = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'];
	// 3x3 matrix of parameters place and inset sign
	var helpersArgs = [	[0, 3,  1,  1], [1, 3,  0,  1], [2, 3, -1,  1],
                      [0, 4,  1,  0],                 [2, 4, -1,  0], 
                      [0, 5,  1, -1], [1, 5,  0, -1], [2, 5, -1, -1]];
	var frameHelpers = [];
	// cache tagframe width and height
	var tfW = 0, tfH = 0, tfX = 0, tfY = 0;
	
	// helpers width and height (only once since they all share one css class)
	var hW = 0; var hH = 0;
	
	// photo area bounding box - don't use in movement calculations!, see below
	var paLeft = 0, paRight = 0, paTop = 0, paBottom = 0, paHeight = 0, paWidth = 0;
	// same as above, but modified by some little value (currently 0)
	// useful if needed to constraint frame movement inside 'photoframe'
	var paLeftH = 0, paRightH = 0, paTopH = 0, paBottomH = 0;		// same as above but minus handlers

	var correctionW = 0, correctionH = 0;
	
	// to store size before resizing began
	var tW, tH, tX, tY;
	// to store offset when dragging
	var xOff = 0, yOff = 0;
	// various values and elements we need to cache
	var photoArea, photo, spy = null, tf = null, tfi3 = null;
	var photoX = 0, photoY = 0;
	
	var tfIsShown = false;
	var initialized = false;
	var currentTagArea = null;
	var currentHelper = null;

	var tagging = false;
	
	var onBeginDrag, onEndDrag = null;

	function initElements()	{

		if (!initialized) {
 			profile_start = new Date().getTime();
			photoArea = ge(photoAreaId);
			photo = ge(photoId);	

			tf = photoArea.appendChild(document.createElement('div'));
			frameElements.push(tf);
			tf.id = 'taggerBox';	
			tf.innerHTML = boxDecoration;

			var lastChild = null;
			var boxDecorNum = 0;
			var recur = function(children) {
				var i, w = 0, h = 0, k = children.length;
				for (i = 0; i < k; i++) {
					var child = children[i];					
					if (child.nodeType == 1) {
						if (!child.id) {
							child.id = 'taggerBoxDecor' + boxDecorNum++;
						}
						frameElements.push(child);
						lastChild = child;
						w += parseInt(getStyle(child, 'border-left-width'), 0) + parseInt("0"+getStyle(child, 'margin-left'), 0) + parseInt(getStyle(child, 'padding-left'), 0) + parseInt(getStyle(child, 'border-right-width'), 0) + parseInt("0"+getStyle(child, 'margin-right'), 0) + parseInt(getStyle(child, 'padding-right'), 0);
						h += parseInt(getStyle(child, 'border-top-width'), 0) + parseInt("0"+getStyle(child, 'margin-top'), 0) + parseInt(getStyle(child, 'padding-top'), 0) + parseInt(getStyle(child, 'border-bottom-width')) + parseInt("0"+getStyle(child, 'margin-bottom'), 0) + parseInt(getStyle(child, 'padding-bottom'), 0);						
					}
					var wh = recur(child.childNodes);		
					w += wh[0]; h += wh[1];
				}				
				return [w, h];
			}
			var corrections = recur(tf.childNodes);
			correctionW = corrections[0] || 0; correctionH = corrections[1] || 0;
			if (!lastChild) {
				lastChild = tf;
			}

			tfi3 = lastChild.appendChild(document.createElement('div'));
			frameElements.push(tfi3);
			tfi3.id = 'taggerBoxInside';
			spy = tfi3.appendChild(document.createElement('img'));
			frameElements.push(spy);
			spy.id = 'spyphoto';
			spy.src = photo.src;
			spy.galleryimg = "no";
			fadedphoto = photoArea.appendChild(document.createElement('div'));
			frameElements.push(fadedphoto);
			fadedphoto.id = 'fadedphoto';

			var i, k = frameHelpersNames.length;
			for (i = 0; i < k; i++) {
				var helper = photoArea.appendChild(document.createElement('div'));
				helper.className = 'taggerHelper';
				helper.id = frameHelpersNames[i];
				helper.updatePos = function() {
					var _i = i, _helper = helper;
					var argX = helpersArgs[_i][0], argY = helpersArgs[_i][1];
					var diffX = helpersPadding * helpersArgs[_i][2], diffY = helpersPadding * helpersArgs[_i][3];
					return function() {
						_helper.style.left = (arguments[argX] + diffX) + "px";
						_helper.style.top = (arguments[argY] + diffY) + "px";
					};
				}();
				frameHelpers.push(helper);
				frameElements.push(helper);
			}				

			hW = parseInt(getStyle(helper, 'width', 10)); hH = parseInt(getStyle(helper, 'height', 10));	
// 			alert(new Date().getTime() - profile_start);
    }
	
//		if (photo.height > 30) {
		photoArea.style.width = photo.width + "px";
		photoArea.style.height = photo.height + "px";
//    }
	
		photoX = findX(photo);
		photoY = findY(photo);	
	
		// You can change values with 'H' suffix to apply constraints on frame movement (not implemented)
		paLeft = findX(photoArea) + 1;         paLeftH = paLeft;
		paTop = findY(photoArea);              paTopH = paTop;
		paWidth = photoArea.clientWidth;
		paHeight = photoArea.clientHeight;
		paRight = paLeft + paWidth;             paRightH = paRight;
		paBottom = paTop + paHeight;            paBottomH = paBottom;
		
		fadedphoto.style.left = "0px";
		fadedphoto.style.top = "0px";	
		fadedphoto.style.width = paWidth + "px";
		fadedphoto.style.height = paHeight + "px";
	
		initialized = true;
	}

  this.recorrect = function(option) {
    if(option ==1){
     correctionW = correctionH = 0;
    } else {
     correctionW = correctionH = 6;
    }
  }

  this.isTfShown = function() {
    return tfIsShown;
  }

	this.reAttach = function() {
//		initialized = false;
		photoArea = ge(photoAreaId);
		photo = ge(photoId);
		photoArea.appendChild(tf);
		photoArea.appendChild(fadedphoto);
		spy.src = photo.src;
  };
	
	this.beginTagging = function()
	{
		initElements();		
		photo.setAttribute('galleryimg', 'no');	
//		removeEvent(photoArea, "mousemove");
//		removeEvent(tfi3, 'mousemove');
//		removeEvent(spy, 'mousemove');
		addEvent(photoArea, 'mousedown', createFrame);
		var k = frameElements.length;
		for (i = 0; i < k; i++) {
			if (frameElements[i] == fadedphoto) { continue;	}
			addEvent(frameElements[i], 'mousedown', frameMouseDown);
			addEvent(frameElements[i], 'mouseup', frameMouseUp);
		}		
	};
	
	this.endTagging = function(destroy) {
		photo.setAttribute('galleryimg', 'yes');
		mouseUp();
		removeEvent(photoArea, 'mousedown');
		k = frameElements.length;
		for (i = 0; i < k; i++) {
			if (frameElements[i] == fadedphoto) { continue;	}
			removeEvent(frameElements[i], 'mousedown');
			removeEvent(frameElements[i], 'mouseup');
		}
//		addEvent(tfi3, "mousemove", function(e) { return cancelEvent(e); });
//		addEvent(spy, "mousemove", function(e) { return cancelEvent(e); });
//		addEvent(photoArea, "mousemove", showBoxOnMove);	
		tfIsShown = false;	
		this.hideBox();

		if (destroy) {
			var k = frameElements.length;
			for (i = 0; i < k; i++) {
				frameElements[i].parentNode.removeChild(frameElements[i]);
			}
			frameElements = frameHelpers = [];
			initialized = false;
		}
	};	

	this.setSizable = function(isSizable) {
		resizable = !!isSizable;
	};
		
	this.setOnBeginDrag = function(func) {
		onBeginDrag = func;
	};

	this.setOnEndDrag = function(func) {
		onEndDrag = func;
	};

	this.getPhotoarea = function() {
		initElements();
		return [paLeft, paTop, paWidth, paHeight];
	};

	this.getBox = function() {
		return [tfX, tfY, tfW, tfH];
	}
	
	this.showBoxAt = function(x1, y1, x2, y2, norecount) {
		if (tfIsShown)
			return;
	
		initElements();
	
		if (false && !norecount) {
			tfX = x1 * photo.width / 100;
			tfY = y1 * photo.height / 100;
	
			if (!x2)
			{
				tfW = 166;
				tfX -= 83;
			}
			else	
				tfW = x2 * photo.width / 100.0 - x1 * photo.width / 100.0;
			if (!y2)
			{
				tfH = 166;
				tfY -= 83;
			}
			else	
				tfH = y2 * photo.height / 100.0 - y1 * photo.height / 100.0;
		} else	{
			tfX = x1;
			tfY = y1;
			tfW = x2 - x1;
			tfH = y2 - y1;
		}
	
		updateFramePos(Math.round(tfX), Math.round(tfY));
		updateFrameSize(Math.round(tfW), Math.round(tfH));
		updateSpy();

		showFrameElements(false);	
//		show(tf.id);
//		show(tfi3.id);
//		show(fadedphoto.id);
	};
	
	this.hideBox = function(hideAnyway, resetSize) {
		if (!hideAnyway && tfIsShown)
			return;

		tfIsShown = false;
	
		var i, k = frameElements.length;
		for (i = 0; i < k; i++) {
			hide(frameElements[i].id);
		}
/*
			hide(tf.id);
		hide(fadedphoto.id);
		hide('nw'); hide('n'); hide('ne');
		hide('w'); hide('e');
		hide('sw'); hide('s'); hide('se');
		hide('taggerBoxInside');
*/
		if (resetSize) {
			tfW = tfH = 0;
		}
	};
	
	function showFrameElements(showHelpers) {
		var i, k = frameElements.length;
		for (i = 0; i < k; i++) {
			show(frameElements[i].id);
		}
		if (!showHelpers) {			
			k = frameHelpers.length;
			for (i = 0; i < k; i++)
				hide(frameHelpers[i].id);
		}		
	}

	function createFrame(e) {
		var x = mousePosX(e);
		var y = mousePosY(e);
	
		showFrameElements(resizable);
	
//		show('fadedphoto');
//		show('selector');
	
		var newW = tfW ? tfW : frameNewW;
		var newH = tfH ? tfH : frameNewH;
		updateFrameSize(newW, newH);
		updateFramePos(x - newW / 2 - paLeft, y - newH / 2 - paTop);
//		updateSelector();
		updateSpy();
		updateHelpers();
	
		tfIsShown = true;
	
		frameMouseDown({pageX: x, pageY: y, target: tf, id: tf.id});
		return cancelEvent(e);
	}
	
	function updateFrameSize(W, H) {
		if (W >= 0) {
			tfW = W;
//			tf.style.width = W - 10 + "px";
			tfi3.style.width = W - correctionW + 0 + "px";
		}
	
		if (H >= 0) {		
			tfH = H;
//			tf.style.height = H - 10 + "px";
			tfi3.style.height = H - correctionH + 0 + "px";
		}
	}
	
	function updateFramePos(x, y) {
		// Apply constraints
		if (x < 0)
			x = 0;
		if (x + tfW > paWidth)
			x = paWidth - tfW;
		if (y < 0)
			y = 0;
		if (y + tfH > paHeight)
			y = paHeight - tfH;
	
		tfX = x; tfY = y;
	
		tf.style.left = tfX + "px";
		tf.style.top = tfY + "px";
	
		updateHelpers();
//		if (currentHelper !== null) {
//		} 
	}
	
	function updateSpy() {
		spy.style.left = -tfX - correctionW / 2 + "px";
		spy.style.top = -tfY - correctionH / 2 + "px";
	}
	
	function updateHelpers() {
/*
		var justx = tfX - 10;
		var plushalfw  = tfX + (tfW / 2) - (hW / 2)- 10;
		var pluswholew = tfX + tfW - hW- 10;
		var justy = tfY- 10;
		var plushalfh  = tfY + (tfH / 2) - (hH / 2)- 10;
		var pluswholeh = tfY + tfH - hH- 10;
*/
		var justx = tfX - 1;
		var plushalfw  = tfX + (tfW / 2) - (hW / 2) - 1;
		var pluswholew = tfX + tfW - hW - 1;
		var justy = tfY - 1;
		var plushalfh  = tfY + (tfH / 2) - (hH / 2) - 1;
		var pluswholeh = tfY + tfH - hH - 1;
		var k = frameHelpers.length;
		for (i = 0; i < k; i++)
			frameHelpers[i].updatePos(justx, plushalfw, pluswholew, justy, plushalfh, pluswholeh);		
	}
	
	function frameMouseDown(e) {	
		// Save values at the beginning of resize
		tX = tfX; tY = tfY;
		tW = tfW; tH = tfH;
	
		var target = (e.srcElement) ? e.srcElement : e.target;
		var targetid = !target.id ? target.parentNode.id : target.id;
	
		hide('selector');
		addEvent(document.body, 'mouseup', frameMouseUp);	
		addEvent(document.body, 'dragend', frameMouseUp);
	
		switch(targetid)
		{
			case tf.id:
			case tfi3.id:
			case 'spyphoto':
//				hideHelpers();
				photoArea.style.cursor = 'move';
				xOff = tfX - mousePosX(e);   
				yOff = tfY - mousePosY(e);       
				assignMove(frameMove);
				break;
			case 'nw':
//				hideHelpers(targetid);
				currentHelper = frameHelpers[0];
				xOff = tfX + paLeft - mousePosX(e);
				yOff = tfY + paTop - mousePosY(e);
				tf.style.cursor = photoArea.style.cursor = 'nw-resize';
				assignMove(function (e) {
					x = Math.min(tfX + tfW - frameMinW, Math.max(0, mousePosX(e) - paLeft + xOff));
					y = Math.min(tfY + tfH - frameMinH, Math.max(0, mousePosY(e) - paTop + yOff));
					updateFrameSize(tW + tX - x, tH + tY - y);	
					updateFramePos(x, y);
					updateSpy();
					return cancelEvent(e); 		
	
				} );
				break;
			case 'n':
//				hideHelpers(targetid);
				currentHelper = frameHelpers[1];
				yOff = tfY + paTop - mousePosY(e);
				tf.style.cursor = photoArea.style.cursor = 'n-resize';
				assignMove(function (e) {
					y = Math.min(tfY + tfH - frameMinH, Math.max(0, mousePosY(e) - paTop + yOff));
					updateFrameSize(-1, tH + tY - y);	
					updateFramePos(tfX, y); 		
					updateSpy();
					return cancelEvent(e); 		
				} );
				break;
			case 'ne':
//				hideHelpers(targetid);
				currentHelper = frameHelpers[2];
				xOff = tfX + paLeft + tfW - mousePosX(e);
				yOff = tfY + paTop - mousePosY(e);
				tf.style.cursor = photoArea.style.cursor = 'ne-resize';
				assignMove(function (e) {
					x = Math.min(paWidth, Math.max(tfX + frameMinW, mousePosX(e) - paLeft + xOff));
					y = Math.min(tfY + tfH - frameMinH, Math.max(0, mousePosY(e) - paTop + yOff));
					updateFrameSize(x - tX, tH + (tY) - y);	
					updateFramePos(tX, y); 		
					updateSpy();
					return cancelEvent(e); 		
				} );
				break;
			case 'w':
//				hideHelpers(targetid);
				currentHelper = frameHelpers[3];
				xOff = tfX + paLeft - mousePosX(e);
				tf.style.cursor = photoArea.style.cursor = 'w-resize';
				assignMove(function (e) {
					x = Math.min(tfX + tfW - frameMinW, Math.max(0, mousePosX(e) - paLeft + xOff));
					updateFrameSize(tW + tX - x, -1);	
					updateFramePos(x, tfY); 		
					updateSpy();
					return cancelEvent(e); 		
				} );
				break;
			case 'e':
//				hideHelpers(targetid);
				currentHelper = frameHelpers[4];
				tf.style.cursor = photoArea.style.cursor = 'e-resize';
				xOff = tfX + paLeft + tfW - mousePosX(e);
				assignMove(function (e) {
					x = Math.min(paWidth, Math.max(tfX + frameMinW, mousePosX(e) - paLeft + xOff));
					updateFrameSize(x - tX, -1);	
					updateFramePos(tfX, tfY); 		
					updateSpy();
					return cancelEvent(e); 		
				} );
				break;
			case 'sw':
//				hideHelpers(targetid);
				currentHelper = frameHelpers[5];
				tf.style.cursor = photoArea.style.cursor = 'sw-resize';
				xOff = tfX + paLeft - mousePosX(e);
				yOff = tfY + paTop + tfH - mousePosY(e);
				assignMove(function (e) {
					x = Math.min(tfX + tfW - frameMinW, Math.max(0, mousePosX(e) - paLeft + xOff));
					y = Math.min(paHeight, Math.max(tfY + frameMinH, mousePosY(e) - paTop + yOff));
					updateFrameSize(tX - x + tW, y - tY);	
					updateFramePos(x, tY); 		
					updateSpy();
					return cancelEvent(e); 		
				} );
				break;
			case 's':
//				hideHelpers(targetid);
				currentHelper = frameHelpers[6];
				tf.style.cursor = photoArea.style.cursor = 's-resize';
				yOff = tfY + paTop + tfH - mousePosY(e);
				assignMove(function (e) {
					y = Math.min(paHeight, Math.max(tfY + frameMinH, mousePosY(e) - paTop + yOff));
					updateFrameSize(-1, y - tY);
					updateFramePos(tX, tY); 		
					updateSpy();
					return cancelEvent(e); 		
				} );
				break;
			case 'se':
//				hideHelpers(targetid);
				currentHelper = frameHelpers[7];
				tf.style.cursor = photoArea.style.cursor = 'se-resize';
				xOff = tfX + paLeft + tfW - mousePosX(e);
				yOff = tfY + paTop + tfH - mousePosY(e);
				assignMove(function (e) {
					x = Math.min(paWidth, Math.max(tfX + frameMinW, mousePosX(e) - paLeft + xOff));
					y = Math.min(paHeight, Math.max(tfY + frameMinH, mousePosY(e) - paTop + yOff));
					updateFrameSize(x - tX, y - tY);	
					updateFramePos(tX, tY); 		
					updateSpy();
					return cancelEvent(e); 		
				} );
				break;
				
			default:
				break;			
		}

		if (typeof onBeginDrag == 'function') {
			onBeginDrag();
		}
	
		return cancelEvent(e);
	}
	
	function hideHelpers(keep) {
		var k = frameHelpersNames.length;
		for (i = 0; i < k; i++) {
			if (frameHelpersNames[i] != keep) {
				hide(frameHelpersNames[i]);
			}
		}
	}
	
	function showHelpers() {	
		var k = frameHelpersNames.length;
		for (i = 0; i < k; i++)
			show(frameHelpersNames[i]);
		currentHelper = null;
	}
	
	function frameMouseUp(e) {
		mouseUp();	
		if (typeof onEndDrag == 'function') {
			onEndDrag([tfX, tfY, tfW, tfH]);
		}
		return cancelEvent(e);
	}
	
	var frameMove = function(e)	{
		var x = mousePosX(e);
		var y = mousePosY(e);
		updateFramePos(x + xOff, y + yOff);		
		updateSpy();
	
		return cancelEvent(e);
	};
	
	function mouseUp() {
		removeEvent(document.body, 'mouseup');
		removeEvent(document.body, 'dragend');
		assignMove();
//		showHelpers();
//		updateHelpers();
//		updateSelector();
		tf.style.cursor = 'move';
    photoArea.style.cursor = '';
	}
	
	function assignMove(func) {
		if (func) {
			addEvent(document.body, 'mousemove', func);
			addEvent(document.body, 'drag', func);
		} else {
			removeEvent(document.body, 'mousemove');
			removeEvent(document.body, 'drag');
		}
	}
	
	function getStyle(elem, rule, deflt) {
	    var strValue;
			if(elem.currentStyle){
	        rule = rule.replace(/\-(\w)/g, function(strMatch, p1){ return p1.toUpperCase(); });
	        strValue = elem.currentStyle[rule];
	    } else if(document.defaultView && document.defaultView.getComputedStyle){
	        strValue = document.defaultView.getComputedStyle(elem, "").getPropertyValue(rule);
	    }
 	    return strValue || deflt || "";
	}	
};

var tagger, paCoords = [], currentTagPopup, tagTimerId, tagpopup, myFriendsBox;

function doInitTagger() {
//  alert('do init tagger');
  tagger_loaded = 1;
  tagger = new Tagger('photoarea', 'photo', null, true);
  tagger.setOnBeginDrag(function() { hide('myFriendsBox'); });
  tagger.setOnEndDrag(function(box) { 
  	var pa = tagger.getPhotoarea(); 
  	ge('myFriendsBox').style.left = box[0] + box[2] + pa[0] + 10 + "px";
  	ge('myFriendsBox').style.top = box[1] + pa[1] + "px";
//  	ge('myFriendsBox').style.left = box[0] + box[2] +  10 + "px";
//  	ge('myFriendsBox').style.top = box[1] + "px";
		show('myFriendsBox'); 
    ge('myFriendsInput').focus();
  });
  paCoords = tagger.getPhotoarea();
  currentTagPopup = null;
  tagTimerId = 0;
  tagpopup = ge('photoarea').appendChild(document.createElement('div'));
  tagpopup.id = 'tagpopup';
  tagpopup.className = 'tagpopup';
  tagpopup.onmouseover = function(){ clearTimeout(tagTimerId); };
  tagpopup.onmouseout = function(e){ currentTagPopup = null; tagTimerId = setTimeout(function(){hide(tagpopup.id);}, 50); return cancelEvent(e);};
  tagpopup.onmousemove = function(e){ return cancelEvent(e); };
  myFriendsBox = ge('show_photo').appendChild(document.createElement('div'));
  myFriendsBox.id = 'myFriendsBox';
  myFriendsBox.innerHTML = "<div id='myFriendsTop'><input id='myFriendsInput' type='text' onkeyup=\"if(event.keyCode==27){endTagging();}else if(event.keyCode==13){submitTag(found_user, this.value);}else{ge('friendsList').innerHTML = filterList(this.value)}\"/></div><div id='friendsList'><div class='loading'>Loading...</div></div><div class='applyButton' onmouseover=\"this.className='applyButtonOn'\" onmouseout=\"this.className='applyButton'\" onclick=\"submitTag(found_user, ge('myFriendsInput').value)\">"+addNbsp(l_phat)+"</div><div class='cancelButton' onmouseover=\"this.className='cancelButtonOn'\" onmouseout=\"this.className='cancelButton'\" onclick='endTagging();cancelEvent(event);'>"+l_canc+"</div>";
  if (my_friends.length) { 
    ge('friendsList').innerHTML = filterList();
  }

  if (phototags.length) {
//   createPhotoTags(tagging);
   createPhotoTags(false);
  }
}

initTagger();

function showTagsOnMove(e) {
	var x = mousePosX(e)
	var y = mousePosY(e);
	var gotIt = false;
	if (currentTagPopup &&
			x >= paCoords[0] + currentTagPopup.x1 && y >= paCoords[1] + currentTagPopup.y1 &&
			x <= paCoords[0]+ currentTagPopup.x2 && y <= paCoords[1] + currentTagPopup.y2)
	{
		return cancelEvent(e);
	}

	for(var tagnum in phototags)
	{
			var tag = phototags[tagnum];
			if (x >= paCoords[0] + tag.x1 && y >= paCoords[1] + tag.y1 &&
					x <= paCoords[0] + tag.x2 && y <= paCoords[1] + tag.y2)
			{
				clearTimeout(tagTimerId);
				clearTimeout(tagTimerId-1);
				tagTimerId = 0;
				if (tag.id > 0) {
					tagpopup.innerHTML = "<a href='#' onclick='getPage(" + tag.id + ");return false;' >" + tag.name + "</a>";
        }	else {
					tagpopup.innerHTML = tag.name;
        }
				tagpopup.style.left = tag.x1 + "px";
				tagpopup.style.top = tag.y2 + "px";
				tagpopup.style.width = tag.x2 - tag.x1 - 8 + "px";
				show(tagpopup.id);
				if (tag.x1 + tagpopup.clientWidth > paCoords[2]) {
					tagpopup.style.left = paCoords[2] - tagpopup.clientWidth - 8 + "px";
				}
				if (tag.y2 + tagpopup.clientHeight > paCoords[3]) {
					tagpopup.style.top = paCoords[3] - tagpopup.clientHeight - 2 + "px";
				}
				gotIt = true;
				currentTagPopup = tag;
				break;
			}
	}

	if (!gotIt)	{
		if (!tagTimerId) {
			tagTimerId = setTimeout(function(){hide(tagpopup.id); }, 50);
    }
		currentTagPopup = null;
	}

	return cancelEvent(e);
}

function filterList(filter) {
 var friendItems = [];
 found_user = 0;
 var i, j, k = my_friends.length;
 for (i = 0; i < k; i++) {        
 if (!filter || my_friends_lc[i].indexOf(filter) != -1) {            
  friendItems.push("<div class='friendsListItem' onmouseover=\"this.className='friendsListItemOn'\" onmouseout=\"this.className='friendsListItem'\" onclick=\"submitTag(my_friends["+i+"][0], my_friends["+i+"][1]);\">" + my_friends[i][1] + "</div>");
  j = i;
  }
 }
 if (friendItems.length == 1 && filter) {
  found_user = my_friends[j][0];
  friendItems[0] = "<div class='friendsListItemOnly' onclick=\"submitTag(my_friends["+j+"][0], my_friends["+j+"][1]);\">" + my_friends[j][1] + "</div>";
 }
 if (friendItems.length == 0) {
  ge('friendsList').style.display = "none";
 } else {
  ge('friendsList').style.display = "";
 }
 return friendItems.join("");
}


function submitTag(id, name) {
 if (name.length == 0) {
  return;
 }
 hide('myFriendsBox');
 ge('myFriendsInput').value = '';
 ge('friendsList').innerHTML = filterList();
 tagger.hideBox(true);
 var paCoords = tagger.getPhotoarea(), tfCoords = tagger.getBox();
 var x1 = tfCoords[0] / paCoords[2] * 100;
 var y1 = tfCoords[1] / paCoords[3] * 100;
 var x2 = (tfCoords[0] + tfCoords[2]) / paCoords[2] * 100;
 var y2 = (tfCoords[1] + tfCoords[3]) / paCoords[3]  * 100;	
 doRequest("&act=put_tag&id="+id+"&x1="+x1+"&y1="+y1+"&x2="+x2+"&y2="+y2+"&parent="+ph_id+"&name="+encodeURIComponent(name), doneSubmitTag);
 if (id == this_id) {
  addToPhotosWith(ph_id);
 }
}

function deleteTag(tid) {
 doRequest("&act=delete_tag&tid="+tid+"&parent="+ph_id, doneSubmitTag);
 if (isSelfTag(tid)) {
  photos_with.delFromPhotos(ph_id);
 }
}

function doneSubmitTag(d) {
 tagger.hideBox();
 phototags = d || [];
 createPhotoTags(true);
}


function addEvent(obj, event, handler) 
{
	var fn = handler;

	if (!obj.attachedEvents)
		obj.attachedEvents = new Array();

	if (obj.attachedEvents[event])
		removeEvent(obj, event);

	obj.attachedEvents[event] = fn;

	if (typeof obj.addEventListener != 'undefined') 
		obj.addEventListener(event, handler, false);
	else if (typeof obj.attachEvent != 'undefined') 
		obj.attachEvent('on' + event, handler);
}

function removeEvent(obj, event)
{
	if (!obj.attachedEvents || !obj.attachedEvents[event])
		return;

	if (typeof obj.removeEventListener != 'undefined') 
		obj.removeEventListener(event, obj.attachedEvents[event], false);
	else if (typeof obj.detachEvent != 'undefined') 
		obj.detachEvent('on' + event, obj.attachedEvents[event]);
}      


function cancelEvent(e) 
{
	var evt = e ? e : window.event;
		
	if(evt.preventDefault)
		evt.preventDefault();

	if(evt.stopPropagation) 
		evt.stopPropagation(); 

	evt.cancelBubble = true;

	evt.returnValue = false;
	return false;
}

// Get Absolute X Position of HTML Element
function findX(obj)
{
  var curleft = 0;
  if (obj.offsetParent) {
    while (obj.offsetParent) {
      curleft += obj.offsetLeft;
      obj = obj.offsetParent;
    }
  }
  else {
  	if (obj.x)
    	curleft += obj.x;
  }
  return curleft;
}

// Get Absolute Y Position of HTML Element
function findY(obj)
{
  var curtop = 0;
  if(obj.offsetParent) {
    while (obj.offsetParent) {
      curtop += obj.offsetTop;
      obj = obj.offsetParent;
    }
  }
  else if (obj.y)
    curtop += obj.y;
  return curtop;
}

function mousePosX(e)
{
  var posx = 0;
  if (!e) e = window.event;
  if (e.pageX)
    posx = e.pageX;
  else if (e.clientX && document.body.scrollLeft)
    posx = e.clientX + document.body.scrollLeft;
  else if (e.clientX && document.documentElement.scrollLeft)
    posx = e.clientX + document.documentElement.scrollLeft;
  else if (e.clientX)
    posx = e.clientX;
  return posx;
}

function mousePosY(e)
{
  var posy = 0;
  if (!e) e = window.event;
  if (e.pageY)
    posy = e.pageY;
  else if (e.clientY && document.body.scrollTop)
    posy = e.clientY + document.body.scrollTop;
  else if (e.clientY && document.documentElement.scrollTop)
    posy = e.clientY + document.documentElement.scrollTop;
  else if (e.clientY)
    posy = e.clientY;
  return posy;
}