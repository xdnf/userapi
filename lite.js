// Durov Lite v0.9
// Copyright Pavel Durov
// Can be used and modified by anyone for UserAPI projects
// Other use is illegal

countries = new DynList('countries', 16, 32);
countries.doShow = doShowLines;
countries.getHeader = countriesHeader;
countries.getLine = getCountryLine;
countries.info = all_countries;

friends = new DynList('friends', 5, 30);
friends.doShow = doShowUsers;
friends.getHeader = friendsHeader;

friends_online = new DynList('friends_online', 5, 30);
friends_online.doShow = doShowUsers;
friends_online.getHeader = friendsOnlineHeader;

friends_mutual = new DynList('friends_mutual', 5, 30);
friends_mutual.doShow = doShowUsers;
friends_mutual.getHeader = friendsCommonHeader;

friends_new = new DynList('friends_new', 15, 30);
friends_new.doShow = doShowUsers;
friends_new.getHeader = friendsNewHeader;

my_friends = new Array(); 
my_friends_lc = new Array();
friendsList = new Array();
countriesList = new Array();
countries_lc = new Array();

updates_activity = new DynList('updates_activity', 5, 33);
updates_activity.doShow = doShowUpdatesActivity;
updates_activity.getHeader = updatesActivityHeader;

updates_friends = new DynList('updates_friends', 5, 20);
updates_friends.doShow = doShowUsers;
updates_friends.getHeader = updatesFriendsHeader;

updates_photos = new DynList('updates_photos', 4, 32);
updates_photos.doShow = doShowPhotos;
updates_photos.getHeader = updatesPhotosHeader;
updates_photos.link = 'photo';

updates_tagged_photos = new DynList('updates_tagged_photos', 4, 32);
updates_tagged_photos.doShow = doShowPhotos;
updates_tagged_photos.getHeader = updatesTaggedPhotosHeader;

fave = new DynList('fave', 5, 33);
fave.doShow = doShowUsers;
fave.getHeader = faveHeader;
fave_online = new DynList('fave_online', 5, 33);
fave_online.doShow = doShowUsers;
fave_online.getHeader = faveOnlineHeader;
faved = new DynList('faved', 5, 33);
faved.doShow = doShowUsers;
faved.getHeader = favedHeader;

search_results = new DynList('search_results', 15, 33);
search_results.doShow = doShowUsers;
search_results.getHeader = searchResultsHeader;
search_results.year = 0;

quick_search = new DynList('quick_search', 15, 33);
quick_search.doShow = doShowUsers;
quick_search.getHeader = searchByNameHeader;

photos = new DynList('photos', 4, 32);
photos.doShow = doShowPhotos;
photos.getHeader = photosHeader;
photos.link = 'photo';

photos_with = new DynList('photos_with', 4, 32);
photos_with.doShow = doShowPhotos;
photos_with.getHeader = photosWithHeader;
photos_with.link = 'onphoto';

photos_new = new DynList('photos_new', 4, 32);
photos_new.doShow = doShowPhotos;
photos_new.getHeader = photosNewHeader;

months = [l_mon, l_jan, l_feb, l_mar, l_apr, l_may, l_jun, l_jul, l_aug, l_sep, l_oct, l_nov, l_dec];
marital_statuses = [l_sst, l_sin, l_ina, l_eng, l_mrr, l_its, l_loo];
political_views = [l_svi, l_com, l_soc, l_mod, l_lib, l_con, l_mnc, l_ult, l_apa];

cyrCityTypes = ['', 'город','деревня','пгт','хутор','село','поселок','аул','станция','нп','станица','городок','рп','мкр','улус','кв-л','слобода','с/пос','','край','АО','область','район','Аобл','с/о','с/о','волость','с/с'];

schoolTypes = [];

schoolTypes[100] = l_uni;
schoolTypes[110] = l_fac;
schoolTypes[120] = l_dep;

countries.loaded = 1000;
countries.num = 235;

cities = new DynList('cities', 12, 24);
cities.doShow = doShowLines;
cities.getLine = getCityLine;
cities.getHeader = citiesHeader;
cities.func = "getSchools";

schools = new DynList('schools', 12, 100000);
schools.doShow = doShowLines;
schools.getLine = getSchoolLine;
schools.getHeader = schoolsHeader;
schools.func = "getClassmates";

profile = new DynList('profile', 1, 10);

wall = new DynList('wall', 5, 17);
wall.doShow = doShowComments;
wall.getHeader = wallHeader;

message = new DynList('message', 5, 22);
message.doShow = doShowMessages;
message.applyRawHistory = applyHistory;
message.applyHistory = processMessageHistory;

activity = new DynList('activity', 5, 22);
activity.doShow = doShowUpdatesActivity;
activity.getHeader = activityHeader;

all_friends = new DynList('all_friends', 5, 30);

inbox = new DynList('inbox', 5, 22);
inbox.doShow = doShowMessages;
inbox.getHeader = inboxHeader;
inbox.applyRawHistory = applyHistory;
inbox.applyHistory = processMessageHistory;
inbox.loaded = 0;

outbox = new DynList('outbox', 5, 22);
outbox.doShow = doShowMessages;
outbox.getHeader = outboxHeader;
outbox.applyRawHistory = applyHistory;
outbox.applyHistory = processMessageHistory;
outbox.loaded = 0;

photos_comments = new DynList('photos_comments', 5, 22);
photos_comments.doShow = doShowComments;
photos_comments.getHeader = photosCommentsHeader;
photos_comments.parent = 0;

first_load = true;

vals = [];                                                                                                                                                                                                                                                
reqs = [];
cached_profiles = [];
cached_search = [];
images_to_preload = [];
member_schools = [];
search_details = [];
schoolsList = [];

this_id = 0;
id = 0;
showing = [];
showing['main'] = 0;
showing['search_area'] = 0;
showing['message'] = 0;
showing['messages'] = 0;
showing['friends_online'] = 0;
showing['updates_area'] = 0;
new_messages = 0;
new_friends = 0;
new_photos = 0;
all_schools = '';
goto = '';
cur_tab = '';
photo_desc = '';
friend_filter_value = '';
query = '';
refr = '';
htmlTags = '&nbsp;';
pending_request = null;
add_photos_num = 2;
deleted_msg = 0;
is_friend = 0;
looked_up = 0;
faves_changed = 0;
friends_changed = 0;
last_added_tag = -1;
no_photo = 0;
ok = 0;
ph_id = '';
old_click = null;
overX = false;
friend_on = 0;
old_cookie = document.cookie;
deselected = 0;
logging = 0;
logging_out = 0;
old_tid = 1;
mouseover = '';
i_am_tagged_here = 0;
deleted_tag = '';

need_refresh_profile = false;
need_to_focus = '';
need_to_preload_images = 0;
need_editpage_data = 0;

must_get_new_tags = false;
must_show_messages = 0;

loading_profile = 0;
editing_activity = 0;
sending_msg = 0;
getting_cities = 0;
toggling_profile = 0;
search_over = 0;

last_profile = 0;
last_history = 0;
last_history_update = 0;

found_user = 0;
profile_photo = '';
pr_upload_url = '';
pr_upload_hash = '';
pr_upload_rhash = '';
notify_friend = 0;
notify_message = 0;
cities_filter_timeout = 0;
activity_blur_timeout = 0;

if(location.href.indexOf("login.html") == -1) {
 setTimeout("firstRefresh()", 300);
}

vals['photos_comments'] = 1;
vals['closed_wall'] = 1;

var phototags = [];
var tagger_loaded = false;

var over_countries = false;
var over_cities = false;
var over_schools = false;
var editing_location = false;

var captcha_sid = 0;
var last_captcha = new Date();

imagePreload = [];
for (i = 0; i < 51; i++) {
 imagePreload[i] = new Image(1,1);
}

readMsgs = new Array();
hifr = ge('hifr');

var isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1;
//var hifr = null;

cur_hash = "";
loc_hash = "";

window.onload = function () {

 if (!site_id || !mainDomain) {
  alert("Please edit config.js and fill in information on your domain.");
 }

 current_year = (new Date()).getFullYear();
 hash = cur_hash = window.location.hash;
 
 var hash_params = parseHashParams(hash);

 if (hash_params.confirm) {
  document.location.href = loginUrl+'login=confirm&cid='+ hash_params.confirm +'&site='+site_id;
  return;
 }

 document.title = site_name;

 if(window.location.href.indexOf("login.html") != -1) {
  return;
 }

 id = parseInt(hash.substr(1));

 sid = old_sid = getCookie('sid');

 if (hash_params.pos) {
  goto = hash_params.pos;
 }

 if (hash_params.sid) {
  sid = hash_params.sid;
  document.cookie = "sid = "+sid+"; expires=01/01/2017 00:00:00; domain=."+mainDomain;
  if (sid <= -1) { 
   logging = 1; 
  } else { 
   setHash(id);
//   window.location.hash = id; 
  } 
 }

 if (!id) {
  id = 0;
 }
// onload_cnt++;

// sid = getCookie('sid');

// if (!sid || sid == undefined) {
//  autoLogin();
 //} else if (sid <= -1) {
//  logging = 1;
//  forceLogin();
// } else {
  createPage(hash);  
  setInterval("checkStatus()", 200);
// }

}
 
function createPage(hash){
 var pos = hash.indexOf(';'); 
 var hash_params = "";
 if (pos > -1) {
  hash_params = hash.substr(pos);
  hash = hash.substr(0, pos);
 }

 id = parseInt(hash.substr(1));

 switch(hash) {
  case '#search':
   searchTab(hash_params);
   break;
  case '#name':
   searchByName(hash_params);
   break;
  case '#myinbox':
   inbox.box();
   break;
  case '#myoutbox':
   outbox.box();
   break;
  case '#myfave':
   faveTab();
   break;
  case '#myfriends_new':
   friendsTab();
   break;
  case '#myphotos_new':
   photosTab();
   break;
  case "#news":
   updatesTab();
   break;
  case "#editpage":
   editPage();
   break;
  case "#chat":
   openChat(hash_params, 0, 0);
   break;
  default:
   getPage(id, hash_params);
 }
}

function checkStatus() {
 checkHistory();
 var sid = getCookie('sid');
 if (sid <= -1 && !logging) {
  forceLogin();
 }
 if (old_cookie != document.cookie && ((ok < 0 && !logging) || (sid && sid.length > 10))) {
  old_cookie = document.cookie;
  if (logging == 2) {
   logging = 1;
  }
  getPage(id);
 }
}

function attachScript(id, src) {
 var i;
 var newreqs = [];

 for (reqnum in reqs) {
  req = reqs[reqnum];
  if (req.running == 0 && (!pending_request || req.num != pending_request.num)) {
   ge('req'+req.num).parentNode.removeChild(ge('req'+req.num)); 
   reqs[reqnum] = null;
  } else {
   newreqs[reqnum] = req;
  }
 }
 reqs = newreqs;

 var element = document.createElement('script');
 element.type = 'text/javascript';
 element.src = src;
 element.id = id;
 document.getElementsByTagName('head')[0].appendChild(element);
}

function deleteScript(el) {
var i = 0;
 while(ge(el) && i < 100) {
  i++;
  ge(el).parentNode.removeChild(ge(el));
 }
}

// K.O.T.'s list container object

function setPerPage(num) {
  this.per_page = num;
  this.show(this.offset, this.per_page);
}

function listShow(from, to_show) { 
  var to_load = from + to_show + this.pre_load - this.loaded;
  if (to_load > 0 && (this.num > from || this.num == 0 || this.num == 1e9)) {
    this.show_pending = (to_load > this.pre_load);
    this.pending_from = from;
    this.pending_to_show = to_show;
    this.loadList(this.loaded, to_load > to_show ? to_load : to_show);
  }
  if (this.show_pending) {
  } else {
    this.doShow(from, to_show);
    this.offset = from;
    this.per_page = to_show;
    shide(this.name+'_left', from > 0);
    shide(this.name+'_right', from+to_show < this.num);
  }
  this.changed = 0;
  this.makeCaption();
}

function makeCaption() {
  var a = this.offset;
  var b = a + this.per_page;
  if (b > this.num) { b = this.num; }

  if ((a >= b || this.caption_tag == undefined) && this.num !=0) { return; }
  var total = this.num < 1e9 ? this.num : l_load;
  var str = !a && this.per_page < 10 || this.num == 1 ? total : ""+(a+1==b?l_last:(a+1)+"-"+b)+(this.num<1e9 ? " "+l_of+" "+this.num : "");
  if (this.num == b && a == 0) {
   str = l_alof+" "+this.num;
  }
  if (this.num > 1) {
   str = '('+str+')';
  } else {
   str = '';
  }
  if (this.getting_block) {
   return str;
  } else {
   var o = ge(this.caption_tag);
   if (!o) { return; }
   o.innerHTML = str;
  }
}

function loadList(offset, count) {

  var params = '&act='+this.act+'&from='+offset+'&to='+(offset+count);
  if (this.parent != undefined) {
   params += '&parent='+this.parent;
  }

  if (id != undefined) {
   params += '&id='+id;
  }

  if (this.year != undefined) {
   params += '&year='+this.year;
  }

  if (this.searching) {
   params += '&searching=1';
  }

  if (this.query != undefined) {
   params += '&q='+this.query;
  }

  if (this.ts != undefined && this.ts != 0) {
   params += '&ts='+this.ts;
  }

  var req = createRequest(params, listSuccess);
  req.list = this;
  req.from = offset; 
  req.to = offset + count;

  if (this.query != undefined) {
   req.query = this.query;
  }

  sendRequest(req);
  document.body.style.cursor = "default";
}

function loadHistory(objs) {

 var params = '&act=history';
 var k = objs.length;

 for (var i = 0; i < k; i++) {
  if (objs[i].ts != undefined && objs[i].ts != 0) {
   params += '&'+objs[i].act+'='+objs[i].ts;
   if (objs[i].parent != undefined) {
    params += '&parent='+objs[i].parent;
   }
  }
 }

 if (first_load) {
  params += '&f=1&frnum=1';
  if (!friends_new.loaded) {
   params += "&friends_new=30";
  }
  if (!fave.loaded) {
   params += "&fave=30";
  }
  if (!inbox.loaded) {
   params += "&inbox=27";
  }
  if (!outbox.loaded) {
   params += "&outbox=27";
  }
  if (!cached_profiles[-1]) {
   params += "&profile=-1";
  }
  doRequest("&act=prepare_updates&updates_activities=43&updates_friends=25&updates_photos=36&updates_tagged_photos=36", gotPrepareUpdates);
 }

 if (faves_changed) {
  params += "&fave=30";
 }

 if (id != undefined && id > 0) {
  params += '&id='+id;
 }
 if (!this_id) {
  params += '&us=-1';
 } 

 if (readMsgs.length > 0) {
  params += '&read=';
  while (readMsgs.length > 0) {
   params += readMsgs.pop()+'_';
  }
 }

 var req = createRequest(params, gotHistory);
 req.listSuccess = listSuccess; 
 sendRequest(req);
}

function processErrors(ok, req) {
 switch (ok) {
  case -1:
   autoLogin();
   return 0;                                   
  break;
  case -2:
   ge('req'+req.num).parentNode.removeChild(ge('req'+req.num)); 
   pending_request = req;
   showCaptcha();
   return 0;
  break;
 }
 return 1;
}

function gotHistory(h) {

 this.processMessageHistory = processMessageHistory;
 if (!processErrors(h.ok, this)) {
  return;
 }

 if (h.us) {
  this_id = h.us;
 }

 if (!this_id) {
  return;
 }

 if (h.wall != undefined && h.wall.h) {
  this.list = wall;
  this.listSuccess(h.wall);
 }

 if (h.activity != undefined && h.activity.h && h.activity.h.length) {
  this.list = activity;
  if (!editing_activity) {
   showProfileActivity(h.activity.h[h.activity.h.length-1][2]);
  }
  this.listSuccess(h.activity);
 }

 if (h.message != undefined && h.message.h && h.message.h.length) {
  var hist = h.message.h;
//  console.log(hist);
  processMessageHistory(hist);
 }

 if (h.photos_comments != undefined && h.photos_comments.h) {
  this.list = photos_comments;
  this.listSuccess(h.photos_comments);
 }

 if (h.updates_activity != undefined && h.updates_activity.h && h.updates_activity.h.length) {
  this.list = updates_activity;
  this.listSuccess(h.updates_activity);
 }

 if (h.updates_friends != undefined && h.updates_friends.h && h.updates_friends.h.length) {
  this.list = updates_friends;
  this.listSuccess(h.updates_friends);
 }

 if (h.updates_photos != undefined && h.updates_photos.h && h.updates_photos.h.length) {
  this.list = updates_photos;
  this.listSuccess(h.updates_photos);
 }

 if (h.updates_tagged_photos != undefined && h.updates_tagged_photos.h && h.updates_tagged_photos.h.length) {
  this.list = updates_tagged_photos;
  this.listSuccess(h.updates_tagged_photos);
 }

 if (h.profile) {
  cached_profiles[-1] = h.profile;
 }

 friends_new.saveInfo(h.friends_new, 30);
 fave.saveInfo(h.fave, 30);
 fave_online.saveInfo(h.fave_online, 30);
 faved.saveInfo(h.faved, 30);
 inbox.saveInfo(h.inbox, 27);
 outbox.saveInfo(h.outbox, 27);

 var need_to_show_tabs = 0;
 var need_to_show_notifiers = 0;

 if (h.f) {
  first_load = false;
  if (cur_tab == 'editpage' && need_editpage_data) {
   need_editpage_data = 0;
   editPage();
  }
  if (fave.num > 0) {
   need_to_show_tabs = 1;
  }
  if (inbox.num > 0 || outbox.num > 0) {
   need_to_show_tabs = 1;
  }
 }

 if (h.nm != undefined && new_messages != h.nm) {
  new_messages = h.nm;
  need_to_show_tabs = 1;
  if (!h.f) {
   friends_changed = 1;
  }
 }

 if (h.nf != undefined && new_friends != h.nf) {
  new_friends = h.nf;
  need_to_show_notifiers = 1;
 }

 if (new_photos != h.nph) {
  new_photos = h.nph;
  need_to_show_notifiers = 1;
 }

 if (faves_changed) {
  need_to_show_tabs = 1;
  faves_changed = 0;
 }

 if (need_to_show_tabs) {
  getTabs();
 }

 if (need_to_show_notifiers) {
  getNotifiers();
 }

 this.destroy();

}

function saveInfo(data, loaded) {
 if (data) {
  this.loaded = loaded;
  this.num = data.n;
  this.info = data.d;
 }
}

function processMessageHistory(hist) {
  if (!message.ts) { 
   message.ts = 0+hist; 
   inbox.ts = message.ts;
   outbox.ts = message.ts;
   return;
  }

  inbox.ts = message.ts;
  outbox.ts = message.ts;

  if (!hist || !hist.length) {
   return;
  }

  if (message.loaded > 0) {
   var chatHistory = filterChat(hist, id);

   if (chatHistory) {
    message.applyRawHistory(chatHistory);

    if (message.changed) {
     message.changed = 0;
     if (ge('message_inner_rows')) {
      message.show(message.offset, message.per_page);
     }
    }
   }

  }
  if (inbox.loaded > 0) {
   var inboxHistory = filterInbox(hist);
   if (inboxHistory) {
    inbox.applyRawHistory(inboxHistory);
    if (inbox.changed) {
     inbox.changed = 0;
     if (ge('inbox_inner_rows')) {
      inbox.show(inbox.offset, inbox.per_page);
     }
    }
   }
  }
  if (outbox.loaded > 0) {
   var outboxHistory = filterOutbox(hist);
   if (outboxHistory) {
    outbox.applyRawHistory(outboxHistory);
    if (outbox.changed) {
     outbox.changed = 0;
     if (ge('outbox_inner_rows')) {
      outbox.show(outbox.offset, outbox.per_page);
     }
    }

   }
  }

  var last_ts = hist[hist.length-1][0];
  if (message.ts < last_ts) { 
   message.ts = inbox.ts = outbox.ts = last_ts; 
  }
}


function scrollRight() {
 var from = this.offset + this.per_page;
 if (from < this.num && from < this.loaded) {
   this.show(from, this.per_page);
 }
}

function scrollLeft() {
 var from = this.offset - this.per_page;
 if (from < 0) from = 0;
 if (this.offset > 0) {
   this.show(from, this.per_page);
 }
}

function nextPhoto() {
 if (this.showing_photo < this.num-1) {
  this.getPhoto(this.showing_photo + 1, false);
 } else {
  this.getPhoto(0, false);
 }
}

function previousPhoto() {
 if (this.showing_photo > 0) {
  this.getPhoto(this.showing_photo - 1, false);
 } else {
  this.getPhoto(this.num-1, false);
 }
}

function toggle(mi,ma) {

 if (search_over) {return}

 if (this.per_page <= mi || this.minimized == 0) {
  this.minimized = 1;
  this.setPerPage(ma);
  if (!this.offset) {
   this.makeCaption();
  }
  ge(this.name+'_arr').innerHTML = '&#9660; ';
 } else {
  this.minimized = 0;
  this.setPerPage(mi);
  ge(this.name+'_arr').innerHTML = '&#9658;';
 }
}

function listReset() {

 if (this.default_preload > 0) {
  this.pre_load = this.default_preload;
 }

 if (this.per_page*2 > this.pre_load) {
  this.per_page = this.pre_load >> 1;
 }

}

function listClear() {
 this.reset();
 this.offset = 0;
 this.loaded = 0;
 this.num = 0;
 this.info = new Array();
}

function DynList(act, per_page, pre_load) {
  this.act = act;
  this.name = act;
  this.per_page = per_page;
  this.pre_load = this.default_preload = pre_load;
  this.offset = 0;
  this.loaded = 0;
  this.num = 0;
  this.num = 1e9;
  this.getting_block = 0;
  this.showing_photo = -1;
  this.need_to_find = 0;
  this.privacy = 0;
  this.info = new Array();
  this.deleted = new Array();
  this.setPerPage = setPerPage;
  this.getBlock = getBlock;
  this.show = listShow;
  this.doShow = function(o,p){};
  this.loadList = loadList;
  this.scrollLeft = scrollLeft;
  this.scrollRight = scrollRight;
  this.toggle = toggle;
  this.caption_tag = act + "_num";
  this.makeCaption = makeCaption;
  this.applyHistory = applyHistory;
  this.reset = listReset;
  this.clear = listClear;
  this.send = sendMessage;
  this.restore = restoreMessage;
  this.del = deleteMessage;
  this.box = box;
  this.getPhoto = getPhoto;
  this.next = nextPhoto;
  this.previous = previousPhoto;
  this.deselectPhoto = deselectPhoto;
  this.delFromPhotos = delFromPhotos;
  this.findNByPhid = findNByPhid;
  this.down = down;
  this.minimized = 0;
  this.must_focus = 0;
  this.height = 0;
  this.current = 0;
  this.must_place_block = 0;
  this.saveInfo = saveInfo;
  this.on = false;
  this.getLine = getCityLine;
  this.idToNum = idToNum;
  this.applyHistoryItem = applyHistoryItem;
  this.getMessage = getMessage;
  this.getComment = getComment;
  this.photo_filter = 0;
  this.headerClass = 'block_header';
  this.ts = 0;
}

function applyHistory(history) {

 if (!this.ts) { 
  if ((this.act=='outbox' || this.act=='inbox') && message.ts) {this.ts = message.ts;} else {
   this.ts = 0+history; 
   return;
  }
 }

 if (history.length) {
  last_history_update = unixtime();
 }

 if (history !== false) {
  var skip_ts = false;
  switch(this.act) {
   case 'updates_activity': 
   case 'updates_friends':
   case 'updates_photos': 
   case 'updates_tagged_photos': skip_ts = true; break;   
  }
  for (var i=0; i < history.length; i++)  {
   if (history[i][0] > this.ts || skip_ts) {
    if (!this.applyHistoryItem(history[i])) {
      history = false;
      break;
    }
    this.ts = history[i][0];
   }    
  }
 }
 
 if (history === false) {
  // bacdhi
  setTitle(l_erro);
  this.ts = 0;
  this.num = 1e9;
  this.loaded = 0;
  this.show(this.offset, this.per_page);
 }
}

function filterChat(history, from_id) {
 var result = new Array();
 if (history !== false) {
  for (var i=0; i < history.length; i++)  {
   if ((history[i][1] && history[i][2][3] != undefined && history[i][2][4] != undefined) && ((history[i][2][3][0] == this_id && history[i][2][4][0] == from_id) || (history[i][2][3][0] == from_id && history[i][2][4][0] == this_id))) {
    result.push(history[i]);
   }
  }
 }
 return result;
}

function filterInbox(history) {
 var result = new Array();
 if (history !== false) {
  for (var i=0; i < history.length; i++)  {
   if (history[i][1] && history[i][2][4] && history[i][2][4][0] == this_id) {
    result.push(history[i]);
   }
  }
 }
 return result;
}

function filterOutbox(history) {
 var result = new Array();
 if (history !== false) {
  for (var i=0; i < history.length; i++)  {
   if (history[i][1] && history[i][2][3] && history[i][2][3][0] == this_id) {
    result.push(history[i]);
   }
  }
 }
 return result;
}

function down() {
 var new_per_page = this.per_page + 20;
 if (this.pre_load < new_per_page * 2) {
  this.pre_load = new_per_page * 2;
 }
 this.setPerPage(new_per_page);
 this.makeCaption();
}


function getPageQuick(info) {
 if (!info) {window.location.reload(false);}
 if (cur_tab == 'page'+this_id) {
  ge('tab0').className = 'menu_tab_off';
 }
 hideIfShown('messages');
 hideIfShown('search_area');
 hideIfShown('updates_area');
 pagePreview(info[0], info[1], info[2], info[3]);
 showIfHidden('main');
 getPage(info[0]);
}

function getPage(new_id, hash_params) {
 
// setTimeOut("checkReq("+req.num+","++")",10000);

 var params = parseHashParams(hash_params);
 if (params.photo) {
   photos.need_to_find = params.photo;
 }
 if (params.onphoto) {
   photos_with.need_to_find = params.onphoto;
 }
 if (params.photoscomments) {
   goto = 'photoscomments';
 }
 if (params.pagechat) {
  must_show_messages = 1;
 }

 showLoad();
 loading_profile = 1; 

 id = new_id || this_id;
 new_id = new_id || id;

// setHash(new_id);

// if (window.location.hash != "#"+new_id) {
//  window.location.hash = new_id;
// }
                   
 cur_tab = 'page'+id;

 wall.clear();
 photos.clear();
 photos_with.clear();
 friends.clear();
 activity.clear();
 message.clear(); 
 friends_online.clear();
 friends_mutual.clear();
 photos_comments.clear();

 member_schools = [];
 photos.showing_photo = photos_with.showing_photo = -1;
 need_to_preload_images = 0;
 showing['message'] = 0;
 showing['activity_area'] = 1;

 sid = getCookie('sid');
 if (!sid || sid <= -1 || sid == undefined) {
  return;
 }

 var req = new Object();
 req.gotPage = gotPage;
 req.destroy = destroy;

 if (this_id && this_id == id && cached_profiles[-1]) {
  req.num = -1;
  req.gotPage(cached_profiles[-1]);
 } else if (cached_profiles[id]) {
  req.num = -1;
  req.gotPage(cached_profiles[id]);
 } else {
  setTitle(l_lodo);
  doRequest("&act=profile&id="+id, gotPage, '#'+id);
 }

}

function getBlock(from, to_show) {

  this.getting_block = 1;
  var str = "";
  
  var to_load = from + to_show + this.pre_load - this.loaded;
  if (to_load > 0 && (this.num > from || this.num == 0 || this.num == 1e9)) {
    this.show_pending = (to_load > this.pre_load);
    this.pending_from = from;
    this.pending_to_show = to_show;
    this.loadList(this.loaded, to_load > to_show ? to_load : to_show);
  }

  str += this.getHeader();
  var left = arrow(this.name+'_left', this.name+'.scrollLeft();', '&#9668;', from > 0);
  var right = arrow(this.name+'_right', this.name+'.scrollRight();', '&#9658;', from+to_show < this.num && this.num != 1e9);
  if (this.num == 1e9) {
   var contents = "<div class='loading_inner' style='margin-top:25px;'></div>";
  } else {
   var contents = this.doShow(from, to_show);
  }
  str += htmlBlockAll(this.name, contents, left, right);

  this.offset = from;
  this.per_page = to_show;
  this.getting_block = 0;
  this.changed = 0;

  if (this.must_place_block) {
   if (ge(this.must_place_block)) {
    ge(this.must_place_block).innerHTML = str;
   }
   if (this.must_focus) {
    ge(this.act+'_search_input').focus();
    this.must_focus = false;
   }
   this.must_place_block = '';
  } else {
   return "<div id='"+this.name+"'>"+str+"</div>";
  }
}


function friendsHeader() {
 if (friends_mutual.num > 0 && id != this_id) {
  if (friends.num > 30 || looked_up) {
   return htmlHeaderSearch("friends", this.makeCaption(), l_frie, "friends.toggle(5,15);", l_frco+" ("+friends_mutual.num+")", "mutualFriends(true)");
  } else {
   return htmlHeader("friends", this.makeCaption(), l_frie, "friends.toggle(5,15);", l_frco+" ("+friends_mutual.num+")", "mutualFriends(true)");
  }
 } else {
  if (friends.num > 30 || looked_up) {
   return htmlHeaderMonoSearch("friends", this.makeCaption(), l_frie, "friends.toggle(5,15);");
  } else {
   return htmlHeaderMono("friends", this.makeCaption(), l_frie, "friends.toggle(5,15);");
  }
 }
}

function friendsOnlineHeader() {
 return htmlHeaderMono("friends_online", this.makeCaption(), l_fron, "friends_online.toggle(5,15);");
}

function friendsNewHeader() {
 return htmlHeaderMono("friends_new", this.makeCaption(), l_frne, "friends_new.toggle(15,45);");
}

function friendsCommonHeader() {
 return htmlHeader("friends_mutual", this.makeCaption(), l_frco, "friends_mutual.toggle(5,15);", l_frie+" ("+friends.num+")", "justFriends(true)");
}

function addPhotosHeader() {
 if (photos_with.num > 0 && photos.num > 0) {
  return htmlHeaderTriada("photos", "", l_phad, "addPhotos(0,1)", l_phos, "justPhotos(true);", l_phow+" ("+photos_with.num+")", "photosWith(true)");
 } else if (photos_with.num > 0) {
  return htmlHeader("photos", "", l_phad, "addPhotos(0,1)", l_phow, "photosWith(true);");
 } else if (photos.num > 0) {
  return htmlHeader("photos", "", l_phad, "addPhotos(0,1)", l_phos, "justPhotos(true);");
 } else {
  return htmlHeaderMono("photos", "", l_phad, "addPhotos(0,1)");
 }
}

function photosHeader() {
 if (photos_with.num > 0) {
  if (id != this_id) {
   return htmlHeader("photos", this.makeCaption(), l_phos, "photos.toggle(4,16);", l_phow+" ("+photos_with.num+")", "photosWith(true)");
  } else {
   return htmlHeaderTriada("photos", this.makeCaption(), l_phos, "photos.toggle(4,16);", l_phad, "addPhotos()", l_phow+" ("+photos_with.num+")", "photosWith(true)");
  }
 } else {
  if (id != this_id) {
   return htmlHeaderMono("photos", this.makeCaption(), l_phos, "photos.toggle(4,16);");
  } else {
   return htmlHeader("photos", this.makeCaption(), l_phos, "photos.toggle(4,16);", l_phad, "addPhotos()");
  }
 }
}

function photosWithHeader() {
 if (photos.num > 0) {
  return htmlHeader("photos_with", this.makeCaption(), l_phow, "photos_with.toggle(4,16);", l_phos+" ("+photos.num+")", "justPhotos(true)");
 } else {
  if (this_id != id) {
   return htmlHeaderMono("photos_with", this.makeCaption(), l_phow, "photos_with.toggle(4,16);");
  } else {
   return htmlHeader("photos_with", this.makeCaption(), l_phow, "photos_with.toggle(4,16);", l_phad, "addPhotos()");
  }
 }
}

function photosNewHeader() {
 return htmlHeaderMono("photos_new", this.makeCaption(), l_phnw, "photos_new.toggle(4,16);");
}

function countriesHeader() {
 return htmlHeaderMono("countries", this.makeCaption(), l_coun, "countries.toggle(16,32);") +
 "<div class='block_filter'><input id='countries_search_input' onkeypress=\"if (event.keyCode==13) {getCities(countries.info[0][0], 0);cities.must_focus=1;setTimeout(function(){ge('countries_search_input').blur();}, 50)}\" onkeyup='countriesFilter(0)' onfocus='countryFocusSearch(this)' onblur='countryDeFocusSearch(this)' style='border:1px solid #D9DDE3; padding:4px 7px; width:596px; margin: 3px 4px; _margin-left:-35px; font-size:11px; font-family: Tahoma; letter-spacing:1px;' value='"+l_srcd+"'></div>";
}

function schoolsHeader() {
 return htmlHeaderMono("schools", this.makeCaption(), l_scho, "schools.toggle(12,24);") +
 "<div class='block_filter'><input id='schools_search_input' onkeypress=\"if (event.keyCode==13) {"+this.func+"(schools.info[0][0], 0, schools.info[0][2]);setTimeout(function(){ge('schools_search_input').blur();}, 50)}\" onkeyup='schoolsFilter(0)' onfocus='schoolsFocusSearch(this)' onblur='schoolsDeFocusSearch(this)' style='border:1px solid #D9DDE3; padding:4px 7px; width:596px; margin: 3px 4px; _margin-left:-35px; font-size:11px; font-family: Tahoma; letter-spacing:1px;' value='"+l_srcd+"'></div>";
}

function citiesHeader() {
 return htmlHeaderMono("cities", this.makeCaption(), l_citi, "cities.toggle(12,24);") +
 "<div onclick=\"ge('cities_search_input').focus();\" class='block_filter'>" +
 "<input value='"+l_srcd+"' onblur='citiesDeFocusSearch(this)' onfocus='citiesFocusSearch(this)' id='cities_search_input' onkeypress=\"if (event.keyCode==13) {"+this.func+"(cities.info[0][0][0], 0);schools.must_focus=1;setTimeout(function(){ge('cities_search_input').blur();}, 50)}\" onkeyup='citiesFilter()' style='border:1px solid #D9DDE3; padding:4px 7px; width:596px; margin: 3px 4px; _margin-left:-35px; font-size:11px; font-family: Tahoma; letter-spacing:1px'>" +
 "</div>";
}

function photosCommentsHeader() {
 if (cur_tab != "updates") {
  return htmlHeaderTriada("photos_comments", "", l_comm, "photos_comments.toggle(5,15);", l_phco, "allPhotosComments()", l_wall, "justWall(true)");
 } else {
  return htmlHeaderMono("photos_comments", this.makeCaption(), l_comm, "photos_comments.toggle(5,15);");
 }
}

function faveHeader() {
 return htmlHeaderMono("fave", this.makeCaption(), l_bome, "fave.toggle(5,15);");
}

function searchResultsHeader() {
 var options = generateYears(search_results.year);
 return "<div id='search_results_block' class='block_header'><table class='bl_pad'><tr><td class='bl_1' style='width:360px' onclick='search_results.toggle(15, 25);' onmouseover=\"ge('search_results_block').className = search_results.headerClass+'_on'\" onmouseout=\"ge('search_results_block').className = search_results.headerClass\"><b class='arr_head_sm' id='search_results_arr'>&#9658;</b> "+l_srcr+" <span id='search_results_num'>"+this.makeCaption()+"</span></td><td style='width:260px; text-align:right; font-weight:normal'><label for='gradyear' style='margin-right:5px'>"+l_grad+"</label><select id='gradyear' onchange=\"search_results.year=this.value; doSearchClassmates();\" style='margin: 3px 0px 0px 0px;font-size:11px; padding:0px'>"+options+"</select></div></td></tr></table></div>";
}

function searchByNameHeader() {
 return "<div id='quick_search_block' class='block_header'><table class='bl_pad'><tr><td class='bl_1' style='width:360px' onclick='quick_search.toggle(15, 25);' onmouseover=\"ge('quick_search_block').className = quick_search.headerClass+'_on'\" onmouseout=\"ge('quick_search_block').className = quick_search.headerClass\"><b class='arr_head_sm' id='quick_search_arr'>&#9658;</b> "+l_srcr+" <span id='quick_search_num'>"+this.makeCaption()+"</span></td></tr></table></div>";
}

function faveOnlineHeader() {
 return htmlHeaderMono("fave_online", this.makeCaption(), l_bomo, "fave_online.toggle(5,15);");
}

function favedHeader() {
 return htmlHeaderMono("faved", this.makeCaption(), l_bomy, "faved.toggle(5,15);");
}

function inboxHeader() {
 return htmlHeader("inbox", this.makeCaption(), l_inbo, "inbox.toggle(5,10);", l_outb, "outbox.box()");
}

function outboxHeader() {
 return htmlHeader("outbox", this.makeCaption(), l_outb, "outbox.toggle(5,10);", l_inbo, "inbox.box()");
}

function wallHeader() {
 if (photos.num > 9) {
  return htmlHeader("wall", "", l_wall, "wall.toggle(5,10);", l_phco, "allPhotosComments()");
 } else {
  return htmlHeaderMono("wall", "", l_wall, "wall.toggle(5,10);");
 }
}

function activityHeader() {
 return htmlHeaderMono("activity", this.makeCaption(), l_stat, "activity.toggle(5,15);");
}

function updatesActivityHeader() {
 return htmlHeaderMono("updates_activity", this.makeCaption(), l_stfr, "updates_activity.toggle(5,15);");
}

function updatesFriendsHeader() {
 return htmlHeaderMono("updates_friends", this.makeCaption(), l_frfr, "updates_friends.toggle(5,15);");
}

function updatesPhotosHeader() {
 return htmlHeader("updates_photos", this.makeCaption(), l_phfr, "updates_photos.toggle(4,16);", l_phta, "updatesTaggedPhotos();");
}

function updatesTaggedPhotosHeader() {
 return htmlHeader("updates_tagged_photos", this.makeCaption(), l_phfn, "updates_tagged_photos.toggle(4,16);", l_phos, "updatesPhotos();");
}

function autoLogin() {
 ok = -1;
 document.location.href = loginUrl+'login=auto&global=1&site='+site_id+'&id='+id;
}

function forceLogin() {
 setTitle(l_logi);
 document.location.href = "http://"+mainDomain+"/login.html" + (id ? "#"+id : "");
 logging = 2;
}

function htmlHeaderMono(name, caption, word, func) {
 return "<div class='block_header' onclick='"+func+"' onmouseover=\"this.className = "+name+".headerClass+'_on'\" onmouseout=\"this.className = "+name+".headerClass\"><div class='bl_pad'><div class='bl_in'><b class='arr_head_sm' id='"+name+"_arr'>&#9658;</b> "+word+" <span id='"+name+"_num'>"+ caption +"</span></div></div></div>";
}

function htmlHeaderMonoOff(name, caption, word, func) {
 return "<div id='message_head' class='block_header_off' onclick='"+func+"' onmouseover=\"this.className = "+name+".headerClass+'_on'\" onmouseout=\"this.className = "+name+".headerClass\"><div class='bl_pad'><div class='bl_in'><b class='arr_head_sm' id='"+name+"_arr'>&#9650;</b> "+word+" <span id='"+name+"_num'>"+ caption +"</span></div></div></div>";
}

function searchBlock(obj) {

 if (!obj) {
  obj = ge('friends_search');
 }

 if (!obj) {
  search_over = 0;
  return;
 }

 obj.className = "searchButtonOn";
 obj.innerHTML = "<input type='text' onkeyup='friendFilter()' id='searchInput' onkeypress=\"if (event.keyCode==13 && this.value && friends.num == 1) {looked_up = 1; getPage(friends.info[0][0]);}\" class='searchBlock'>";
 all_friends = new DynList('all_friends', 5, 30);
 all_friends.num = 0;
 obj.onclick = function(){} 

 if (all_friends.num && all_friends.num < 1e9) {
  friends.info = all_friends.info;
  friends.num = all_friends.num;
  friends.loaded = all_friends.loaded;
 }

 if (friends.loaded < friends.num && friends.num != 1e9) {
  friends.loadList(friends.offset, friends.num - friends.offset);
 }

 setTimeout("ge('searchInput').focus()",100); 
 ge('searchInput').onblur = function() {
  if (mouseover.length) return;
  search_over = 0;
  repairFriends();

  friends.show(friends.offset, friends.per_page);
  obj.className = "searchButton";
  obj.innerHTML = "<div class='searchWord'>"+l_srch+"</div>";
  obj.onclick= function() {
   searchBlock(obj);
  }
 }
}

function friendFilterPreload() {
 if (friends.loaded < friends.num && friends.num < 1e9) {
  friends.loadList(friends.offset, friends.num - friends.offset);
 }
 friendFilter();
}

function repairFriends() {
  if (all_friends.num && all_friends.num < 1e9) {
   friends.info = all_friends.info;
   friends.num = all_friends.num;
   friends.loaded = all_friends.loaded;
  } else {
   all_friends.info = friends.info;
   all_friends.num = friends.num;
   all_friends.loaded = friends.loaded;
  }
}

function friendFilter() {

obj = ge('searchInput');
if (!obj) {return;}
query = obj.value;
query = query.toLowerCase();

 if (friends.loaded < friends.num && friends.num != 1e9) {
  setTimeout("friendFilterPreload()", 500);
 } else {

  repairFriends();

  if (!friendsList.length) {
   var i, k = all_friends.num;
   for (i = 0; i < k; i++) {
    friendsList[i] = all_friends.info[i][1].toLowerCase();
   }
  }

  var friendItems = [];
  var friends_found = [];

  var i, k = all_friends.num;

  for (i = 0; i < k; i++) {        
   if (friendsList[i].indexOf(query) != -1) {            
    friends_found.push(all_friends.info[i]);
   }
  }

  friends.info = friends_found;
  friends.num = friends_found.length;
  friends.loaded = friends.num + 100;
  friends.show(0, friends.per_page);
 }
}

function overSearch(obj) {
 search_over = 1;
}

function outSearch(obj) {
 search_over = 0;
}

function htmlHeaderSearch(name, caption, word1, func1, word2, func2) {
 word2 = word2.replace(/ /g, "&nbsp;");
 return "<div id='"+name+"_block' class='block_header'><table class='bl_pad'><tr><td class='bl_1' onclick='"+func1+"' onmouseover=\"ge('"+name+"_block').className = "+name+".headerClass+'_on'\" onmouseout=\"ge('"+name+"_block').className = "+name+".headerClass\"><div class='floatingHeader'><b class='arr_head_sm' id='"+name+"_arr'>&#9658;</b> "+word1+" <span id='"+name+"_num'>"+caption+"</span></div><div id='"+name+"_search' onclick='searchBlock(this)' onmouseover='overSearch(this)' onmouseout='outSearch(this)' class='searchButton'><div class='searchWord'>"+l_srch+"</div></div></td><td style='width:1%;' onclick='"+func2+"' class='bl_button' onmouseover=\"this.className = 'bl_button_over'\" onmouseout=\"this.className = 'bl_button'\"><div>"+word2+"</div></td></tr></table></div>";
}

function htmlHeaderMonoSearch(name, caption, word, func) {
 return "<div class='block_header' onclick='"+func+"' onmouseover=\"this.className="+name+".headerClass+'_on'\" onmouseout=\"this.className = "+name+".headerClass\" id='monoSearch'><div class='bl_pad'><div class='bl_in'><b class='arr_head_sm' id='"+name+"_arr'>&#9658;</b> "+word+" <span id='"+name+"_num'>"+ caption +"</span></div> <div id='"+name+"_search' onclick='searchBlock(this)' onmouseover='overSearch(this)' onmouseout='outSearch(this)' class='searchButton'><div class='searchWord'>"+l_srch+"</div></div>  </div></div>";
}

function htmlHeader(name, caption, word1, func1, word2, func2) {
 word2 = word2.replace(/ /g, "&nbsp;");
 return "<div id='"+name+"_block' class='block_header'><table class='bl_pad'><tr><td class='bl_1' onclick='"+func1+"' onmouseover=\"ge('"+name+"_block').className = "+name+".headerClass+'_on'\" onmouseout=\"ge('"+name+"_block').className = "+name+".headerClass\"><b class='arr_head_sm' id='"+name+"_arr'>&#9658;</b> "+word1+" <span id='"+name+"_num'>"+caption+"</span></td><td style='width:1%;' onclick='"+func2+"' class='bl_button' onmouseover=\"this.className = 'bl_button_over'\" onmouseout=\"this.className = 'bl_button'\"><div>"+word2+"</div></td></tr></table></div>";
}

function htmlHeaderOff(name, caption, word1, func1, word2, func2) {
 word2 = word2.replace(/ /g, "&nbsp;");
 return "<div id='"+name+"_block' class='block_header_off'><table class='bl_pad'><tr><td class='bl_1' onclick='"+func1+"' onmouseover=\"ge('"+name+"_block').className = "+name+".headerClass+'_on'\" onmouseout=\"ge('"+name+"_block').className = "+name+".headerClass\"><b class='arr_head_sm' id='"+name+"_arr'>&#9658;</b> "+word1+" <span id='"+name+"_num'>"+caption+"</span></td><td style='width:1%;' onclick='"+func2+"' class='bl_button' onmouseover=\"this.className = 'bl_button_over'\" onmouseout=\"this.className = 'bl_button'\"><div>"+word2+"</div></td></tr></table></div>";
}

function htmlHeaderTriada(name, caption, word1, func1, word2, func2, word3, func3) {
 word2 = word2.replace(/ /g, "&nbsp;");
 word3 = word3.replace(/ /g, "&nbsp;");
 return "<div id='"+name+"_block' class='block_header'><table class='bl_pad'><tr><td class='bl_1' onclick='"+func1+"' onmouseover=\"ge('"+name+"_block').className = "+name+".headerClass+'_on'\" onmouseout=\"ge('"+name+"_block').className = "+name+".headerClass\"><b class='arr_head_sm' id='"+name+"_arr'>&#9658;</b> "+word1+" <span id='"+name+"_num'>"+caption+"</span></td><td style='width:1%;' onclick='"+func2+"' class='bl_button' onmouseover=\"this.className = 'bl_button_over'\" onmouseout=\"this.className = 'bl_button'\"><div>"+word2+"</div></td><td style='width:1%;' onclick='"+func3+"' class='bl_button' onmouseover=\"this.className = 'bl_button_over'\" onmouseout=\"this.className = 'bl_button'\"><div>"+word3+"</div></td></tr></table></div>";
}

function htmlBlock(name, contents) {
 return "<table><tr><td id='"+name+"_left' class='arr' onclick='"+name+".scrollLeft();' onmouseover=\"this.className='arr_on'\" onmouseout=\"this.className='arr'\">&#9668;</td><td class='inner_rows' id='"+name+"_inner_rows'></td><td id='"+name+"_right' class='arr' onclick='"+name+".scrollRight();' onmouseover=\"this.className='arr_on'\" onmouseout=\"this.className='arr'\">&#9658;</td></tr></table>";
}

function htmlSearch() {
}

function htmlBlockAll(name, contents, left, right) {
 return "<table id='"+name+"_big_table' style='width: 100%'><tr>"+left+"<td class='inner_rows' id='"+name+"_inner_rows'>"+contents+"</td>"+right+"</tr></table>";
}

function htmlArrowEnabled(tag, func, arrowSymbol) {
 return "<td id='"+tag+"' class='arr' onclick='"+func+"' onmouseover=\"this.className='arr_on'\" onmouseout=\"this.className='arr'\">"+arrowSymbol+"</td>";
}

function htmlArrowDisabled(tag, func) {
 return "<td id='"+tag+"' class='arr_off' onclick='"+func+"'></td>";
}

function addNbsp(str) {
 return str.replace(/ /g, "&nbsp;");
}
function addBr(str) {
 return str.replace(/\n/g, "<br /><br />");
}

function htmlHeaderButton(title, func) {
 title = title.replace(/ /g, "&nbsp;");
 return "<td style='width:1%;' onclick='"+func+"' class='bl_button' onmouseover=\"this.className = 'bl_button_over'\" onmouseout=\"this.className = 'bl_button'\"><div>"+title+"</div></td>";
}

function htmlPhotoHeaderExtended(caption, buttons) {
 return "<div id='photo_block' class='block_header'><table class='bl_pad'><tr><td class='bl_1'>"+l_phot+" <span id='photo_num'>"+caption+"</span></td>"+buttons+"</tr></table></div>";
}

function htmlPhotoTagHeader(caption) {
 return "<div id='photo_block' class='block_header'><table class='bl_pad'><tr><td class='bl_1'>"+l_phot+" <span id='photo_num'>"+caption+"</span></td><td style='width:1%;' onclick='beginTagging()' class='bl_button' onmouseover=\"this.className = 'bl_button_over'\" onmouseout=\"this.className = 'bl_button'\"><div>"+addNbsp(l_phat)+"</div></td></tr></table></div>";
}

function htmlPhotoHeader(caption) {
 return "<div id='photo_block' class='block_header' style='cursor:default'><table class='bl_pad'><tr><td class='bl_1'>"+l_phot+" <span id='photo_num'>"+caption+"</span></td><td style='width:1%;' class='bl_button'></td></tr></table></div>";
}

function htmlPhoto(url, act, left, tags, right) {
var str = "<table><tr>" +
 left +
 "<td class='inner_rows' id='photo_inner_rows'><div id='confirm_tag'></div><div id='show_photo' onclick='"+act+".next()'><div id='photoarea'><img id='photo' src='"+url+"'></div></div><div id='photo_author'>&nbsp;</div><div id='photo_tags'>" + tags  + "</div><div id='next_preload'></div></td>" +
 right +
 "</tr></table>";
return str;
}

function htmlPhotoCont() {
 return "<div id='one_photo' style='line-height:0%'></div>";
}
       
function photoDialog(question, accept_func, accept_text, decline_func, decline_text) {
return "<div style='margin:10px;'>"+question+"</div>" +
"<table style='width:400px; margin:0px auto'><tr>" +
"<td style='width:200px'><div class='applyButton' onmouseover=\"this.className='applyButtonOn'\" onmouseout=\"this.className='applyButton'\" onClick=\"" + accept_func + "\" style='text-align: center'>" + accept_text + "</div></td>" +
"<td style='width:200px'><div class='cancelButton' onmouseover=\"this.className='cancelButtonOn'\" onmouseout=\"this.className='cancelButton'\" onClick=\"" + decline_func + "\" style='text-align: center'>" + decline_text + "</div></td>" + 
"</tr></table>";
}

function unixtime() {
 return Math.round(new Date().getTime());
}

function gotPage(d) {

// var prof = unixtime();

 if (!processErrors(d.ok, this)) {
  return;
 }

 this.destroy();

 if (!d.id) {
  showIfHidden('main');
  getTabs();
  hideLoad();
  setTitle(l_pdel);

  if (d.ok == -3) {
   var str = l_phid;
  } else {
   var str = l_pdel;
  }
  ge('main').innerHTML = "<div style='margin:100px auto;text-align:center'>"+str+"</div>";
  if (id) {
   setHash(id);
  }
  hideIfShown('messages');
  hideIfShown('search_area');
  hideIfShown('updates_area');
//  this.destroy();
 }

 if (!d || (d.id != id && id)) {
//  this.destroy();
  return;
 }

 document.body.style.cursor = "default";
 ok = 1;

 profileInfoVars(d);

 d.height = d.pr.pa || isIE ? "" : "<div style='height:800px'></div>";

 var str = getProfileInfo(d);

 hideIfShown('messages');
 hideIfShown('search_area');
 hideIfShown('updates_area');

 ge('main').innerHTML = str;
 showIfHidden('main');

 if (d.id == this_id) {
  cached_profiles[-1] = d;
 } else {
  if (cached_profiles.length > 10) {
   var my_d = cached_profiles[-1];
   cached_profiles = new Array();
   cached_profiles[-1] = my_d;
  }
  cached_profiles[d.id] = d;
 }

 getTabs();
 scroll(0,0);

// var res = unixtime() - prof;

 if (!d.pr.pa) {
  setTimeout("showProfileBody("+d.id+")", 1);
 } else {
  showProfileBody(d.id);
 }
}

function showProfileBody(mid) {

// var prof = unixtime();

 var d;
 if (mid == this_id) {
  d = cached_profiles[-1];
 } else {
  d = cached_profiles[mid];
 }
 if (!d) {return}

 profileVars(d);
 var str = getProfile(d);
 ge('profile_body').innerHTML = str;

 photos.showing_photo = -1;
 photos_with.showing_photo = -1;
 friendsList = [];

 vals['message_right'] = 0;
 vals['message_left'] = 0;

 if (need_to_preload_images == 0) {
  for (var i = 0; i < images_to_preload.length-1; i++) {
   imagePreload[i].src = images_to_preload[i];
  }
  need_to_preload_images = 1;
 }

 if (this.num == -1) {
  setTimeout("refreshProfile("+d.id+")", 1000);
 }

 loading_profile = 0;

 if (looked_up) {
  searchBlock(false);
  looked_up = 0;
 }

 message.headerClass = 'block_header_off';
 hideLoad();

 if (photos.need_to_find) {
  photos.idToNum();
 } else if (photos_with.need_to_find) {
  photosWith(true);
  photos_with.idToNum();  
 } else if (goto == 'photoscomments') {
  allPhotosComments();
  goto = 'wall';
 } else if (must_show_messages) {
  messageBox(); 
  must_show_messages = 0;
 } else {
  if (getHash() != "#"+id) {
   setHash(d.id);
  }
 }

 if (goto) {
  moveTo(goto);
  goto = '';
 }

// var res = unixtime() - prof;
 last_profile = last_history = unixtime();
 last_history_update = 0

}

function refreshProfile(mid) {
 if (cur_tab != 'page'+mid) {
  return;
 }
 doRequest('&act=profile&id='+mid, gotRefreshProfile);
}

function gotRefreshProfile(d) {

 if (editing_activity) {
  need_refresh_profile = d;
  return;
 }
 var mid = d.id;
 if (cur_tab != 'page'+mid) {
  this.destroy();
  return;
 }

 cached_profiles[this_id == d.id ? -1 : d.id] = d;
 profileInfoVars(d);
 profileVars(d);

 ge('top_profile_block').innerHTML = getTopProfileBlock(d);
 if (friends.num > 0) {
  friends.show(friends.offset, friends.per_page);
 }
 if (friends_online.num > 0) {
  friends_online.show(friends_online.offset, friends_online.per_page);
 }
 if (photos.num > 0) {
  photos.show(photos.offset, photos.per_page);
 } else if (photos_with.num > 0) {
  photos_with.show(photos_with.offset, photos_with.per_page);
 }
 wall.show(wall.offset, wall.per_page);

 this.destroy();

}

function pagePreview(mid, username, m_photo, b_photo) {
 var str = "";
 if (b_photo == '0' || b_photo == '') {
  var pic = "http://vkontakte.ru/images/no200.gif";
 } else {
  b_photo += ".jpg";
  var pic = m_photo.substr(0, m_photo.lastIndexOf("/") + 1) + b_photo;
 }

 str += "<div id='top_profile_block' style='margin-bottom:1000px'>" +
 "<table id='top_block' border=0><tr><td><div id='left_photo' style='display:block'><span id='img_cont'><img src='"+pic+"' /></span></div></td>" +
 "<td style='width:100%'><div id='on_cont'></div><div id='basic_info'><a name='top'></a><b id='name'>"+username+"</b><br />" +
 "<div id='activity_menu'></div></div></td></tr></table></div>";
 ge('main').innerHTML = str;
 scroll(0,0);
}

function getTopProfileBlock(d) {

 if (d.ms) {
  var ms = d.ms+" ";
  ms = ms.substr(0,4)+" ms";
 }
           
 var birthday = getBirthday(d.bd, d.bm, d.by);
 var sex = getSex(d.sx);
 var marital = getMarital(d.fs);
 var political = getPolitical(d.pv);
 var hometown = getLocation(d.ht);
 var mobile = getMobile(d.mo);

 var str = "";
 var online = d.on ? "<div class='online'>"+l_onli+"</div>" : "";
 var edit = "";
 var broadcast = "";
 no_photo = 0;
 var add_friend = "";

 if (d.bp == '0') {
  no_photo = 1;
  d.bp = profile_photo = "http://vkontakte.ru/images/no200.gif";
 }

 img_cont = "<img src='"+d.bp+"' />";
    
 if (d.isi) {
  add_friend = friendButtons();
 } else if (this_id != id) {
  if (d.isf) {
   add_friend = friendButton(l_remf, "delFriend()");
  } else {
   add_friend = friendButton(l_addf, "addFriend()");
  }
 }

// var edit_photo_style = toggling_profile ? "style='display:block'" : "";
// var edit_photo_style = "style='display:block'";

 if (this_id == id) {
  edit = profileButton(l_edph, "editPhoto()");
  broadcast = profileButton(l_startbr, "start_broadcast()");
  add_friend = friendButton(l_edpa, "editPage()");

 } else {
  if (d.f) {
   edit = profileButton(l_remb, "delFave()");   
  } else {
   edit = profileButton(l_addb, "addFave()");   
  }
 }

// ge('left_photo').style.height = ge('left_photo').offsetHeight+'px';
// ge('img_cont').innerHTML='';
// show('edit_photo');
 if (d.id == this_id && no_photo) {
  str += "<table id='top_block' border=0><tr><td><div id='left_photo' onmouseover='showActions()' onmouseout='hideActions()' style=\"background-repeat: no-repeat; background-image:url('"+d.bp+"');height:200px\"><span id='img_cont'></span>" +
      "<div id='edit_photo' style='display:block'>"+ edit + "</div>" +
	  "<div id='broadcast' style='display:block'>"+ broadcast + "</div>" +
      "</div></td>";
 } else {
  str += "<table id='top_block' border=0><tr><td><div id='left_photo' onmouseover='showActions()' onmouseout='hideActions()' style=\"background-repeat: no-repeat; background-image:url('"+d.bp+"')\"><span id='img_cont'>"+img_cont+"</span>" +
      "<div id='edit_photo'>"+ edit + "</div>" +
	  "<div id='broadcast'>"+ broadcast + "</div>" +
      "</div></td>";
 }

 str += "<td style='width:100%'><div id='on_cont'>"+online+"</div><div id='basic_info'><a name='top'></a><b id='name'>"+username+"</b><br />" +
     "<div id='activity_menu'>" + showProfileActivity(d.actv, true) + "</div>" +
     "<table style='margin-top:5px'>" +
     sex + 
     birthday +
     marital +
     political +
     hometown + mobile;

 str += "<tr><td>&nbsp;</td><td></td></tr>"
 var school, i, k = member_schools.length;
 for (i = 0; i < k; i++) {
  str += memberSchool(member_schools[i]);
 }
                                   
 str += "</table></div><div id='add_friend'>"+add_friend+"</div></td></tr></table>";
 return str;
}

function showActions() {
 ge('left_photo').style.height = ge('left_photo').offsetHeight+'px';
 ge('img_cont').innerHTML='';
 show('edit_photo', 'broadcast');
}

function hideActions() {
 ge('img_cont').innerHTML = img_cont;
 hide('edit_photo', 'broadcast');
}

function createSelect(options, selected) {
 var str = "";
 var i, k = options.length;
 for (i = 0; i < k; i++) {
  if (i == selected) {
   str += "<option value='"+i+"' selected>"+options[i]+"</option>";
  } else {
   str += "<option value='"+i+"'>"+options[i]+"</option>";
  }
 }
 return str;
}

function editPage() {
 setHash('editpage');
 cur_tab = 'editpage';
 getTabs();
 var d = cached_profiles[-1];
 if (!d) {
  ge('main').innerHTML = "<div class='loading_inner' style='margin-top:25px;'></div>";
  showIfHidden('main'); need_editpage_data = 1;
  return;
 }
 var i, days_options = "<option value='0'>"+l_day+"</option>";
 var days_arr = [l_day];
 var years_arr = [l_yea];
 for (i = 1; i < 32; i++) {
  days_arr[i] = i;
 }
 var days_options = createSelect(days_arr, d.bd);
 var male_selected = d.sx == 2 ? "checked" : "";
 var female_selected = d.sx == 1 ? "checked" : "";

 var years_options = "<option value='0'>"+l_yea+"</option>";
 for (i = 1996; i > 1900; i--) {
  if (d.by == i) {
   years_options += "<option value='"+i+"' selected>"+i+"</option>";
  } else {
   years_options += "<option value='"+i+"'>"+i+"</option>";
  }
 }

 var months_options = createSelect(months, d.bm);
 political_options = createSelect(political_views, d.pv);
 marital_options = createSelect(marital_statuses, d.fs);
 mobile = d.mo || '';

 var nf_checked = notify_friend ? "checked" : "";
 var nm_checked = notify_message ? "checked" : "";

 var str = "";
 str += "<div id='edit_page_area'>";

 str += "<div class='block_header' style='cursor:default'>";
 str += "<table class='bl_pad'><tbody><tr><td class='bl_1'>"+l_edpa+"</td><td class='bl_button' style='width: 1%;'/></tr></tbody></table>";
 str += "</div>";
 str += "<div style='margin:0px 40px'>";
 str += "<table class='regTable' cellpadding=0 cellspacing=0 style='width: 550px; margin-left:9px'><tr>";

 str += "<td style='padding-top: 15px; width:170px'>"+l_loc+": </td><td style='padding-top: 15px' id='location_link'>"+editLocationLink()+"</td>";
 str += "</tr><tr>";
 str += "<td style='padding-top: 5px;'>"+l_schs+":</td><td style='padding-top: 5px;'><a href='#search'>"+l_asch+"</a></td>";
 str += "</tr><tr>";
 str += "<td style='padding-top: 5px; width:170px'>"+l_daob+": </td><td style='padding-top: 5px'><select class='editSelect' id='bd'>"+days_options+"</select>"+"<select class='editSelect' id='bm'>"+months_options+"</select>"+"<select class='editSelect' id='by'>"+years_options+"</select></td>";
 str += "</tr><tr>";
 str += "<td style='padding-top: 5px; '>"+l_mrt+": </td><td><select class='editSelect' id='fs'>"+marital_options+"</select></td>";
 str += "</tr><tr>";
 str += "<td style='padding-top: 5px; '>"+l_plt+": </td><td><select class='editSelect' id='pv'>"+political_options+"</select></td>";
 str += "</tr><tr>";
 str += "<td style='padding-top: 7px; '>"+l_mobi+": </td><td><input class='regInput' style='padding:3px 4px; margin-top:7px' type='text' id='mo' value='"+mobile+"'></td>";
 str += "</tr><tr>";

 str += "<td style='padding-top: 5px; '>"+l_sex+": </td><td style='vertical-align:top'>";
 str += "<input style='margin: 5px 5px 0px 0px;padding-top:5px;' type='radio' name='sex' id='male' value='2' "+male_selected+"><label for='male'>"+l_male+"</label>";
 str += "</td></tr><tr><td></td><td>";
 str += "<input style='margin: 5px 5px 0px 0px;padding-top:5px;' type='radio' id='female' name='sex' value='1' "+female_selected+"><label for='female'>"+l_fema+"</label>";
 str += "</td></tr>";
 str += "<tr><td rowspan=2 style='padding-top: 5px; '>"+l_ntfc+":</td><td><input type='checkbox' class='checkbox' onchange=\"notify_friend = this.checked ? 1 : 0\" if='nf' "+nf_checked+"><label for='nf'>"+l_ntfr+"</label></td>";
 str += "<tr><td><input type='checkbox' class='checkbox' onchange=\"notify_message = this.checked ? 1 : 0\" id='nm' "+nm_checked+"><label for='nm'>"+l_ntms+"</label></td>";
 str += "</tr>";
 
 str += "</table>";

 str += 
 "<table style='width:100%; margin:10px 0px 0px 0px'><tr><td style='width:50%'><div style='border-bottom:1px solid #D0D7E2'><div id='submit' class='applyButton' onmouseout=\"this.className='applyButton'\" onmouseover=\"this.className='applyButtonOn'\" onClick='submitEditProfile();'>"+l_subm+"</div></div>" +
 "</td><td style='width:50%'><div style='border-bottom:1px solid #E5E9EF'><div id='cancel' class='cancelButton' onmouseout=\"this.className='cancelButton'\" onmouseover=\"this.className='cancelButtonOn'\" onClick='getPage("+this_id+");'>"+l_canc+"</div></div>" +
 "</td></tr></table>";
 str += "</div>";

 str += "</div>";
 showIfHidden('main');
 ge('main').innerHTML = str;
 
}

function submitEditProfile() {
 var sx = ge('male').checked ? 2 : ge('female').checked ? 1 : 0;
 var fs = ge('fs').value;
 var pv = ge('pv').value;
 var bd = ge('bd').value;
 var bm = ge('bm').value;
 var by = ge('by').value;
 var mo = ge('mo').value;
 cached_profiles[-1].sx = sx;
 cached_profiles[-1].fs = fs;
 cached_profiles[-1].pv = pv;
 cached_profiles[-1].bd = bd;
 cached_profiles[-1].bm = bm;
 cached_profiles[-1].by = by; 
 cached_profiles[-1].mo = mo; 
 doRequest("&act=edit_page&sx="+sx+"&fs="+fs+"&pv="+pv+"&bd="+bd+"&bm="+bm+"&by="+by+"&nf="+notify_friend+"&nm="+notify_message+"&mo="+mo+"&cii="+cached_profiles[-1].ht.cii, function(){getPage(this_id)});
}

function editPhotoCancel() {
 ge('edit_photo').innerHTML = profileButton(l_edph, "editPhoto()");
 ge('left_photo').style.background = "#FFF no-repeat url('"+profile_photo+"')";
 ge('left_photo').onmouseout = function() {hide('edit_photo');}
}

function delPagePhoto() {
 doRequest("&act=delete_page_photo", delPagePhotoSuccess);
}

function delPagePhotoSuccess() {
 cached_profiles[-1].bp = '0';
 no_photo = 1;
 var blank_photo = 'http://vkontakte.ru/images/no200.gif';
 profile_photo = blank_photo;
 ge('left_photo').style.background = "#FFF no-repeat url('"+blank_photo+"')";
 ge('img_cont').innerHTML = "<img src='"+blank_photo+"' />";
 ge('edit_photo').innerHTML = profileButton(l_edph, "editPhoto()");
 ge('left_photo').style.background = "#FFF no-repeat url('"+blank_photo+"')";
 ge('left_photo').onmouseout = function() {hide('edit_photo');}
}

function htmlEditPhoto() {
var str = "<form enctype='multipart/form-data' method='post' id='newPhoto' name='newPhoto' " +
 "action = '"+pr_upload_url+"upload.php?act=lprofile'>" +
 "<input type='hidden' name='id' value='"+id+"'>" +
 "<input type='hidden' name='sid' value='"+sid+"'>" +
 "<input type='hidden' name='back' value='http://"+mainDomain+"/#"+id+"'>" +
 "<input type='hidden' name='hash' value='"+pr_upload_hash+"'>" +
 "<input type='hidden' name='rhash' value='"+pr_upload_rhash+"'>" +
 "<div class='applyButton' onclick='editPhotoCancel();'>"+l_phun+"</div>" +
 "<input id='profile_photo' size='17' name='photo' type='file' onchange=\"ge('newPhoto').submit()\" />" + 
 "<div class='cancelButton' onmouseover=\"this.className='cancelButtonOn'\" onmouseout=\"this.className='cancelButton'\" onclick='editPhotoCancel();'>"+l_canc+"</div>";
 if (!no_photo) {
  str += "<div style='margin-top:10px; text-align:center' onclick='delPagePhoto();'><a href='#'>"+l_deph+"</a></div>";
 }
 str += "</form>";
 return str;
}

function editPhoto() {
 ge('edit_photo').innerHTML = htmlEditPhoto();
 ge('left_photo').style.background = "#FFF";
 ge('left_photo').onmouseout = function() {}
}

function profileButton(title, func) {
 return "<div onmouseover=\"this.className='applyButtonOn'\" onmouseout=\"this.className='applyButton'\" onclick=\""+func+"\" class='applyButton'><div>"+title+"</div></div>";
}

function friendButton(title, func) {
 return "<div class='f_button_wrap'><div onmouseover=\"this.className='f_button_on'\" onmouseout=\"this.className='f_button'\" onclick=\""+func+"\" class='f_button'>"+title+"</div></div>";
}

function friendButtonOff(title) {
 return "<div class='f_button_wrap'><div class='f_button_off'>"+title+"</div></div>";
}

function friendButtons(title) {
 return "<div class='f_button_wrap'><div onmouseover=\"this.className='f_button_on'\" onmouseout=\"this.className='f_button_semi'\" onclick=\"addFriend()\" class='f_button_semi'>"+l_acci+"</div><div onmouseover=\"this.className='f_button_on'\" onmouseout=\"this.className='f_button'\" onclick=\"delFriend()\" class='f_button' style='margin-left:0px'>"+l_deci+"</div></div>";
}


function getProfileInfo(d) {
  var str = "<div id='top_profile_block'>"+getTopProfileBlock(d)+"</div>";       
  if (id != this_id && !d.pr.ms) {
   str += "<div id='message_block'><div id='message_head_area'>"+htmlHeaderMonoOff('message', '', l_senm, 'messageBox()') + "</div></div>" +
    "<table id='message_table' style='display:none'><td id='message_left' class='arr_off' onclick='message.scrollLeft();' onmouseover=\"this.className='arr_on'\" onmouseout=\"this.className='arr'\"><span>&#9668;</span></td>" +
    "<td class='inner_rows' id='message_inner_rows' style='width:620px'>" +
    "<div id='message_text' style='text-align:center;margin:0px;background:#E5E9EF'><textarea style='height:80px' id='message_add' title='Ctrl+Enter' name='' onkeypress=\"if (event.keyCode==10 || (event.ctrlKey && event.keyCode==13)) {message.send();}\" class='add_comm'></textarea></div><div class='addButton' onmouseover=\"this.name='on';this.className='addButtonOn'\" onmouseout=\"this.name='off';this.className='addButton'\" id='message_add_button' style=\"display:block\" name='over' onclick='message.send();' title='Ctrl+Enter' title='Ctrl+Enter'>"+l_smsg+"</div>" +
    "<div id='message_inner_block'><table>" +
    "</table></div></td><td id='message_right' class='arr_off' onclick='message.scrollRight();' onmouseover=\"this.className='arr_on'\" onmouseout=\"this.className='arr'\"><span>&#9658;</span></td></tr></table></div>";
  } 
  str += "<div id='activity_area'></div><div id='profile_body'>"+d.height+"</div>";
  return str;
}

function getProfile(d) {
 
  var str = "";

  if (friends.num > 0) {
   str += friends.getBlock(friends.offset, friends.per_page);
  }

  if (friends_online.num > 0) {
   str += friends_online.getBlock(friends_online.offset, friends_online.per_page);
  }

  if (photos.num > 0) {
   images_to_preload = new Array();
   photos_with.on = false;
   str += photos.getBlock(0, photos.per_page);
  } else if (photos_with.num > 0) {
   images_to_preload = new Array();
   photos_with.on = true;
   str += photos_with.getBlock(0, photos_with.per_page);
  } else if (id == this_id) {
   str += addPhotos(true);
  }

  str += htmlPhotoCont();
  if (wall.num != -1) {
   str += wall.getBlock(0, wall.per_page);
  } else {
   str += "<div class='report'>"+l_papi+"</div>";
  }

  return str;

}


function profileInfoVars(d) {
  username = d.fn+" "+d.ln;
  this_id = d.us;
  id = d.id;
  is_friend = d.isf;
  profile_photo = d.bp;

  if (!message.ts) {
   message.ts = d.mts;
  }

  activity.ts = d.actv.ts;
  member_schools = d.edu;  
  setTitle(username);
}

function profileVars(d) {

  friends.num = d.fr.n;
  friends.info = d.fr.d;
  friends.loaded = 35;

  friends_online.num = d.fro.n;
  friends_online.info = d.fro.d;
  friends_online.loaded = 35;

  friends_mutual.num = d.frm.n;
  friends_mutual.info = d.frm.d;
  friends_mutual.loaded = 35;

  photos.num = d.ph.n;
  photos.info = d.ph.d;
  photos.loaded = 35;
  photos_comments.ts = d.ph.ts;
  photos_comments.photo_filter = 1;

  photos_with.num = d.phw.n;
  photos_with.info = d.phw.d;
  photos_with.loaded = 35;

  wall.num = d.wa.n;
  wall.info = d.wa.d;
  wall.ts = d.wa.ts;
  wall.loaded = 22;
  wall.deleted = new Array();
  wall.privacy = d.pr.wa;

  if (this_id == id) {
   pr_upload_url = d.pr.url;
   pr_upload_hash = d.pr.hash;
   pr_upload_rhash = d.pr.rhash;
   photos.upload_url = d.ph.url;   
   photos.upload_hash = d.ph.hash;
   photos.upload_rhash = d.ph.rhash;
   photos.upload_aid = d.ph.aid;
  }

}

function openPageChat(mid) {

 if (overX == true || this_id == mid) {
  return;
 }
 must_show_messages = 1;
 getPage(mid);
}

function openChat(hash, from, j) {

 if (overX == true) {
  return;
 }

 mid = parseInt(hash.substr(1));
 setHash('chat'+hash);

 if (this_id == mid) {
  return;
 }

// ge('message_area').innerHTML = "";
 message.clear();
 message.deleted = new Array();
 message.headerClass = 'block_header';

 hideIfShown('main');
 id = mid;
 var str = "";
 
 var str = "<div class='block_header' id='message_block'><table class='bl_pad'>" +
  "<tr><td class='bl_1' onclick='message.toggle(5,10);' onmouseover=\"ge('message_block').className = message.headerClass+'_on'\" onmouseout=\"ge('message_block').className = message.headerClass\">" +
  "<b class='arr_head_sm' id='message_arr'>&#9658;</b> "+l_hmsg+" <span id='message_num'></span></td>" +
  "<td style='width:1%;' onclick='backToInbox()' class='bl_button' onmouseover=\"this.className = 'bl_button_over'\" onmouseout=\"this.className = 'bl_button'\">" +
  "<div>"+addNbsp(l_rtin)+"</div></td></tr></table></div>" +
  "<table id='message_table'><td id='message_left' class='arr' onclick='message.scrollLeft();' onmouseover=\"this.className='arr_on'\" onmouseout=\"this.className='arr'\"><span>&#9668;</span></td>" +
  "<td class='inner_rows' id='message_inner_rows' style='width:620px'>" +
  "<div id='message_text' style='text-align:center;margin:0px;background:#E5E9EF'><textarea style='height:80px' id='message_add' title='Ctrl+Enter' name='' onkeypress=\"if (event.keyCode==10 || (event.ctrlKey && event.keyCode==13)) {message.send();}\" class='add_comm'></textarea></div><div class='addButton' onmouseover=\"this.name='on';this.className='addButtonOn'\" onmouseout=\"this.name='off';this.className='addButton'\" id='message_add_button' style=\"display:block\" name='over' onclick='message.send();' title='Ctrl+Enter' title='Ctrl+Enter'>"+l_smsg+"</div>" +
  "<div id='message_inner_block'><table>";
 var w = inbox.info[from+j];
 if (w != undefined) {
  str += message.getMessage(0, 0, w);
 }  
 str += "</table></div></td><td id='message_right' class='arr' onclick='message.scrollRight();' onmouseover=\"this.className='arr_on'\" onmouseout=\"this.className='arr'\"><span>&#9658;</span></td></tr></table>";

 ge('messages').innerHTML = str;

 vals['message_left'] = 0;
 vals['message_right'] = 0;
 shide('message_left', 0);
 shide('message_right', 0);

 showIfHidden('messages'); 
 ge('message_add').focus();

 message.loaded = 0;
 message.offset = 0;
 message.show(0, message.per_page);  
 
}

function messageBox() {
 var h = ge('message_head');
 if (showing['message'] == 0) {
  setTitle(username+": "+l_mess);
  setHash(id + ';pagechat');
  message.headerClass = 'block_header';
  ge('message_head_area').innerHTML = htmlHeaderMono('message', '', l_senm, 'messageBox()');
  ge('messages').innerHTML = "";
  shide('message_left', 0);
  shide('message_right', 0);
  ge('message_table').style.display = "";
  ge('message_add').focus();
  if (message.loaded == 0) {
   message.num = 1e9;
   message.deleted = new Array();
  }
  message.offset = 0;
  message.show(0, message.per_page);  
  showing['message'] = 1;
 } else if (showing['message'] == 1 && message.num > 5) {
  setTitle(username+": "+l_mess);
  setHash(id + ';pagechat');
  message.toggle(5,10);
  showing['message'] = 2;
 } else {
  setTitle(username);
  message.headerClass = 'block_header_off';
  ge('message_head_area').innerHTML = htmlHeaderMonoOff('message', '', l_senm, 'messageBox()');
  ge('message_table').style.display = "none";
  ge('message_inner_block').innerHTML = "";
  showing['message'] = 0;
  ge('message_num').innerHTML = '';
 }
}

function showIfHidden(tag) {
 if (showing[tag] == 0) {
  show(tag);
  showing[tag] = 1;
  return true;
 } else {
  return false;
 }
 onTabSelect(tag);
}

function hideIfShown(tag) {
 if (showing[tag] == 1) {
  hide(tag);
  showing[tag] = 0;
  return true;
 } else {
  return false;
 }
}

function addFave() {
 showLoad(); 
 doRequest('&act=add_fave&id='+id, faveResult);
}

function delFave() {
 showLoad();
 doRequest('&act=del_fave&id='+id, faveResult);
}

function faveResult(d) {
 fave.loaded = 0;
 faves_changed = 1;
 hideLoad();
 cached_profiles[this_id == d.id ? -1 : d.id].f = d.ok ? 1 : 0;
 ge('edit_photo').innerHTML = d.ok ? profileButton(l_remb, "delFave()") : profileButton(l_addb, "addFave()");
 this.destroy();
}

function addFriend() {
 showLoad();
 doRequest('&act=add_friend&id='+id, addFriendResult);
}

function delFriend() {
 showLoad();
 doRequest('&act=del_friend&id='+id, addFriendResult);
}

function addFriendResult(d) {
 hideLoad();
 switch (d.ok) {
  case 0:
   ge('add_friend').innerHTML = friendButton(l_addf, "addFriend()");
  break;
  case 1:
   ge('add_friend').innerHTML = friendButtonOff(l_reqs);
  break;
  case 2:
   ge('add_friend').innerHTML = friendButton(l_remf, "delFriend()");
  break;
  case 3:
   ge('add_friend').innerHTML = friendButtonOff(l_acci);
  break;
  case 4:
   ge('add_friend').innerHTML = friendButtonOff(l_deci);
  break;
 }
 friends_new.loaded = 0;
 if (new_friends) {
  new_friends--;
  getTabs();
 }
 this.destroy();
}


function justWall(must_show) {

 if (must_show) {
  wall.height = ge('wall').offsetHeight;
 }
 if (photos.showing_photo != -1 || photos_with.showing_photo != -1) {
  photos.deselectPhoto();
  photos_with.deselectPhoto();
  if (must_show) {
   ge('one_photo').innerHTML = "";
  }
  photos.showing_photo = -1;
  photos_with.showing_photo = -1;
 }
 if (photos_comments.parent != -1 && photos_comments.parent != -2) {
  deselected = 1;
 }
 photos_comments.parent = 0;

 var str = "";
 if (photos.num > 9) {
  str += htmlHeader("wall", "", l_wall, "wall.toggle(5,10);", l_phco, "allPhotosComments()");
 } else {
  str += htmlHeaderMono("wall", "", l_wall, "wall.toggle(5,10);");
 }

 str += htmlBlock("wall", "");
 vals['wall_left'] = "";
 vals['wall_right'] = "";
 if (must_show) {
  ge('wall').style.height = wall.height;
  ge('wall').innerHTML = str;
  wall.show(wall.offset, wall.per_page);
 } else {
  return "<div id='wall'>"+str+"</div>";;
 }
}

function allPhotosComments() {
 setHash(id + ';photoscomments');
 var str = "";
 wall.height = ge("wall").offsetHeight;
 if (photos_with.on) {
  var title = l_ctpw;
 } else {
  var title = l_comm;
 }
 str += htmlHeader("photos_comments", "", title, "photos_comments.toggle(5,15);", l_wall, "justWall(true)");
 str += htmlBlock("photos_comments", "");
 vals['photos_comments_left'] = "";
 vals['photos_comments_right'] = "";
 ge('wall').style.height = wall.height+"px";
 ge('wall').innerHTML = str;
 shide('photos_comments_left', 0);
 shide('photos_comments_right', 0);
 ge('one_photo').innerHTML = "";

 if (photos_with.on) {
  var par = -2;
 } else {
  var par = -1;
 }

 if (photos_comments.parent != par) {
  if (photos_comments.parent != -1 && photos_comments.parent != -2) {
   deselected = 1;
  }
  photos_comments.offset = 0;
  photos_comments.num = 1e9;
  photos_comments.loaded = 0;
  photos_comments.parent = par;
  photos_comments.deleted = new Array();
 }

 photos_comments.show(photos_comments.offset, photos_comments.per_page);
 photos.deselectPhoto();
 photos_with.deselectPhoto();
}

function mutualFriends(must_show) {
 repairFriends();
 var str = "";
 str += htmlHeader("friends_mutual", "", l_frco, "friends_mutual.toggle(5,15);", l_frie+" ("+friends.num+")", "justFriends(true)");
 str += htmlBlock("friends_mutual", "");
 vals['friends_mutual_left'] = "";
 vals['friends_mutual_right'] = "";
 if (must_show) {
  ge('friends').innerHTML = str;
  friends_mutual.show(friends_mutual.offset, friends_mutual.per_page);
 } else {
  return str;
 }
}

function justFriends(must_show) {
 var str = "";

 str += friendsHeader();

 str += htmlBlock("friends", "");
 vals['friends_left'] = "";
 vals['friends_right'] = "";
 if (must_show) {
  ge('friends').innerHTML = str;
  friends.show(friends.offset, friends.per_page);
 } else {
  return "<div id='friends'>"+str+"</div>";;
 }
}

function onlineFriends(must_show) {
 var str = "";
 str += htmlHeaderMono("friends_online", "", l_fron, "friends_online.toggle(5,15);");
 str += htmlBlock("friends_online", "");
 vals['friends_online_left'] = "";
 vals['friends_online_right'] = "";
 if (must_show) {
  ge('friends_online').innerHTML = str;
  friends_online.show(friends_online.offset, friends_online.per_page);
 } else {
  return "<div id='friends_online'>"+str+"</div>";
 }
}

function htmlPhotoUpload(i) {
return "<div class='upload_block' id='upload_photo"+i+"'>" +
 "<div class='upload_label'>"+l_phot+" "+i+":</div>" + 
 "<div class='upload_field'><input size='27' id='file"+i+"' name='file"+i+"' type='file' /></div>" + 
 "</div>";
}

function addPhotos(mustReturnString, mustToggle) {
 var i, displayed = 0, str = "";
 if (mustToggle) {
  add_photos_num = add_photos_num < 6 ? 6 : 2;
 }
 if (getHash() == '#0') {
  add_photos_num = 6;
 }
 if (!mustReturnString) {
  if (ge('upload_photo1')) {
   if (add_photos_num == 2) {
    ge('four_photos').innerHTML = '';
    return;
   } else if (add_photos_num == 6) {
    for (i = 3; i <= 6; i++) {
     str += htmlPhotoUpload(i);
    }
   }
   ge('four_photos').innerHTML = str;  
   return;   
  }
 }

 str += addPhotosHeader();
 str +=
 "<div style='margin:0px 40px; background-color:#F6F7F9'><div style='padding:10px 20px'><form enctype='multipart/form-data' method='post' id='addPhotosForm' name='addPhotosForm' " +
 "action = '"+photos.upload_url+"upload.php?act=lphotos&id="+this_id+"&oid="+this_id+
 "&sid="+sid+"'>" +
 "<input type='hidden' name='back' value='http://"+mainDomain+"/#"+this_id+";pos=photos'>" +
 "<input type='hidden' name='hash' value='"+photos.upload_hash+"'>" +
 "<input type='hidden' name='aid' value='"+photos.upload_aid+"'>" +
 "<input type='hidden' name='rhash' value='"+photos.upload_rhash+"'>"; 

 for (i = 1; i <= add_photos_num; i++) {
  if (i == 3) {
   str += "<div id='four_photos'>"
  }
  str += htmlPhotoUpload(i);
  if (i == 6) {
   str += "</div>"
  }
 }
 if (i == 3) {
  str += "<div id='four_photos'></div>";
 }

 str += "</form></div></div>" +
 "<div style='margin:0px 40px 0px 40px'><div class='applyButton' onmouseover=\"this.className='applyButtonOn'\" onmouseout=\"this.className='applyButton'\" onclick=\"if (ge('file1').value) {ge('addPhotosForm').submit()}\"'>"+l_phup+"</div></div>";
 if (mustReturnString) {
  return str;
 }
 ge('photos').innerHTML = str;

}

function justPhotos(must_show) {

 var str = "";
 images_to_preload = new Array();
 photos_with.on = false;
 if (must_show) {
  photos.deselectPhoto();
  if (photos_comments.parent != -1) {
   photos.per_page = photos_with.per_page;
   ge('one_photo').innerHTML = "";
   deselected = 0;
   allPhotosComments();
  }
 }

 str += photosHeader();
 str += htmlBlock("photos", "");
 vals['photos_left'] = "";
 vals['photos_right'] = "";
 if (must_show) {
  ge('photos').innerHTML = str;
  photos.show(photos.offset, photos.per_page);
 } else {
  return "<div id='photos'>"+str+"</div>";;
 }
}

function photosWith(must_show) {

 var str = "";
 images_to_preload = new Array();
 photos_with.on = true;
 photos_with.deselectPhoto();
 if (must_show) {
  if (photos_comments.parent != -2) {
   photos_with.per_page = photos.per_page;
   ge('one_photo').innerHTML = "";
   deselected = 0;
   allPhotosComments();
  }
 }

 str += photosWithHeader();

 str += htmlBlock("photos_with", "");
 vals['photos_with_left'] = "";
 vals['photos_with_right'] = "";
 if (must_show) {  
  ge('photos').innerHTML = str;
  shide('photos_with_left', 0);
  shide('photos_with_right', 0);
  photos_with.show(photos_with.offset, photos_with.per_page);
 } else {
  return "<div id='photos_with'>"+str+"</div>";;
 }
}

function createRequest(params, resultFunc) {
  var req = new Object();
  req.params = params;
  req.resultFunc = resultFunc;
  req.destroy = destroy;
  var rnum = Math.floor(Math.random()*1000);
  req.num = rnum;
  req.running = 1;
  reqs[rnum] = req;
  return req;
}

function doRequest(params, resultFunc, onFail) {
  var req = createRequest(params, resultFunc);
  if (onFail) {
   setTimeout("refreshOnFail("+req.num+", '"+onFail+"')", 10000);
  }
  sendRequest(req);
}

function refreshOnFail(num, loc) {
 if (reqs[num] && reqs[num].num && reqs[num].running && !first_load) {
  reqs[num].running = 0;
//  alert("num: "+reqs[num].num+" ; running: "+reqs[num].running+" ;loc: "+loc);
  window.location = 'http://'+mainDomain+'/'+loc;
  window.location.reload(true);
 }
}

function sendRequest(req) {
 attachScript('req'+req.num, mainUrl+req.params+'&sid='+getCookie('sid')+'&back=reqs['+req.num+'].resultFunc');
}

function faveTab(d) {
 setHash('myfave');
 if (d && cur_tab != 'fave') {
  return;
 }
 setTitle(l_book);

 cur_tab = 'fave';
 getTabs();

 showIfHidden('main');
 hideIfShown('messages');
 hideIfShown('search_area');
 hideIfShown('updates_area');

 var str = "";

 if (d) {
  fave.saveInfo(d.fave, fave.offset + 35);
  fave_online.saveInfo(d.fave_online, fave_online.offset + 35);
  faved.saveInfo(d.faved, faved.offset + 35);
  this.destroy();
 }

 if (fave.loaded == 0) {
  doRequest("&act=data&fave="+(fave.offset+35)+"&fave_online="+(fave_online.offset+35)+"&faved="+(faved.offset+35), faveTab);
  return;
 }

 if (fave.num) {
  str = fave.getBlock(fave.offset, fave.per_page);
 }
 if (fave_online.num) {
  str += fave_online.getBlock(fave_online.offset, fave_online.per_page);
 }
 if (faved.num) {
  str += faved.getBlock(faved.offset, faved.per_page);
 }
 if (!d) {
  setTimeout("refreshFave()", 300);
 }
 ge('main').innerHTML = str;

}

function refreshFave() {
 if (cur_tab != 'fave') {return;}
 if (faves_changed) {
  fave.loaded = 0;
  faveTab();
 }
}


function friendsTab() {

 setHash('myfriends_new');
 cur_tab = 'friends_new';
 getTabs();

 hideIfShown('messages');
 hideIfShown('search_area');
 hideIfShown('updates_area');
 showIfHidden('main');
 var str = friends_new.getBlock(friends_new.offset, friends_new.per_page);
 setTimeout("refreshNewFriends()", 300);
 ge('main').innerHTML = str;

}

function photosTab() {

 photos_new.showing_photo = -1;
 setHash('myphotos_new');
 cur_tab = 'photos_new';
 getTabs();

 hideIfShown('messages');
 hideIfShown('search_area');
 hideIfShown('updates_area');
 showIfHidden('main');
 photos_new.num = 1e9;
 photos_new.loaded = 0;
 var str = photos_new.getBlock(photos_new.offset, photos_new.per_page);
 str += htmlPhotoCont() + "<div id='wall'></div>";
 ge('main').innerHTML = str;

}

function refreshNewFriends() {
 if (cur_tab != 'friends_new' || new_friends > 1000 || !friends_changed) {return;}
 friends_new.loaded = 0;
 friends_new.info = new Array();
 friends_new.getBlock(friends_new.offset, friends_new.per_page);
 friends_changed = 0;
}

function box() {

 setHash('my' + this.act);
 setTitle(l_mess);

 this.offset = 0;
 if (this.loaded == 0) {
  this.num = 0;
  this.deleted = new Array();
 }

 ge('main').innerHTML = this.getBlock(this.offset, this.per_page);

 if (new_messages == 0) {
  new_messages = '';
 }

 cur_tab = 'inbox';

 getTabs();
 showIfHidden('main');
 hideIfShown('messages');
 hideIfShown('search_area');
 hideIfShown('updates_area');
 overX = false;
 scroll(0,0);

}

function backToInbox() {
 hideIfShown('messages');
 showIfHidden('main');
}             

function getTabs() {

 act = new Array(
 "page"+this_id, l_mypa, "getPage("+this_id+")", this_id,
 "search", l_schs, "searchTab();", "search"
 );

 if ((inbox.num > 0 && inbox.num != 1e9) || (outbox.num > 0 && outbox.num != 1e9) || new_messages || cur_tab == 'inbox') {
  if (new_messages) {
   var new_mess_span = " <span id='new_msg'>"+new_messages+"</span>";
  } else {
   var new_mess_span = "";
  }
  act.push("inbox", l_mess+new_mess_span, "inbox.box()", "myinbox");
 }

 if ((cached_profiles[-1] && cached_profiles[-1].fr.n > 4) || cur_tab == 'news') {
  act.push("news", l_news, "updatesTab()", "news");
 }

 if ((fave.num > 0 && fave.num != 1e9) || cur_tab == 'fave') {
  act.push("fave", l_book, "faveTab()", "myfave");
 }

 if (cur_tab == 'page0') {
  cur_tab = act[0]
 }

 var str = "";
 var tabs_num = act.length/4;
 var tab_width = parseInt(620 / tabs_num);
 for (i = 0; i < tabs_num; i++) {
  str += getTab(i, act[i*4+1], act[i*4+2], act[i*4+3], act[i*4] == cur_tab, tab_width);
 }

 ge('top_wrap').innerHTML = str;

}

function getTab(n, title, func, lnk, active, tab_width) {
 if (active == false) {
  return "<div class='menu_tab_off' id='tab"+n+"' style='width:"+tab_width+"px' onmouseout=\"this.className='menu_tab_off'\" onmouseover=\"this.className='menu_tab_on'\"><a href='#"+lnk+"'><div class='menu_link' onclick='"+func+";return false'>"+title+"</div></a></div>";
 } else {
  return "<div class='menu_tab' id='tab"+n+"' style='width:"+tab_width+"px'><a href='#"+lnk+"'><div class='menu_link' onclick='"+func+"'>"+title+"</div></a></div>";
 }
}

function getNotifiers() {
 var str = "";
 if (new_friends) {
  str += "<div class='not_off' onmouseover=\"this.className='not_on'\" onmouseout=\"this.className='not_off'\"><a href='#myfriends_new'><div onclick='friendsTab();return false' class='menu_link'>"+l_frie+" <span id='new_msg'>"+new_friends+"</span></div></a></div>";
 }
 if (new_photos) {
  str += "<div class='not_off' onmouseover=\"this.className='not_on'\" onmouseout=\"this.className='not_off'\"><a href='#myphotos_new'><div onclick='photosTab();return false' class='menu_link'>"+l_phos+" <span id='new_msg'>"+new_photos+"</span></div></a></div>";
 }
 ge('new').innerHTML = str;
}

function show() {
 for (var i = 0; i < arguments.length; i++) {
  var element = ge(arguments[i]);
  if (element && element.style) element.style.display = 'block';
 }
}

function show2() {
 for (var i = 0; i < arguments.length; i++) {
  var element = ge(arguments[i]);
  if (element && element.style) element.style.display = '';
 }
}

function hide() {
 for (var i = 0; i < arguments.length; i++) {
  var element = ge(arguments[i]);
  if (element && element.style) element.style.display = 'none';
 }
}

function ge(e) {
 return document.getElementById(e);
}

function pu(e) {
 return document.write(e);
}

function dummy() {
 if (this.destroy) {
  this.destroy();
 }
}

function gotPrepareUpdates(d) {
 if (d.ok == 1) {
  first_load = false;
 }
 if (this.destroy) {
  this.destroy();
 }
}

function tag(e) {
 return getElementsByTagName(e);
}

function getSex(i) {
 var str = "";
 if (i == 1) {
  str = l_fema;
 } else {
  str = l_male;
 }
 return "<tr><td class='label'>"+l_sex+":</td><td>"+str+"</td></tr>";
}

function getMarital(i) {
 if (i == 0) {
  return "";
 }
 return "<tr><td class='label'>"+l_mrt+":</td><td>"+marital_statuses[i]+"</td></tr>";
}

function getPolitical(i) {
 if (i == 0) {
  return "";
 }
 return "<tr><td class='label'>"+l_plt+":</td><td>"+political_views[i]+"</td></tr>";
}

function getLocation(ht) {
 if ((ht.con || ht.cof) && ht.cin) {
  if (ht.con) {
   return "<tr><td class='label'>"+l_loc+":</td><td>"+ht.cin+ ", "+eval('l_'+ht.con)+"</td></tr>";
  } else if (ht.cof) {
   return "<tr><td class='label'>"+l_loc+":</td><td>"+ht.cin+ ", "+ht.cof+"</td></tr>";
  }
 }
 return "";
}

function getMobile(mo) {
 if (mo) {
  return "<tr><td class='label'>"+l_mobi+":</td><td>"+mo+"</td></tr>";
 }
 return "";
}

function getBirthday(day, month, year) {
 var birthString = "";
 if (day > 0) {
  birthString += day;
 }
 if (month > 0) {
  if (birthString) {
   birthString += ".";
  }
  birthString += month;
 }
 if (year > 0) {
  if (birthString) {
   birthString += ".";
  }
  birthString += year;
 }
 if (!birthString) {
  return "";
 } 
 return "<tr><td class='label'>"+l_bday+":</td><td>"+birthString+"</td></tr>";
}


function friendOn(obj, n, act) {
 mouseover = act+n;
 obj.className = 'friend_cell_on';
}

function friendOff(obj, n, act) {
 mouseover = '';
 obj.className = 'friend_cell';
}


function searchTab(hash_params) {

 cur_tab = 'search';
 if (!hash_params) {
  setHash('search');
 } else {
  setHash('search' + hash_params);
 }

 setTitle(l_schs);

 hideIfShown('main');
 hideIfShown('updates_area');
 hideIfShown('messages');

 var params = parseHashParams(hash_params); 
 var school = params.s, year = params.y, city = params.ci, country = params.co;

 showIfHidden('search_area');
 getTabs();

 cities.func = "getSchools";
 
 if (school) {
  search_results.parent = school;
  search_results.year = year;
  search_results.searching = 1;
  search_results.query = undefined;
  search_results.getHeader = searchResultsHeader;
  ge('search_area').innerHTML = "<div id=\"dummy\" style=\"height:177px; overflow:hidden\"><div class='loading_inner' style='margin:82px auto 0px auto'></div></div><div id='countries' style=\"display:none\" onmouseover=\"over_countries=true;\" onmouseout=\"over_countries=false;\"></div><div id='cities' style=\"display:none\" onmouseover=\"over_cities=true;\" onmouseout=\"over_cities=false;\" ></div><div id='schools' style=\"display:none\" onmouseover=\"over_schools=true;\" onmouseout=\"over_schools=false;\" ></div><div id='search_results'></div><div id='add_school'></div>";
  doSearchClassmates();
  return;
 } else if (city && country && editing_location) {
  ge('search_area').innerHTML = "<div id='countries' style=\"display:none\" onmouseover=\"over_countries=true;\" onmouseout=\"over_countries=false;\"></div><div id='cities' style=\"display:none\" onmouseover=\"over_cities=true;\" onmouseout=\"over_cities=false;\" ></div><div id='schools' style=\"display:none\" onmouseover=\"over_schools=true;\" onmouseout=\"over_schools=false;\" ></div><div id='search_results'></div><div id='add_school'></div>";
  var city_name = "";
  if (cached_profiles[-1]) {
		city_name = cached_profiles[-1].ht.cin;
  }
  cities.func = "selectedCity";
  citiesAndCountries(country, city, city_name);
  show("cities_big_table");
  return;
 }

 if (!ge('search_area').innerHTML || editing_location) {
  countries.info = all_countries;
  countries.num = all_countries.length;
  countries.current = 0;
  query = "";
  str = countries.getBlock(0, 16);
  ge('search_area').innerHTML = str + "<div id='cities' onmouseover=\"over_cities=true;\" onmouseout=\"over_cities=false;\" ></div><div id='schools' onmouseover=\"over_schools=true;\" onmouseout=\"over_schools=false;\" ></div><div id='search_results'></div><div id='add_school'></div>";
  ge('countries').onmouseover = function() { over_countries = true; };
  ge('countries').onmouseout = function() { over_countries = false; };
 }


}

function selectedCity(city_id, i) {
 city_name = cities.info[i][0][1];
 cur_tab = "editpage";
 getTabs();
 cached_profiles[-1].ht.coi = countries.current; 
 cached_profiles[-1].ht.cii = city_id; 
 cached_profiles[-1].ht.con = 0;
 cached_profiles[-1].ht.cof = countryIdToName(countries.current);
 cached_profiles[-1].ht.cin = city_name; 
 ge('location_link').innerHTML = editLocationLink();
 editing_location = false;
 hideIfShown('search_area');
 ge('search_area').innerHTML = '';
 showIfHidden("main");
}

function editLocationLink() {
 var d = cached_profiles[-1];
 var c_name = d.ht.cof ? d.ht.cof : eval('l_'+d.ht.con);
 return "<a href=\"javascript:editing_location=true;searchTab(';ci="+d.ht.cii+";co="+d.ht.coi+"');\">"+d.ht.cin+", "+c_name+"</a>";
}

function gotSearchDetails(d) {

 search_results.searching = 0;  
 citiesAndCountries(d.country_id, d.city_id, d.city_name);

 schools.query = '';
 schools.loaded = 0;
 schools.offset = 0;
 schools.num = 1e9+1;
 schools.per_page = 12;
 schools.parent = d.city_id;
// schools.getting_block = 1;
 schools.must_place_block = 'schools';
 schools.getBlock(0, schools.per_page);
 hide('schools_big_table'); 

 var name = getSchoolType(d.school_type, countries.current)+" "+d.school_name;
 ge('schools_search_input').value = ge('schools_search_input')._old_value = name;
 schools.current = d.school_id;
 show('schools');

 setTitle(l_srch+': '+d.school_name);

}

function citiesAndCountries(country_id, city_id, city_name) {
  countries.info = all_countries;
  countries.num = all_countries.length;
  countries.current = country_id;
  query = "";
  var country_name = countryIdToName(country_id);
  countries.must_place_block = 'countries';
  countries.getBlock(0, countries.per_page);
  hide('countries_big_table');
  ge('countries_search_input').value = ge('countries_search_input')._old_value = country_name; // countries.info[country][1];

  hide('dummy');
  show('countries');

  cities.query = '';
  cities.loaded = 0;
  cities.offset = 0;
  cities.num = 1e9+1;
  cities.per_page = 12;
  cities.parent = country_id;
  cities.must_place_block = 'cities';
  cities.getBlock(0, cities.per_page);
  hide('cities_big_table'); 


 ge('cities_search_input').value = ge('cities_search_input')._old_value = city_name;
 cities.current = city_id;
 show('cities');

}

function searchByName(hash_params) {
 cur_tab = 'name';
 if (!hash_params) {
  setHash('name');
  quick_search.query = ge('search_by_name').value;
  setHash('name;q='+quick_search.query);
 } else {
  setHash('name' + hash_params);
  var params = parseHashParams(hash_params); 
  quick_search.query = params.q;
 }
 ge('main').innerHTML = "<div id='quick_search'></div>";
 quick_search.loaded = 0;
 quick_search.offset = 0;
 quick_search.num = 1e9; 
 quick_search.parent = 0; 
 quick_search.getting_block = 1; 
 quick_search.getHeader = searchByNameHeader;
 quick_search.must_place_block = 'quick_search';
 ge('quick_search').innerHTML = quick_search.getHeader() + "<div class='loading_block' style='padding-top:40px'><div class='loading_inner'></div></div>";
 quick_search.loadList(0, quick_search.pre_load+quick_search.per_page);
 hideIfShown('updates_area');
 hideIfShown('messages');
 hideIfShown('search_area');
 showIfHidden('main');
 getTabs();
}

function doShowUsers(from, to_show) {

 var str = "";
 var style = "";
 var pic = "";
 var table_style = "normal";
 var per_line = 5;
 var info = this.info;
 var n, cur_info = 0;
 var onmouseoverout, addmouseover, addmouseout;

 str += "<table class="+table_style+">";
 for (j = 0; j < to_show; j++) {

  if (j % per_line == 0) {
   str += "<tr>";
  }
  n = from+j;
  cur_info = info[n];

  if (cur_info) {
   pic = cur_info[2];
   if (mouseover == this.name+n || (this.num == 1 && friendsList.length)) {
    style = 'friend_cell_on';
   } else {
    style = 'friend_cell';
   }

   if (pic == '0') {
    pic = "http://vkontakte.ru/images/no100.gif";
   }

   onmouseoverout = "onmouseout=\"friendOff(this,"+n+",'"+this.name+"');\" onmouseover=\"friendOn(this,"+n+",'"+this.name+"');\"";
//   str += "<td onclick=\"getPageQuick("+this.act+".info["+n+"]);return false;\" "+ onmouseoverout +"class=\""+style+"\" id=\"fr\"><div class='friend_photo'><a href='#"+cur_info[0]+"'><img src='"+pic+"'></a></div><span>"+cur_info[1]+"</span></td>";
   str += "<td onclick=\"getPage("+cur_info[0]+");return false;\" "+ onmouseoverout +"class=\""+style+"\" id=\"fr\"><div class='friend_photo'><a href='#"+cur_info[0]+"'><img src='"+pic+"'></a></div><span>"+cur_info[1]+"</span></td>";
  } else {
   str += "<td style='display:none' class=\"friend_cell\"><div class='friend_photo'></div><span></span></td>";
  }
  if (j % per_line == (per_line - 1)) {
   str += "</tr>";
  }
 }

 str += "</table>";

 if (this.num == 0 && this.loaded > 0) {
  if (this.name != 'friends_online') {
   var word = l_nouf;
   str = "<table class="+table_style+"><tr><td class='no_results'><div>"+word+"</div></td></tr></table>";
  }
 }


 for (j = to_show; j < 2*to_show; j++) {
  cur_info = info[from+j];
  if (cur_info != undefined) {
   if (need_to_preload_images > 0) {
    if (imagePreload[j-to_show]) {
     imagePreload[j-to_show].src = cur_info[2];
    }
   } else {
    images_to_preload.push(cur_info[2]);
   }
  }
 }

 if (this.getting_block) {
  return str;
 } else {  
  try {
   ge(this.name+'_inner_rows').innerHTML = str;
  } catch(e) {
//   alert(this.name)
  }
 }

}

function doShowLines(from, to_show) {

 var str = "";
 var per_line = 2;
 var info = this.info;
 var name = "";
 var cur_info = 0;

 str += "<table>";

 if (this.num == 1) {

  cur_info = info[0];
  str += this.getLine(cur_info, 0);  

 } else {

  for (j = 0; j < to_show; j++) {
   if (j % per_line == 0) {
    str += "<tr>";
   }
   cur_info = info[from+j];
   str += this.getLine(cur_info, from+j);

   if (j % per_line == (per_line - 1)) {
    str += "</tr>";
   }
  }

 }

 str += "</table>";

 if (this.num == 0 && this.loaded > 0) {
  str += "<tr><td style='width:625px;'><div style='padding:10px;text-align:center;'>"+l_noth+".</div></td></tr>";
 }

 if (this.getting_block) {
  return str;
 } else {  
  try {
   ge(this.name+'_inner_rows').innerHTML = str;
  } catch(e) {
//   alert(this.name)
  }
 }

}


function getCountryLine(cur_info, i) {

 var name = "";
 if (cur_info) {
  name = cur_info[1];
  var q_length = query.length;  
  var position = name.toLowerCase().indexOf(query);  
  if (position != -1 && q_length > 0) {            
   name = name.substr(0, position) + "<span style='background-color:#E5E9EF'>" + name.substr(position, q_length) + "</span>" + name.substr(position+q_length);
  }
 }

 if (this.num == 1) {
  return "<tr><td onclick=\"getCities("+cur_info[0]+",'"+i+"');\" class='line_cell_wide'>"+name+"</td></tr>";
 }

 if (cur_info) {
  style = 'line_cell';
  if (cur_info[2] > 0) {
   name = "<b>"+name+"</b>";
  } else {
   name = name;
  }

  if (cur_info[0] == this.current) {
   return "<td onclick=\"getCities("+cur_info[0]+",'"+i+"')\" class='line_cell_on'>" + "<span>"+name+"</span>" + "</td>"; 
  } else {
   if (cur_info[2] > 0) {
    style = "line_cell_bold";
   }     
   return "<td onclick=\"getCities("+cur_info[0]+",'"+i+"')\" class='"+style+"' onmouseover=\"this.className = 'line_cell_on'\" onmouseout=\"this.className = '"+style+"'\">" + "<span>"+name+"</span>" + "</td>";
  }
 } else {
  return "<td style='display:none' class=\"line_cell\"></td>";
 }

}

function getCityLine(cur_info, i) {

 var name = "";

 if (cur_info) {

  style = 'line_cell';
  name = cur_info[0][1];

  var q_length = cities.query.length;
  if (q_length > 0) {
   var position = 0;
   if (cur_info[0][4] == 2) {
    var position = name.split(" ")[0].length + 1;
    if (position == name.length+1) {
     var position = name.split("-")[0].length + 1;
    }
   }
   name = name.substr(0, position) + "<span style='background-color:#E5E9EF'>" + name.substr(position, q_length) + "</span>" + name.substr(position+q_length);
  }

  if (cur_info[0][3] > 0) {
   name = "<b style='font-weight:normal;border-bottom:1px dashed #000'>"+name+"</b>";
  } 

  name += "<div style='margin-top:5px;color:#777'>";

  if (cur_info[1]) {
   name += cur_info[1][1];
   if (cur_info[3][0] < 5) {
    name += " "+cyrCityTypes[cur_info[1][2]];
   }
  }
  if (cur_info[2] && cur_info[2][1]) {
   if (cur_info[1] && cur_info[1][1]) {
    name += ", ";
   }
   name += cur_info[2][1];
   if (cur_info[3][0] < 5) {
    name += " "+cyrCityTypes[cur_info[2][2]];
   }
  }
  name += "</div>";
 }

 if (this.num == 1) {
  return "<tr><td onclick='"+this.func+"("+cur_info[0][0]+",\""+i+"\")' class='line_cell_wide'>" + "<span>"+name+"</span>" + "</td></tr>"; 
 }
//
 if (cur_info) {
  if (cur_info[0][0] == this.current) {
   return "<td style='border-bottom:1px solid #D9DDE3' onclick='"+this.func+"("+cur_info[0][0]+","+i+")' class='line_cell_on'>" + "<span>"+name+"</span>" + "</td>"; 
  } else {
   if (cur_info[0][3] > 0) {
    style = "line_cell_bold";
   }     
   return "<td style='border-bottom:1px solid #D9DDE3;' onclick='"+this.func+"("+cur_info[0][0]+","+i+")' class='"+style+"' onmouseover=\"this.className = 'line_cell_on'\" onmouseout=\"this.className = '"+style+"'\">" + "<span>"+name+"</span>" + "</td>";
  }
 } else {
  return "<td style='display:none' class=\"line_cell\"></td>";
 }

}

function getSchoolLine(cur_info, i) {

 var name = "";
 var classn = "school_cell";

 if (cur_info) {
  name = cur_info[1];
  var q_length = schools.query.length;  
  var position = name.toLowerCase().indexOf(schools.query);
  if (position != -1 && q_length > 0) {
   name = name.substr(0, position) + "<span style='background-color:#E5E9EF'>" + name.substr(position, q_length) + "</span>" + name.substr(position+q_length);
  }
//  name = getSchoolType(cur_info[2], countries.current)+" "+name;
//cur_info[1] = cur_info[1].replace(/&#39;/g, '');
  switch (cur_info[2]) {
   case '100': classn = "bold_cell"; break;
   case '110': classn = "fac_cell"; break;
  }
 }

 if (this.num == 1) {
  return "<tr><td onclick=\""+this.func+"("+cur_info[0]+","+i+","+cur_info[2]+");\" class='line_cell_wide'>"+name+"</td></tr>";
 }

 if (cur_info) {
  if (cur_info[0] == this.current) {
   return "<td onclick=\""+this.func+"("+cur_info[0]+","+i+","+cur_info[2]+")\" class='"+classn+"_on'>" + "<span>"+name+"</span>" + "</td>"; 
  } else {
   return "<td onclick=\""+this.func+"("+cur_info[0]+","+i+","+cur_info[2]+")\" class='"+classn+"' onmouseover=\"this.className = '"+classn+"_on'\" onmouseout=\"this.className = '"+classn+"'\">" + "<span>"+name+"</span>" + "</td>";
  }
 } else {
  return "<td style='display:none' class=\"line_cell\"></td>";
 }

}


function getCities(country, i) {
 getting_cities = 1;
 name = countries.info[i][1];
 ge('countries_search_input').value = ge('countries_search_input')._old_value = name;
 ge('schools').innerHTML = "";
 ge('search_results').innerHTML = "";
 ge('add_school').innerHTML = "";
 countries.current = country;
 countriesFilter(countries.offset);

 cities.query = '';
 cities.loaded = 0;
 cities.offset = 0;
 cities.num = 1e9;
 cities.per_page = 12;
 cities.parent = country;
 cities.getting_block = 1;
 cities.must_place_block = 'cities';
 cities.show(0, cities.per_page);

 hide('countries_big_table'); 
 ge('cities').innerHTML = "<div class='loading_block' style='width:670px;padding:30px 15px 0 15px;margin-bottom: 0px;'><div class='loading_inner'></div></div>";
}

function getSchools(city, i) {

 name = cities.info[i][0][1];
 ge('cities_search_input').value = ge('cities_search_input')._old_value = name;
 ge('search_results').innerHTML = "";
 ge('add_school').innerHTML = "";
 cities.current = city;
// citiesFilter(true);
 ge('cities_num').innerHTML = '';
 schools.query = '';
 schools.loaded = 0;
 schools.offset = 0;
 schools.num = 1e9;
 schools.per_page = 12;
 schools.parent = city;
 schools.getting_block = 1;
 schools.must_place_block = 'schools';
 schools.show(0, schools.per_page);
 hide('cities_big_table'); 
 ge('schools').innerHTML = "<div class='loading_block' style='width:670px;padding:30px 15px 0 15px;margin-bottom: 0px;'><div class='loading_inner'></div></div>";
}


function getClassmates(school, i, type) {
 name = schools.info[i][1];
 name = getSchoolType(type, countries.current)+" "+name;
 ge('schools_search_input').value = ge('schools_search_input')._old_value = name;
 setTitle('Search'+': '+name);
 schools.current = school;
 schoolsFilter(schools.offset);
 hide('schools_big_table'); 
 search_results.parent = school;
 search_results.year = 0;
 doSearchClassmates();
// ge('search_area').innerHTML = search_results.getBlock(0, search_results.per_page);
}   

function doSearchClassmates() {
 var y = "";
 if (search_results.year && search_results.year > 0) {
  y = ';y=' + search_results.year;
 } 
 setHash('search;s=' + search_results.parent + y);
 search_results.loaded = 0;
 search_results.offset = 0;
 search_results.num = 1e9;
 search_results.query = undefined;
 search_results.getting_block = 1;
 search_results.must_place_block = 'search_results';
 ge('search_results').innerHTML = search_results.getHeader() + "<div class='loading_block' style='padding-top:40px'><div class='loading_inner'></div></div>";
 search_results.loadList(0, search_results.pre_load+search_results.per_page);
}




function getCountry(country) {
 search_results.loaded = 0;
 search_results.offset = 0;
 search_results.num = 1e9;
 search_results.parent = country;
 search_results.getting_block = 1;
 search_results.must_place_block = 'search_area';
 countries.current = country;
 countriesFilter(countries.offset);
 ge('search_area').innerHTML = search_results.getHeader() + "<div class='loading_block'><div class='loading_inner'></div></div>";
 search_results.loadList(0, search_results.pre_load+search_results.per_page);
// ge('search_area').innerHTML = search_results.getBlock(0, search_results.per_page);
}   

function schoolsFilter(offset) {

 obj = ge('schools_search_input');
 if (!obj) {return;}
 var city = cities.current;

 schools.query = obj.value;
 schools.info = all_schools;
 schools.num = all_schools.length;

 if (!schools.query || schools.query == l_srcd) {
  schools.show(offset, schools.per_page);
  return;
 }

 schools.query = schools.query.toLowerCase();
 if (!schoolsList[city]) {
  schoolsList[city] = [];
 }

 if (!schoolsList[city].length) {
  var i, k = schools.num;
  for (i = 0; i < k; i++) {
   schoolsList[city][i] = schools.info[i][1].toLowerCase();
  }
 }

 var schools_found = [];
 var result_line = '';
 var i, k = schools.num;
 var position = -1;
 var q_length = schools.query.length;

 for (i = 0; i < k; i++) {        
  position = schoolsList[city][i].indexOf(schools.query);
  if (position != -1) {            
   result_line = schools.info[i][1];
   schools_found.push([schools.info[i][0], result_line, schools.info[i][2], schools.info[i][1]]);
  }
 }

 schools.info = schools_found;
 schools.num = schools_found.length;

 schools.show(0, schools.per_page);

}

function countriesFilter(offset) {
 obj = ge('countries_search_input');
 if (!obj) {return;}
 query = obj.value;

 countries.info = all_countries;
 countries.num = all_countries.length;

 if (!query || query == l_srcd) {
  countries.show(offset, countries.per_page);
  return;
 }

 query = query.toLowerCase();

 if (!countriesList.length) {
  var i, k = countries.num;
  for (i = 0; i < k; i++) {
   countriesList[i] = countries.info[i][1].toLowerCase();
  }
 }

 var countryItems = [];
 var countries_found = [];
 var result_line = '';
 var i, k = countries.num;
 var position = -1;
 var q_length = query.length;

 for (i = 0; i < k; i++) {        
  position = countriesList[i].indexOf(query);
  if (position != -1) {            
   result_line = countries.info[i][1];
//   result_line = result_line.substr(0, position) + "<span style='background-color:#E5E9EF'>" + result_line.substr(position, q_length) + "</span>" + result_line.substr(position+q_length);
//   result_line = result_line.substr(0, position) + ;
//   if (!countries.info[i][2]) {
    countries_found.push([countries.info[i][0], result_line, countries.info[i][2], countries.info[i][1]]);
//   }
  }
 }

 countries.info = countries_found;
 countries.num = countries_found.length;
 if (!getting_cities) 
  countries.show(0, countries.per_page);
 
}

function citiesFilter(do_filter) {

 if (!do_filter) {
  clearTimeout(cities_filter_timeout);
  cities_filter_timeout = setTimeout(function(){citiesFilter(true);}, 200);
  return;
 }

 query = ge('cities_search_input').value;
 query = query.toLowerCase();

 if (cities.query == query && do_filter != 2) { 
  return;
 }

 cities.query = query;

 cities.loaded = 0;
 cities.offset = 0;
 cities.per_page = 16;
 cities.parent = countries.current;
 cities.show(0, cities.per_page);
}

function focusSearch(obj) {
 if (obj.value == l_srcd) {
  obj.value = '';
 }
}

function deFocusSearch(obj) {
 if (obj.value == '') {
  obj.value = l_srcd;
 }
}

function focusSBN(obj) {
 if (obj.value == l_srcd) {obj.value = '';}
 if (obj.value) {
  searchByName();
 }
 obj.className='search_by_name_on';
}

function deFocusSBN(obj) {
 if (obj.value == '') {obj.value = l_srcd;}
 obj.className='search_by_name';
}

function countryFocusSearch(obj) {
 getting_cities = 0;
 if (obj.value == l_srcd) {
  obj.value = '';
 } else {
  obj.value = '';
  show('countries_big_table');
  query = "";
  countriesFilter(0);
 }
}

function countryDeFocusSearch(obj) {
  if (!obj._old_value) {
   obj.value = l_srcd;
  } else {
   obj.value = obj._old_value;
   if (!over_countries) {   
    hide('countries_big_table');
   }
  }
}

function citiesFocusSearch(obj) {
 if (obj.value == l_srcd) {
  obj.value = '';
 } else {
  obj.value = '';
  citiesFilter(2);
  show('cities_big_table');
  cities.query = "";
 }
}

function citiesDeFocusSearch(obj) {
// if (obj.value == '') {
  if (!obj._old_value) {
   obj.value = l_srcd;
  } else {
   obj.value = obj._old_value;
   if (!over_cities) {   
    hide('cities_big_table');
   }
  }
// }
}

function schoolsFocusSearch(obj) {
 if (obj.value == l_srcd) {
  obj.value = '';
 } else {
  obj.value = '';
  show('schools_big_table');
  schools.query = "";
  schoolsFilter(0);
 }
}

function schoolsDeFocusSearch(obj) {
  if (!obj._old_value) {
   obj.value = l_srcd;
  } else {
   obj.value = obj._old_value;
   if (!over_schools) {   
    hide('schools_big_table');
   }
  }
}


function photoOn() {
 this.className = "photo_cell_on";
}

function photoOff() {
 this.className = "photo_cell";
}

function photoSel() {
 this.className = "photo_cell_sel";
}


function getPhoto(i, mustFocus) {

 if (this.showing_photo == i)
  return;

 var ph = this.info[i];
 if (i < 0 || i >= this.loaded || ph == undefined) {
  return;
 }

 if (this.link) {
  var link_id = id;
  if (this.act == 'updates_photos') { 
   link_id = ph[0].split("_")[0];
  }
  setHash(link_id + ";" + this.link + "=" + ph[0]);
  if (username) {setTitle(username+": "+l_phot);}
 }

 this.deselectPhoto();
 this.showing_photo = i;

 var from = this.offset;
 if (i < from) {
  if (i >= from - this.per_page) {
   this.scrollLeft();
  } else {
   from = i - i % this.per_page;
   this.show(from, this.per_page);
  }
 } else if (i >= from + this.per_page) {
  if (i < from + 2*this.per_page) {
   this.scrollRight();
  } else {
   from = i - i % this.per_page;
   this.show(from, this.per_page);
  }
 }

 ph_id = ph[0];
 var url = ph[2];
 var caption = "#"+(i+1)+" of "+this.num;
 var owner = ph_id.split("_")[0]; 
 var photoHeader = "";

 if (id == this_id || is_friend && this_id == owner) {
  var photo_actions = "";
  if (this_id == owner) { 
   photo_actions += htmlHeaderButton(l_phde, "deletePhoto("+this.name+")");
  }
  photo_actions += htmlHeaderButton(l_phat, "beginTagging()");
  photoHeader = htmlPhotoHeaderExtended(caption, photo_actions); 
 } else {
  photoHeader = htmlPhotoHeader(caption);
 }

 phototags = [];
 if (ge('photoarea')) { ge('photoarea').onmouseout = null; }
 if (tagger_loaded) {
  if (ge('photoarea')) {
   removeEvent(ge('photoarea'), "mousemove", showTagsOnMove);	
  }
  tagpopup.onmouseover = tagpopup.onmouseout = tagpopup.onmousemove = null;
 } 

 if (ge('photo')) {
  ge('photo').onload = null;
 }

 var left = arrow('photo_left', this.name+'.previous();', '&#9668;', (i > 0 || this.loaded >= this.num) && this.num != 1);
 var right = arrow('photo_right', this.name+'.next();', '&#9658;', this.num != 1);

 ge('one_photo').innerHTML = photoHeader + htmlPhoto(url, this.name, left, htmlTags, right);
 ge('photoarea').onmouseout = hideTagPopup;

 if (tagger_loaded) {
  addEvent(ge('photoarea'), "mousemove", showTagsOnMove);	
  hide('tagpopup');
  initTagger();
 } else {
  attachScript('taggerscript', 'http://'+mainDomain+'/tagger.js?'+Math.random());
 }

 var photo = ge('ph'+i);
 if (photo != null) {
  photo.className = "photo_cell_sel";
  photo.onmouseover = photoSel;
  photo.onmouseout = photoSel;
 }

 this.showing_photo = i; 
 if (mustFocus) {
  moveTo('one_photo');
 }

 if (i < this.num-1) {
  imagePreload[50].src = this.info[i+1][2];
 }

 if (ge('photos_comments_inner_table')) {
  ge('photos_comments_inner_table').innerHTML = "";
 }

 photos_comments.ts = 0;
 photos_comments.offset = 0;
 photos_comments.num = 1e9;
 photos_comments.loaded = 0;
 photos_comments.parent = ph_id;
 photos_comments.deleted = new Array();
 photos_comments.getting_block = 1;
 photos_comments.must_place_block = 'wall';
 photos_comments.loadList(0, photos_comments.pre_load+photos_comments.per_page);
}

function deletePhoto(act) {
 ge('confirm_tag').innerHTML = photoDialog(l_phrd, "doDeletePhoto("+act.name+")", l_conf, "hide('confirm_tag')", l_canc);
 show('confirm_tag');
}

function doDeletePhoto(act) {
 doRequest("&act=delete_photo&photo="+ph_id, dummy);
 var i = act.showing_photo;
 if (act.info[i]) {
  var phid = act.info[i];
  act.info.splice(i,1);
  act.num--;
  act.loaded--;
  act.show(act.offset, act.per_page);
  ge('one_photo').innerHTML = "";
  hide('confirm_tag');
  if (act.act == 'photos' && i_am_tagged_here) {
   photos_with.delFromPhotos(i_am_tagged_here);
  }
  if (act.act == 'photos_with') {
   photos.delFromPhotos(i_am_tagged_here);
  }
 }
}

function delFromPhotos(i_am_tagged_here) {
 var i = this.findNByPhid(i_am_tagged_here);
 if (i !== false) {
  deletedTag = this.info[i];
  this.info.splice(i,1);
  this.num--;
  this.loaded--;
  refreshPhotosHeader();
 }  
}

function refreshPhotosHeader() {
 if (photos_with.on && ge(photos_with.act+'_block')) {
  photos_with.getting_block = true;
  var str = photos_with.getHeader();
  ge(photos_with.act+'_block').innerHTML = str.substr(49, str.length-55);
  photos_with.getting_block = false;
  photos_with.show(photos_with.offset, photos_with.per_page);
 } else if (ge(photos.act+'_block')) {
  photos.getting_block = true;
  var str = photos.getHeader();
  ge(photos.act+'_block').innerHTML = str.substr(44, str.length-50);
  photos.getting_block = false;
  photos.show(photos.offset, photos.per_page);
 }
}

function findNByPhid(phid) {
 if (!this || !this.info) {return;}
 for (var i = 0; i < this.num; i++) {
  if (this.info[i][0] == phid) {
   return i;
  }
 }
 return false;
}

function addToPhotosWith(ph_id) {
 var addPhoto = 0;
 var i = photos.findNByPhid(ph_id);
 if (i !== false) {
  addPhoto = photos.info[i];
 } else if (deleted_tag && deleted_tag[0] == ph_id) {
  addPhoto = deleted_tag;
 }
 if (addPhoto) {
  photos_with.info[photos_with.num] = addPhoto;
  photos_with.num++;
  photos_with.loaded++;
  refreshPhotosHeader();
 }
}

function getPhotoById(photo_id) {
 if (photos_with.on) {
  var pho = photos_with;
  photos_with.on = true;
 } else {
  var pho = photos;
  photos_with.on = false;
 }
 if (!pho.idToNum(photo_id)) {
  if (pho.loaded < pho.num) {
   need_to_find_photo_by_id = photo_id;
   pho.loadList(pho.loaded, pho.num - pho.loaded);
  }
 }
}

function idToNum(need_to_find) {
 if (need_to_find) {
  this.need_to_find = need_to_find;
 }
 var i, k = this.loaded, found = false;
 for (i = 0; i <= k; i++) {
  if (this.info[i] != undefined && this.info[i][0] == this.need_to_find) {
   this.getPhoto(i, true);
   found = true;
  }
 }
 if (!found && this.loaded < this.num) {
  this.loadList(this.loaded, this.num - this.loaded);
 } else {
  this.need_to_find = 0;
 }

}

function doShowPhotos(from, to_show) {

 var str = "<table>";
 var n;
 for (j = 0; j < to_show; j++) {
  if (j % 4 == 0) {
   str += "<tr>";
  }
  n = from+j;

  if (this.info[n] != undefined) {
   if (this.showing_photo == n) {
    str += "<td onmouseout=\"this.className='photo_cell_sel'\" onmouseover=\"this.className='photo_cell_sel'\" class=\"photo_cell_sel\" id=\"ph"+n+"\">";
   } else {
    str += "<td onmouseout=\"this.className='photo_cell'\" onmouseover=\"this.className='photo_cell_on'\" class=\"photo_cell\" id=\"ph"+n+"\">";
   }
   str += "<div class='photo_photo' onclick=\"javascript: "+this.name+".getPhoto("+n+", 1)\"><img src='"+this.info[n][1]+"'/></div></td>";
  } else {
    str += "<td style='display:none' class=\"photo_cell\">&nbsp;</td>";
  }
  if (j % 4 == 3) {
   str += "</tr>";
  }

 }
 str += "</table>";

 if (this.num == 0 && this.loaded > 0) {
  str = "<table><tr><td class='no_results'><div>"+l_noph+"</div></td></tr></table>";
 }             

 for (j = to_show; j < 2*to_show; j++) {
  if (this.info[from+j] != undefined) {
   if (need_to_preload_images > 0) {
    imagePreload[j-to_show].src = this.info[from+j][1];
   } else {
    images_to_preload.push(this.info[from+j][1]);
   }
  }
 }

 if (this.getting_block) {
  return str;
 } else {
  var block = ge(this.name + '_inner_rows');
  if (block) {
   block.innerHTML = str;
  }
 }

}

function deselectPhoto() {
 var photo_old = ge('ph'+this.showing_photo);
 if (photo_old != null) {
  photo_old.className = "photo_cell";
  photo_old.onmouseover = photoOn;
  photo_old.onmouseout = photoOff;
 }
 this.showing_photo = -1;
}

function applyHistoryItem(item) {

 switch (item[1]) {
  case 'del':
   for (var j=0; j < this.loaded; j++) {
    if (this.info[j] == undefined || (this.info[j] != undefined && this.info[j][0] == item[2][0])) {
     this.info.splice(j,1);
     this.num--;
     this.loaded--;
     this.changed = 1;
     deleted_msg++;
     break;
    }
   }
   break;
  case 'add':
   this.info.unshift(item[2]);
   this.num++;
   this.loaded++;
   this.changed = item[2][0];
   break;
  case 'read':

   for (var j=0; j < this.loaded; j++) {
    if (this.info[j] != undefined && this.info[j][0] == item[2][0]) {
     this.info[j][5] = 1;

// if you repair highlight comment this.changed
//     highlight(this.info[j][0]);

     this.changed = 1;
     break;
    }
   }
   break;
  case 'undel':
   var wid = item[2][1];
   var j = 0;
   for (j = 0; j < this.loaded && this.info[j] != undefined && this.info[j][1] > wid; j++) {}
   if (this.info[j] != undefined && j < this.loaded && this.info[j][1] == wid) {return false;}
   this.info.splice(j,0,item[2]);
   this.num++;
   this.loaded++;
   this.changed = 1;
   break;
  default:
   return false;
 }
 return true;
}

function focusArea(el) {
 el.parentNode.style.backgroundColor = '#E5E9EF';
 el.style.height = '80px';
 if (el.value == l_ymsg || el.value == l_amsg) {
  el.value = '';
 }
 ge(el.id+'_button').style.display = 'block';
 el.name = 'focused';
}

function blurArea(el) {
 if (ge(el.id+'_button').name != 'on' && (overX !== true)) {
  if (el.value.length == 0 || el.value == l_ymsg) {
   el.parentNode.style.backgroundColor = '#FFF';
   el.style.height = '19px';
   if (el.value == '') {
    el.value = l_ymsg;
   }
   ge(el.id+'_button').style.display = 'none';
   el.name = '';
  }
 }
}

function overArea(el) {
 el.parentNode.style.backgroundColor = '#E5E9EF';
}

function outArea(el) {
 if (el.name != 'focused' && el.value != '') {
  el.parentNode.style.backgroundColor = '#FFF';
 }
}

function firstRefresh() {
 refr = setInterval("refresh()", 1000);
}


function getHistoryInterval(now) {
 if (now-last_profile < 15000) {
  return 10000;
 }
 if (now-last_history_update < 30000) {
  return 3000;
 }
 if (now-last_profile > 120000) {
  return 30000;
 }
 return 5000;
}

function refresh() {

 var now = unixtime();

 if (getHistoryInterval(now) + last_history > now && !first_load) {
  return;
 }

 var objs = new Array();

 if (logging != 1) {
  if (photos.showing_photo == -1 && photos_with.showing_photo == -1) {
   if (wall.loaded && cur_tab.substr(0,4) == 'page') {
    objs.push(wall);
   }
  } else {
   if (photos_comments.loaded) {
    objs.push(photos_comments);
   }
  }
 }

 if (cur_tab == "updates") {
  objs.push(updates_activity);
  objs.push(updates_friends);
  if (updates_photos.on) {
   objs.push(updates_photos);
  }
  if (updates_tagged_photos.on) {
   objs.push(updates_tagged_photos);
  }
 }

 if (activity.loaded != 0) {
  objs.push(activity); 
 }

 objs.push(message);
 loadHistory(objs);
 last_history = now;
}



function deleteMessage(wid) {
 var params = '&act=del_'+this.act+'&id='+id+'&wid='+wid+'&ts='+this.ts;
 var req = createRequest(params, delMessageSuccess);
 req.list = this;
 req.wid = wid;
 sendRequest(req);
}

function sendFailed(a,b) {
}

function restoreMessage(wid) {
 var params = '&act=restore_'+this.act+'&id='+id+'&wid='+wid+'&ts='+this.ts;
 if (this.parent != undefined) {
  params += "&parent="+this.parent;
 }
 var req = createRequest(params, restoreSuccess);
 req.list = this;
 req.wid = wid;
 sendRequest(req);
}

function restoreSuccess(d) {

 var wid;

 if (d.ok == 1) {
  wid = this.list.deleted.pop();
 }

 if (d.h != undefined) {
  this.list.applyHistory(d.h);
 }

 if (d.ok == 1) {
  if (wid.indexOf("_")) {
   var broken = wid.split("_");
   wid = broken[1];
  }
  while (this.list.offset > 0 && wid > this.list.info[this.list.offset][0]) {
   this.list.changed = 1;
   this.list.offset -= this.list.per_page;
  }
  if (this.list.offset < 0) {
   this.list.offset = 0;
  }
  while (this.list.offset + this.list.per_page < this.list.num && wid <= this.list.info[this.list.offset+this.list.per_page][0]) {
   this.list.changed = 1;
   this.list.offset += this.list.per_page;
  }
  if (this.list.changed) {
   this.list.show(this.list.offset, this.list.per_page);
  }
  highlight(wid);
 }
}

function delMessageSuccess(d) {
 deleted_msg = 0;
 if (d.h != undefined) {
  this.list.applyHistory(d.h);
 }
 if (d.ok == 1) {
  if (deleted_msg) {
   overX = false;
   this.list.deleted.push(this.wid);
   this.list.show(this.list.offset, this.list.per_page);
  }
 }
}

function sendMessage() {
 if (sending_msg != 1) {
  var message = ge(this.act+'_add').value; 
  if (message.length) {
   var params = '&act=add_'+this.act+'&id='+id+'&ts='+this.ts+'&message='+encodeText(message);
   if (this.parent != undefined) {
    params += "&parent="+this.parent;
   }
   var req = createRequest(params, sendSuccess);
   req.list = this;
   req.message = message;
   req.processMessageHistory = processMessageHistory;
   req.listSuccess = listSuccess;
   sendRequest(req);
   sending_msg = 1;
   setTimeout("sending_msg = 0;", 3000);
  }
 }
}

function encodeText(msg) {
 return msg.replace(/\n/g,"%0A").replace(/&/g,"%26").replace(/\+/g,"%2B").replace(/\#/g,"%23");
}

function sendSuccess(d) {

 if (!processErrors(d.ok, this)) {
  return;
 }

 if (d.h != undefined) {
  if (this.list.act != 'message') {
   this.list.applyHistory(d.h);
  } else {
   this.processMessageHistory(d.h);
  }
 }

 sending_msg = 0;

 if (d.ok == 1) {
  if (this.list.changed) {
   var added = this.list.changed;
   this.list.show(0, this.list.per_page);   
   ge(this.list.act+'_add').value = '';
   ge(this.list.act+'_add').focus();
   if (this.list.act == 'photos_comments' || this.list.act == 'wall') {
    highlight(added);
   }
  }
 }

 if (this.list.act == 'message') {
  ge('message_add').value = "";
 }

}

function highlight(wid) {
/*
   if (ge('wid'+wid) != null) {
    ge('wid'+wid).style.backgroundColor = '#DEE3EC';
   }

   for (var i = 1; i <= 36; i++) {
    var color = "#"+(0xDE+i).toString(16)+(0xE3+Math.floor(i*5/6)).toString(16)+(0xEC+(i>>1)).toString(16);
    setTimeout("if (ge('wid"+wid+"') != null) {ge('wid"+wid+"').style.backgroundColor = '"+color+"'}", 500+i*50);
   }
   setTimeout("if (ge('wid"+wid+"') != null) {ge('wid"+wid+"').style.backgroundColor = ''}", 500+37*50);
*/
}


function wallXOver(i) {
 overX = true; ge('wallUserName'+i).className = 'msg_head_on';
}

function wallXOut(i) {
 overX = false; ge('wallUserName'+i).className = 'msg_head';
}

function doShowComments(from, to_show) {

 var str = "";
 var writing = false;
 var info = this.info;
 var restore = "";
 var add_button = 0;
 var table_style = this.minimized == 1 ? "minimized" : "normal";

 if (from == 0 && this.parent != -1 && this.parent != -2 && !this.privacy) {
  var msg = ge(this.act+'_add');  
  if (msg != null && msg.parentNode.id == id && (msg.name == 'focused' || msg.value.length > 0) || (msg && msg.value != l_ymsg) || (sending_msg)) {
   writing = true;
  } else {
   str += "<div id='table"+id+"' class='"+table_style+"' style='text-align:center;margin:0px'><textarea id='"+this.act+"_add' title='Ctrl+Enter' name='' class='add_comm' onfocus='focusArea(this);' onblur='blurArea(this);' onmouseover='overArea(this);' onmouseout='outArea(this);' onkeypress=\"if (event.keyCode==10 || (event.ctrlKey && event.keyCode==13)) {"+this.act+".send();}\">"+l_ymsg+"</textarea></div>"
   + "<div class='addButton' onmouseover=\"this.name='on';this.className='addButtonOn'\" onmouseout=\"this.name='off';this.className='addButton'\" id='"+this.act+"_add_button' name='over' onclick='"+this.act+".send();' style='display:none' title='Ctrl+Enter'>"+l_acom+"</div>";
  }  
 }

 if (!writing) {
  str += "<div id='"+this.act+"_inner_table'>";
 }

 if (this.deleted.length > 0) {
  var last_id = this.deleted[this.deleted.length-1];
  if (from == 0 && (this.parent == undefined || this.parent != undefined && this.parent != -1 && this.parent != -2)) {
   str += "<div class='cancelButton' style='display:block;border-width: 1px 0px;' onmouseover=\"this.className='cancelButtonOn'\" onmouseout=\"this.className='cancelButton'\" onclick=\""+this.act+".restore('"+last_id+"')\"><span>"+l_rcom+"</span></div>";
  } else {
   str += "<div class='cancelButton' style='display:block;border-width: 0px 0px 1px 0px' onmouseover=\"this.className='cancelButtonOn'\" onmouseout=\"this.className='cancelButton'\" onclick=\""+this.act+".restore('"+last_id+"')\"><span>"+l_rcom+"</span></div>";
  }
 }

 str += this.num > 0 ? "<table class='"+table_style+"'>" : "<table class='"+table_style+"' style='display:none'>";

 for (j = 0; j < to_show; j++) {
  var comm = info[from+j];
  if (comm) {
   str += this.getComment(from, j, comm);
  }  
 }

 str += "</table>";

 if ((this.parent == -1 || this.parent == -2) && this.num == 0) {
  str += "<table><tr><td class='no_results'>"+l_noco+"</td></tr></table>";
 }

 if (this.offset + this.per_page < this.num && this.loaded > 0) {
  str += "<div class='down' onmouseover=\"this.className='down_on'\" onmouseout=\"this.className='down'\" onclick='"+this.act+".down()'><div>&#9660;</div></div>";
 }

 var k = 2*to_show;
 for (j = to_show; j < k; j++) {
  if (info[from+j] != undefined) {
   if (need_to_preload_images > 0) {
    if (imagePreload[j-to_show] != undefined) {
     imagePreload[j-to_show].src = info[from+j][3][2];
    }
   } else {
    images_to_preload.push(info[from+j][3][2]);
   }
  }
 }

 if (deselected == 1) {
  deselected = 0;
 }
                     
 if (this.getting_block) {
  return str;
 } else {
  if (ge('wall')) {
   ge('wall').style.height = "";
  }
  if (!writing) {
   str += "</div>";
   try {ge(this.act+'_inner_rows').innerHTML = str;} catch(e) {
//    alert(this.act+'_inner_rows');
   }
  } else {
   try {ge(this.act+'_inner_table').innerHTML = str;} catch(e) {
//    alert(this.act+'_inner_table');
   }
  }
 }

}


function getComment(from, j, comm) {

var d = new Date(comm[1]*1000);
//d.setTime();
//var date = d.toLocaleString();
var date = numericDate(d);
var str = "";
var photo = "";
var del = "";
var msg = "";
var txt = comm[2][0];
var pic = comm[3][2];
var online = comm[3][5] ? "<span class='online_mess'>"+l_onli+"</span>" : "";
var msg_style = 'mess_off';

if (this.minimized == 1) {
 var photo_sm = comm[3][3];
 if (photo_sm == '0') {
  pic = "http://vkontakte.ru/images/no50.gif";
 } else {
  photo_sm += ".jpg";
  pic = pic.substr(0, pic.lastIndexOf("/") + 1) + photo_sm;
 }
} else {
 if (pic == '0') {
  pic = "http://vkontakte.ru/images/no100.gif";
 }
}

if (comm[4][0] == this_id || comm[3][0] == this_id) {
 del = "<td class='delX' onmouseover=\"overX = true; var x = this.parentNode.parentNode.parentNode.parentNode; x.className = 'msg_head_on';\" onmouseout=\"overX = false; var x = this.parentNode.parentNode.parentNode.parentNode; x.className = 'msg_head';\" onclick=\""+this.act+".del('"+comm[4][0]+"_"+comm[0]+"')\" id='delX"+(from+j)+"'>X</td>";
}

if (this.parent == -1 || this.parent == -2) {
switch(this.parent) {
 case -1:
  var photos_name = "photos";
  break;
 case -2:
  var photos_name = "photos_with";
  break;
}

 msg = "</td></tr><tr><td id='wid"+comm[0]+"'><div class='text_cnt' style='width:345px; padding-left:5px'>"+txt+"</div>";
 msg_style = 'mess_off_photos'; 
 photo = "<td><div class='thumb' onmouseover=\"this.className='thumb_on'\" onmouseout=\"this.className='thumb'\" onclick=\""+photos_name+".idToNum('"+comm[4][0]+"_"+comm[7][0]+"');\"><img class='photo_msg' src='"+comm[7][1]+"'></div></td>";
} else {
 msg = "</td></tr><tr><td id='wid"+comm[0]+"' class='message'><div class='text_cnt'>"+txt+"</div>";
}

return  "<tr><td class='photo_cnt' style=\"background-image:url('"+pic+"');\" onclick='getPage(" + comm[3][0] + ");' id=\"" + this.act + (from+j) + "\"></td></a><td class='"+msg_style+"'><table style='width:100%'><tr><td id='wallUserName" + (from+j) + "' class='msg_head'><table style='width:100%'><tr><td style='width:50%; text-align:left'>" + comm[3][1] + online + "</td><td style='text-align:right'>" + date + "</td>" +
del + "</tr></table>" + msg + "</td></tr></table></td>" + photo + "</tr>";

}


function doShowMessages(from, to_show) {

 if (!this.getting_block && (
    (!showing_textarea && !ge(this.act+'_inner_rows')) || (showing_textarea && !ge(this.act+'_inner_block')) 
    )) {
  return;
 }

 var str = "";

 if (ge('message_inner_block') != null && this.act == 'message') {
  var showing_textarea = 1;
 } else {
  var showing_textarea = 0;
 }

 if (showing_textarea == 0 && this.act == 'message') {
  str += "<div id='message_text' style='text-align:center;margin:0px;background:#E5E9EF'><textarea style='height:80px' id='message_add' title='Ctrl+Enter' name='' class='add_comm' onkeypress=\"if (event.keyCode==10 || (event.ctrlKey && event.keyCode==13)) {message.send();}\"></textarea></div><div class='addButton' onmouseover=\"this.name='on';this.className='addButtonOn'\" onmouseout=\"this.name='off';this.className='addButton'\" id='message_add_button' style=\"display:block\" name='over' onclick='message.send();' title='Ctrl+Enter'>"+l_smsg+"</div>";
  str += "<div id='message_inner_block'>";
 }

 if (this.deleted.length > 0) {
  var last_id = this.deleted[this.deleted.length-1];
  if (this.act == 'message') {
   str += "<div class='cancelButton' style='display:block' onmouseover=\"this.className='cancelButtonOn'\" onmouseout=\"this.className='cancelButton'\" onclick=\""+this.act+".restore('"+last_id+"')\"><span>"+l_rmsg+"</span></div>";
  } else {
   str += "<div class='cancelButton' style='display:block; border-top:0px' onmouseover=\"this.className='cancelButtonOn'\" onmouseout=\"this.className='cancelButton'\" onclick=\""+this.act+".restore('"+last_id+"')\"><span>"+l_rmsg+"</span></div>";
  }
 }

 var table_style = this.minimized == 1 ? "minimized" : "normal";
 str += this.num > 0 ? "<table class='"+table_style+"'>" : "<table class='"+table_style+"' style='display:none'>";

 for (j = 0; j < to_show; j++) {
  var w = this.info[from+j];
  if (w != undefined) {
   str += this.getMessage(from, j, w);
  }  
 }

 str += "</table>";

 if (this.offset + this.per_page < this.num) {
  str += "<div class='down' onmouseover=\"this.className='down_on'\" onmouseout=\"this.className='down'\" onclick='"+this.act+".down()'><div>&#9660;</div></div>";
 }

 if (showing_textarea == 0 && this.act == 'message') {
  str += "</div>";
 }

 if (readMsgs.length) {
  last_history_update = unixtime();
 }

 if (this.getting_block) {
  return str;
 } else {
  if (showing_textarea == 0) {
   ge(this.act+'_inner_rows').innerHTML = str;
  } else {
   ge(this.act+'_inner_block').innerHTML = str;
  }
  if (this.act == 'message' && this.per_page < 20) {
   try {ge('message_add').focus();} catch(e) {}
  }
 }

}

function getMessage(from, j, w) {

var d = new Date(w[1]*1000);
//var date = d.toLocaleString();
var date = numericDate(d);

var str = "";
var txt = w[2][0];
if (this.act == 'outbox') {
 var online = w[4][5] ? "<span class='online_mess'>"+l_onli+"</span>" : "";
 var pic = w[4][2];
} else {
 var online = w[3][5] ? "<span class='online_mess'>"+l_onli+"</span>" : "";
 var pic = w[3][2];
}

if (this.minimized == 1) {
 var photo_sm = (this.act == 'outbox') ? w[4][3] : w[3][3];
 if (photo_sm == '0') {
  pic = "http://vkontakte.ru/images/no50.gif";
 } else {
  photo_sm += ".jpg";
  pic = pic.substr(0, pic.lastIndexOf("/") + 1) + photo_sm;
 }
 if (this.act != "message") {
  txt = txt.replace(/<br>/g," ");
  if (txt.length > 100) {
   txt = txt.substr(0, 70)+"...";
  }
 }
} else {
 if (pic == '0') {
  pic = "http://vkontakte.ru/images/no100.gif";
 }
}

str += "<tr>";

if (this.act != 'outbox') {
 str += "<td class='photo_cnt' id=\""+this.act+(from+j)+"\" style=\"background-image:url('"+pic+"');\" onclick='getPage(" + w[3][0] + ")' ></td>";
 if (this.act == 'message') {
  str += "<td class='mess_off'><table style='height:100%'><tr><td id='wallUserName"+(from+j)+"' class='msg_head'>";
 } else {
  str += "<td class='mess' onmouseover='messageOn("+(from+j)+","+w[0]+");' onmouseout='messageOut("+(from+j)+","+w[0]+");' onclick=\"openChat(';"+w[3][0]+"',"+from+","+j+")\"><table style='height:100%'><tr><td id='wallUserName"+(from+j)+"' class='msg_head'>";
 }
 str += "<table style='width:100%'><tr><td style='width:50%; text-align:left;'>"+w[3][1]+online+"</td><td style='text-align:right'>"+date+"</td>";
} else {
 str += "<td class='photo_cnt' id=\""+this.act+(from+j)+"\" style=\"background-image:url('"+pic+"');\" onclick='getPage(" + w[4][0] + ")' ></td>";
 str += "<td class='mess' onmouseover='messageOn("+(from+j)+","+w[0]+");' onmouseout='messageOut("+(from+j)+","+w[0]+");'  onclick=\"openPageChat("+w[4][0]+")\"><table style='height:100%'><tr><td id='wallUserName"+(from+j)+"' class='msg_head'>";
 str += "<table style='width:100%'><tr><td style='width:50%; text-align:left;'>"+w[4][1]+online+"</td><td style='text-align:right'>"+date+"</td>";
}
str += "<td class='delX' onmouseover=\"overX = true; var x = this.parentNode.parentNode.parentNode.parentNode; x.className = 'msg_head_on';\" onmouseout=\"overX = false; var x = this.parentNode.parentNode.parentNode.parentNode; x.className = 'msg_head';\" onclick=\""+this.act+".del('"+w[3][0]+"_"+w[0]+"')\" id='delX"+(from+j)+"'>X</td>";
str += "</tr></table>";
if (w[5] > 0) {
 var style = "";
} else {
 var style = "background-color:#DEE3EC;";
 if (w[4][0] == this_id && (this.minimized == 0 || this.act == 'message')) {
  readMsgs.push(w[0]); 
 }
}

str += "</td></tr><tr><td id='wid"+w[0]+"' style='"+style+"' class='message'><div class='text_cnt'>"+txt+"</div>";
str += "</td></tr></table></td>";
str += "</tr>";

return str;
}

function messageOn(i, wid) {
 if (!overX) {
  ge('wallUserName'+i).className='msg_head_on';
  ge('wid'+wid).className='message_on';
 }
}

function messageOut(i, wid) {
 ge('wallUserName'+i).className='msg_head';
 ge('wid'+wid).className='message';
}

function arrOn() {
 this.className = "arr_on";
}

function arrOff() {
 this.className = "arr_off";
}

function arr() {
 this.className = "arr";
}

function shide(tag, cond) {
  var o = ge(tag);
  if (!o) {
   return;
  }
  if (cond && vals[tag]) {
   o.className = "arr";
   o.onmouseover = arrOn;
   o.onmouseout = arr;
   vals[tag] = 0;
   o.innerHTML = vals[tag+"inner"];
  } else if (!cond && !vals[tag]) {
   o.className = "arr_off";
   o.onmouseover = arrOff;
   o.onmouseout = arrOff;
   vals[tag] = 1;
   vals[tag+"inner"] = o.innerHTML;
   o.innerHTML = "";
  }

}


function arrow(tag, func, arrowSymbol, cond) {
 var str = '';
 if (cond) {
  vals[tag] = 0;
  str = htmlArrowEnabled(tag, func, arrowSymbol);
 } else {
  vals[tag] = 1;
  vals[tag+"inner"] = arrowSymbol;
  str = htmlArrowDisabled(tag, func);
 }
 return str;
}

function showHide(tag, cond) {

  if (cond && vals[tag]) {
   show(tag);
   vals[tag] = 0;
  } else if (!cond && !vals[tag]) {
   hide(tag);
   vals[tag] = 1;
  }

}

function findY(obj) {
 if (!obj) return;
 var curtop = 0;
  do {
   curtop += obj.offsetTop;
  } while (obj = obj.offsetParent);
  return curtop;
}

function listSuccess(data) {

 document.body.style.cursor = "default";
 if (!processErrors(data.ok, this)) {
  return;
 }

 var t = this.list;

 var d = data;
 if (data.d) {
  d = data.d;
 }
 if (data.h) { t.applyHistory(data.h); }

 if (t && t.act && t.act == 'photos_comments') {
  if (data.parent != -1 && data.parent != -2 && data.parent != ph_id) {
   return;
  }

  if (data.author && data.author[0] != id) {
   var pa = ge('photo_author');
   if (pa) pa.innerHTML = l_uplb+" <a href='javascript:getPage("+data.author[0]+");'>"+data.author[1]+"</a>";
  } 

  if (data.tags && !t.offset) {
   phototags = data.tags;
   if (tagger_loaded) {
    if (ge('photo') && ge('photo').height > 30) {
     createPhotoTags();
    }
   }
   if (data.new_tag) {
    ge('confirm_tag').innerHTML = photoDialog("<a href='javascript:getPage(" + data.new_tag[1] + ");'>" + data.new_tag[2] + "</a> has tagged you on this photo.", "confirmTag("+ data.new_tag[0] +")", l_cont, "declineTag("+ data.new_tag[0] +")", l_dect);
    show('confirm_tag');
   }
  }
 }

 if (t && t.act && t.act == 'cities' && this.query != cities.query) {
  return;
 }

 if (t && t.act && t.act == 'search_results') {
  if (data.details) {
   gotSearchDetails(data.details);   
  }
  showAddSchool(data.belongs);
 }

 if (!t) return;

 if (t.act && t.act == 'schools') {
  schools.show_pending = false;
  all_schools = d;
 } 

 if (data.n != undefined) {t.num = data.n;}

 for (i = this.from; i < this.to; i++) {
  t.info[i] = d[i - this.from];
 }

 if (t.loaded < this.to) {
   t.loaded = this.to;
 }

 this.list = null;
 this.destroy();

 if (t.getting_block) {  
  t.getBlock(t.offset, t.per_page);
  return;
 }

 if (t.show_pending && t.pending_from + t.pending_to_show <= t.loaded) {
  t.show_pending = 0;
  t.show(t.pending_from, t.pending_to_show);
 } else if (t.changed) {
  t.changed = 0;
  t.show(t.offset, t.per_page);
 }

 if (t.need_to_find.length > 1) {
  t.idToNum();
 }
}

function isSelfTag(tid) {
 if (!phototags) {return}
  for (i = 0; i < phototags.length; i++) {
  var tag = phototags[i];
  if (tag.tid == tid && tag.id == this_id) {
   return true;
  }
 }
 return false;
}

function createPhotoTags(noEvent) {
 var tags_result = [];
 var i = 0, show_box = "", del_tag = "";
 if (!ge('photo_tags')) {return;}
 for (i = 0; i < phototags.length; i++) {
  var tag = phototags[i];
  if (!tag.processed) {
   tag.processed = true;
   tag.x1 = tag.x1 * paCoords[2] / 100.0;
   tag.y1 = tag.y1 * paCoords[3] / 100.0;
   if (tag.x2 > 0) {
    tag.x2 = tag.x2 * paCoords[2] / 100.0;
    tag.y2 = tag.y2 * paCoords[3] / 100.0;
   } else {
    tag.x1 = Math.max(0, tag.x1 - 83);
    tag.y1 = Math.max(0, tag.y1 - 83);
    tag.x2 = Math.min(paCoords[2], tag.x1 + 166);
    tag.y2 = Math.min(paCoords[3], tag.y1 + 166);
   }
  }
  show_box = "onmouseover='showTagBox("+tag.x1+","+tag.y1+","+tag.x2+","+tag.y2+")' onmouseout='hideTagBox();'";
  del_tag = '';
  if (tag.placer_id == this_id || tag.id == this_id || ph_id.split("_")[0] == this_id) {
   del_tag = "<span class='delTag' alt='"+l_del+"' title='"+l_del+"' onmouseover=\"this.className='delTagOn'\" onmouseout=\"this.className='delTag'\" onClick='deleteTagWrapper("+tag.tid+");'>X</span>";
   i_am_tagged_here = tag.id == this_id ? ph_id : 0;
  }
  if(tag.id > 0) {
   tags_result.push('<span ' + show_box + '><a href="#" onClick="getPage('+ tag.id +');return false;">' + tag.name + '</a>' + del_tag +'</span>');
  } else {
   tags_result.push('<span ' + show_box + '>' + tag.name + del_tag + '</span>');
  }
 }

 htmlTags = photo_desc + tags_result.join(", ");
 ge('photo_tags').innerHTML = htmlTags;
 if (!noEvent) {
  addEvent(ge('photoarea'), "mousemove", showTagsOnMove);	
 }
}



function showTagBox(x1, y1, x2, y2) {
 if (!tagger.isTfShown()) {
  ge('taggerDecor1').className='decor1';
  tagger.recorrect(2);
  tagger.showBoxAt(x1, y1, x2, y2);
 }
}

function hideTagBox() {
 ge('taggerDecor1').className='';
 tagger.recorrect(1);
 tagger.hideBox(false, true);
}

function deleteTagWrapper(tid) {
 tagger.hideBox(false, true); 
 ge('taggerDecor1').className='';
 tagger.recorrect(1);
 deleteTag(tid);
}
 
function destroy() {
 if (reqs[this.num]) {
  reqs[this.num].running = 0;
 }
}

function moveTo(obj) {
 var y = findY(ge(obj));
 window.scrollTo(0, y);
}

function getCookie(name) {
 var prefix = name + "="
 var start_ind = document.cookie.indexOf(prefix)
 if (start_ind == -1) return null;
 var end_ind = document.cookie.indexOf(";", start_ind + prefix.length)
 if (end_ind == -1) end_ind = document.cookie.length;
 return unescape(document.cookie.substring(start_ind + prefix.length, end_ind))
}

function deleteCookie(name) {
 document.cookie = name + "=;domain=" + mainDomain + ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}

function initTagger(shouldntonload) {
 var photo = ge('photo');
 if (photo.height > 30) {
  doInitTagger();
 } else {
  if (!shouldntonload) {
   photo.onload = function(){
    var _ph_id = ph_id;
    return function(){ if (_ph_id == ph_id) {initTagger(true);} };
   }();
  }
 }
}


function doneMyFriends(d) {
 my_friends = d['my_friends_data']; 
 var i, k = my_friends.length;
 for (i = 0; i < k; i++) {
  my_friends_lc[i] = my_friends[i][1].toLowerCase();
 }
 ge('friendsList').innerHTML = filterList();
}

function beginTagging() {

 if (!my_friends.length) {
  doRequest("&act=data&my_friends=1", doneMyFriends);
 }
 if (tagger_loaded) {
  old_click = ge('show_photo').onclick;
  hide('tagpopup');
  ge('show_photo').onclick = null;
  removeEvent(ge('photoarea'), "mousemove", showTagsOnMove);	
  ge('show_photo').style.cursor = 'crosshair';
  tagger.beginTagging();
  return false;
 }
}

function endTagging() {
// ge('instructions').style.display = 'none';
 ge('show_photo').onclick = old_click;
 tagger.endTagging(); 
 ge('show_photo').style.cursor = '';
 hide('myFriendsBox');
 addEvent(ge('photoarea'), "mousemove", showTagsOnMove);	
 return false;
}

function hideTagPopup() {
 if (window.tagTimerId !== undefined)
  tagTimerId = setTimeout(function(){hide('tagpopup'); currentTagPopup = null;}, 50);
}

function changeActivity(no_activity) {
 editing_activity = 1;
 clearTimeout(activity_blur_timeout);
 var activity_editor_input = ge('activity_editor_input');
 if (!no_activity) {
  activity_editor_input.value = ge('activity_text').innerHTML.replace(/&amp;/, "&");
 }
 ge('activity_block').style.visibility = 'hidden';
 show('activity_editor');
 activity_editor_input.focus();	
 activity_editor_input.select();	
 return false;
}

function submitActivity(value, no_blur) {
  var activity_editor_input = ge('activity_editor_input');
  if (activity_editor_input && activity_editor_input._ignoreblur) { 
   activity_editor_input._ignoreblur = false;
   return; 
  }
  var activity_text = ge('activity_text');
  if (value.length > 0 && activity_text.innerHTML != value) {
   doRequest("&act=set_activity&text="+value.replace(/&/, "%26"), dummy);
   switch(value.substr(-1)) {
    case ".": case "!": case "?": case ",": break;
    default: value += ".";
   }
  }
  cached_profiles[-1].actv[4] = new Date() / 1000;
  cached_profiles[-1].actv[5] = value;
  showProfileActivity(cached_profiles[-1].actv);

  if (!no_blur) {
   activity_editor_input._ignoreblur = true;
   activity_editor_input.blur();
  }

  editing_activity = 0;
  if (need_refresh_profile) {
   gotRefreshProfile(need_refresh_profile);   
   need_refresh_profile = false;
  }
}

function deleteActivity() {
 ge('activity_editor_input')._ignoreblur = false;
 clearTimeout(activity_blur_timeout);
 doRequest('&act=clear_activity', dummy);
 submitActivity("", true);
}


function gotActivity(d) {
 var el = ge('activity_text');
 if (el) {
  el.innerHTML = d.text;
 }
}

function showActivityHistory() {
  if (activity.loaded) {
   if (hideIfShown('activity_area') == false) {
    showIfHidden('activity_area');
   }
   return false;
  }
  activity.must_place_block = 'activity_area';
  activity.getBlock(0, activity.per_page);
  ge('activity_inner_rows').innerHTML = "<div class='loading_block' style='width:670px;padding:30px 15px 0 15px;'><div class='loading_inner'></div></div>";
  return false;
}

function showProfileActivity(actv, getting_str) {

 var str = "";
 var activity_text = activity_time = clear_activity_style = "";
 var change_activity_style = 'display: none;';
 var activity_action = "onclick='return showActivityHistory();'";

 if (!actv[5]) {
  if (this_id == id) {
   activity_text = "<a href='#' onClick='return changeActivity(true);' style='color: gray;'>"+l_swha+"</a><div style='height:8px; font-size:1px; line-height:10px'></div>";
   activity_action = "";
  } else {
   activity_text = "";
  }
  activity_time = "";  
  clear_activity_style = "display: none";
 } else {
  activity_text = actv[5];
  activity_time = new Date(actv[4] * 1000);
  activity_time = l_supd+" "+numericDate(activity_time);
  if (id == this_id) {
   change_activity_style = "";
  }
 }

 str = "<div id='activity_editor' style='display: none;'>" +
     "<input id='activity_editor_input' onBlur='var val=this.value;activity_blur_timeout=setTimeout(function(){submitActivity(val, true);}, 100);' onkeypress='if (event.keyCode==13) submitActivity(this.value); else if (event.keyCode==27) showProfileActivity(cached_profiles[-1].actv);' type='text'/>" +
     " <a href='#' id='clear_activity_link' style='"+clear_activity_style+"' onClick='return deleteActivity();'>"+l_sdel+"</a></div>" + 
     "<div id='activity_block'><div><span id='activity_text' "+activity_action+">" + activity_text + "</span>" +" <a href='#' id='edit_activity_link' style='"+change_activity_style+"' onClick='return changeActivity();'>"+l_sedi+"</a></div>" +
 "<span id='activity_time' onclick='return showActivityHistory();' style='color: gray'>"+ activity_time +"</span></div>";

 if (getting_str) {
  return str;
 } else {
  if (ge('activity_menu')) {
   ge('activity_menu').innerHTML = str;
  }
 }

}

function updatesTab(d) {

 setHash('news');
// ge('hifr').src = 'blank.html?#news';
 cur_tab = 'news';
 id = 0;
 setTitle(l_news);

 getTabs();

 showIfHidden('updates_area');
 hideIfShown('main');
//if (window.gagaga)
// return;
 hideIfShown('messages');
 hideIfShown('search_area');

 if (d) {
  updates_activity.saveInfo(d.updates_activities, 43);
  updates_friends.saveInfo(d.updates_friends, 25);
  updates_photos.saveInfo(d.updates_photos, 36);
  updates_tagged_photos.saveInfo(d.updates_tagged_photos, 36);
  if (updates_activity.num) {
   str = updates_activity.getBlock(updates_activity.offset, updates_activity.per_page);
  }
  if (updates_friends.num) {
   str += updates_friends.getBlock(updates_friends.offset, updates_friends.per_page);
  }
  if (updates_photos.num) {
   str += updates_photos.getBlock(updates_photos.offset, updates_photos.per_page);
  }
  str += htmlPhotoCont() + "<div id='wall'></div>";
  updates_photos.on = true;
  ge('updates_area').innerHTML = str;
  this.destroy();
 }

 setTimeout("ge('main').innerHTML = ''", 100);

 if (updates_activity.loaded == 0) {
  doRequest("&act=data&updates_activities=43&updates_friends=25&updates_photos=36&updates_tagged_photos=36", updatesTab);
  ge('updates_area').innerHTML = "<div style='padding: 30px 15px 0; width: 670px; margin-bottom: -20px;' class='loading_block'><div class='loading_inner'></div></div>";
  return;
 }


}

function doShowUpdatesActivity(from, to_show) {

 var str = "";
 var style = "";
 var pic = "";
 var table_style = "normal activitiesRows";
 var per_line = 5;
 var info = this.info;
 var cur_info = 0;
 var cur_date = 0;


 str += "<table class='"+table_style+"' style='width: 100%'>";
 for (j = 0; j < to_show; j++) {
  cur_info = info[from+j];
  if (cur_info) {
   cur_date = new Date(cur_info[4] * 1000);
   if (this.act == 'activity') {
    str += "<tr><td class='updates_date'><div style='padding:0px 5px;'>"+ numericDate(cur_date) +"</div></td>";
    if (this_id == id) {
     str += "<td><div class='updates_status_self'>" + cur_info[5] + "</div></td>";
     str += "<td style='padding:0px'><div class='updates_del' onmouseover=\"this.className='updates_del_on'\" onmouseout=\"this.className='updates_del'\" onclick=\""+this.act+".del('"+cur_info[0]+"')\">X</div></td>";
    } else {
     str += "<td><div class='updates_status_mono'>" + cur_info[5] + "</div></td>";
    }
   } else {
    str += "<tr><td class='updates_date'><div style='padding:0px 5px;'>"+ numericDate(cur_date) +"</div></td><td><div class='updates_mem' ><a href='javascript:getPage("+cur_info[1]+")'>" + cur_info[3] + "</a></div></td>"; 
    str += "<td><div class='updates_status'>" + cur_info[5] + "</div></td>";
   }
   str += "</tr>";
  }
 }
 str += "</table>";


 if (this.getting_block) {
  return str;
 } else {  
  try {
   ge(this.name+'_inner_rows').innerHTML = str;
  } catch(e) {}
 }

}

function updatesPhotos() {
 var str = "";
 images_to_preload = new Array();
 updates_photos.on = true;
 updates_tagged_photos.on = false;
 str += updatesPhotosHeader();
 str += htmlBlock("updates_photos", "");
 vals['updates_photos_left'] = "";
 vals['updates_photos_right'] = "";
 ge('updates_photos').innerHTML = str;
 updates_photos.show(updates_photos.offset, updates_photos.per_page);
}

function updatesTaggedPhotos() {
 var str = "";
 images_to_preload = new Array();
 updates_photos.on = false;
 updates_tagged_photos.on = true;
 str += updatesTaggedPhotosHeader();
 str += htmlBlock("updates_tagged_photos", "");
 vals['updates_tagged_photos_left'] = "";
 vals['updates_tagged_photos_right'] = "";
 ge('updates_photos').innerHTML = str;
 updates_tagged_photos.show(updates_tagged_photos.offset, updates_tagged_photos.per_page);
}

function logout() {
 if (logging_out) {return;}
 logging_out = 1;
 deleteCookie('sid');
 var old_sid = sid;
 sid = "";
 location.href = loginUrl + "login=logout&site="+site_id+"&sid="+old_sid; 
}

function confirmTag(tid) {
  doRequest("act=confirm_tag&tid="+tid+"&parent="+ph_id, tagProcessed);
}

function declineTag(tid) {
  doRequest("act=delete_tag&tid="+tid+"&parent="+ph_id, tagProcessed);
}

function tagProcessed(d) {
 hide('confirm_tag');
 must_get_new_tags = 1;
 doneSubmitTag(d);
}

function memberSchool(school) {
 var type_str = getSchoolType(school[2], 6, 1);
 if (type_str) {
  type_str += ":";
 }
 if (school[4] > 1) {
  return "<tr><td class='label'>"+ type_str +"</td><td><a href=\"#search;s="+school[0]+"\" onClick=\"searchTab(';s="+school[0]+"');return false;\">"+ school[3] + "</a> '<a href=\"#search;s="+school[0]+";y="+school[4]+"\" onClick=\"searchTab(';s="+school[0]+";y="+school[4]+"');\">"+ school[4] +"</a></td></tr>"
 } else {
  return "<tr><td class='label'>"+ type_str +"</td><td><a href=\"#search;s="+school[0]+"\" onClick=\"searchTab(';s="+school[0]+"');return false\">"+ school[3] + "</a></td></tr>";
 }
}

function numericDate(date) {
 var y = date.getFullYear();
 if (y == current_year) {
  return pad(date.getDate()) + "." + pad((date.getMonth()+1)) + " " + pad(date.getHours()) + ":" + pad(date.getMinutes());
 } else {
  return pad(date.getDate()) + "." + pad((date.getMonth()+1)) + "." + date.getFullYear();
 }
}
 
function pad(num) {
 if ((num + "").length < 2) {
  return "0" + num;
 }
 return num;
}

function showAddSchool(belongs) {
 switch (belongs) {
  case 1:
   ge('add_school').innerHTML = "<div class='cancelButton' onClick='deleteSchool("+ search_results.parent +", "+ search_results.year +");' onmouseout=\"this.className='cancelButton'\" onmouseover=\"this.className='cancelButtonOn'\"><span id='add_school_text'>"+l_didn+"</span></div>";
   show('add_school'); 
   break;
  case -1:
   if (search_results.year == "0" || !search_results.year) {
    ge('add_school').innerHTML = "<div class='cancelButton' onClick='showAddSchoolYear();' onmouseout=\"this.className='cancelButton'\" onmouseover=\"this.className='cancelButtonOn'\"><span id='add_school_text'>"+l_sthe+"</span></div>";    
   } else {
    ge('add_school').innerHTML = "<div class='cancelButton' onClick='addSchool("+ search_results.parent +", "+ search_results.year +");' onmouseout=\"this.className='cancelButton'\" onmouseover=\"this.className='cancelButtonOn'\"><span id='add_school_text'>"+l_stud+" "+ search_results.year +"</span></div>";
   }
   show('add_school'); 
   break;
  default: return;
 }
}

function showAddSchoolYear() {
 options = generateYears();
 ge('add_school_text').innerHTML = l_stud+" <select style='font-weight: normal' onChange='addSchool("+ search_results.parent +", this.value);'>" + options + "</select>";
 ge('add_school').childNodes[0].onclick = function() {};
}

function generateYears(current) {
 var i, options = "<option value='0'>"+l_year+"</option>";
 for (i = 2020; i >= 1920; i--) {
  if (current == i) {
   options += "<option value='"+i+"' selected>&nbsp;"+i+"</option>";
  } else {
   options += "<option value='"+i+"'>&nbsp;"+i+"</option>";
  }
 }
 return options;
}

function addSchool(school, year) {
 ge('add_school').innerHTML = "<div class='disabledButton'\">"+l_sadd+"</div>";    
 doRequest("&act=add_school&school="+school+"&year="+year, function(){});
}

function deleteSchool(school, year) {
 ge('add_school').innerHTML = "<div class='disabledButton'\">"+l_srem+"</div>";
 doRequest("&act=delete_school&school="+school+"&year="+year, function(){});
}

function getSchoolType(type, country, inProfile) {

 if (type < 100) {
  return l_sch;
 } else if (type == 110) {
  return '';
 } else {
  return schoolTypes[type];
 }

}

function countryIdToName(country_id) {
  var i, country_name = "", k = all_countries.length;
  for (var i = 0; i < k; i++) {
   if (all_countries[i][0] == country_id) {
    country_name = all_countries[i][1];
    break;
   }
  }
  return country_name;
}

function showLoad() {
// show('loading');
// ge('start_wrap').style.visibility = 'hidden';
}

function hideLoad() {
// hide('loading');
// ge('start_wrap').style.visibility = '';
}

function showCaptcha(num) {

  if (!num) {num = '';}
  last_captcha = new Date();
  hideLoad();
  var f = function() {
   var overlay = ge('overlay'), gf = ge('goodframe');
   gf.style.width = overlay.style.width = document.body.clientWidth + "px";
   gf.style.height = overlay.style.height = (screen.availHeight > document.body.clientHeight ? screen.availHeight : (document.body.clientHeight + 20)) + "px";
  }
  f();
  document.body.onresize = f;
  show('overlay');
  var fw = 0, fh = 0, sctop = 0;
  if (self.innerWidth) {
   fw = self.innerWidth;
   fh = self.innerHeight;
  } else if (document.documentElement && document.documentElement.clientWidth) {
   fw = document.documentElement.clientWidth;
   fh = document.documentElement.clientHeight;
  }  
  sctop = document.documentElement.scrollTop;		
  var x = fw / 2 - 125;

//if(event.keyCode==27){submitCaptcha(true);} 
  ge('captcha_area').innerHTML = 
"<div id='captcha_borders' style='left: "+(x-10)+"px;'></div>" +
"<div id='captcha_box' style='left: "+x+"px;'>"+
" <div class='applyButton' style='cursor: default;'>"+l_cent+"</div>"+
" <div style='height:60px'><img id='captcha"+num+"' src='' height=50 onClick=\"generateCaptcha('"+num+"');\"></div>"+
" <div><input id='code"+num+"' class='regInput' type='text' value='' onKeyPress=\"if(event.keyCode == 13){submitCaptcha('"+num+"', false);}\"/><div>"+
" <div onclick=\"submitCaptcha('"+num+"', false);\" onmouseout=\"this.className='cancelButton'\" onmouseover=\"this.className='cancelButtonOn'\" class='cancelButton'>"+l_csub+"</div></div>" +
"</div>";

  generateCaptcha(num);

  var y = sctop + fh / 2 - ge('captcha_box').clientHeight / 2 - 50;

  ge('captcha_borders').style.top = (y - 10) + "px";
  ge('captcha_borders').style.height = ge('captcha_box').clientHeight + 20 + "px";
  ge('captcha_box').style.top = y + "px";
  ge('captcha_box').style.visibility = 'visible';

  ge('code'+num).focus();
 
}

function submitCaptcha(num, skip) {
 if (!num) {num = '';}
 if (skip && (new Date() - last_captcha < 1000)) {
  return;
 }
 var captcha = ge('code'+num).value;
 if (captcha.length < 5 && !skip) {
  ge('code'+num).focus();
  return;
 }
 document.body.onresize = function() {}; 
 if (num == 'login') {
  postIt(true);
 }
 ge('captcha_area').innerHTML = '';
 hide('overlay');

 if (num != 'login') {
  if (!skip) {
   pending_request.params += "&fcsid="+captcha_sid+"&fccode="+captcha;
  }
  sendRequest(pending_request);
 }
}

function generateCaptcha(num) {
 if (!num) {num = '';}
 captcha_sid = Math.random();
 ge('captcha'+num).src = mainUrl+'act=captcha&csid=' + captcha_sid;
 ge('code'+num).value = '';
}

function parseHashParams(hash_params) {
 var result = {};
 if (!hash_params) {
  return result;
 }
 var parts = hash_params.split(';'), i, k = parts.length;
 for(i = 0; i < k; i++) {
  var keyval = parts[i].split("=");
  result[keyval[0]] = keyval[1] || 1;
 }
 return result;
}

function setHash(hash) {
 hash = "#" + hash;
 if (location.hash == hash && loc_hash == hash) { 
//  return;
 }
 location.hash = loc_hash = hash;
 cur_hash = hash;
 if (isIE) {
  if (!hifr) {hifr = ge('hifr');}
  hifr.src = 'blank.html?' + hash.substr(1);
  hifr.contentWindow.document.body.childNodes[1].innerHTML = hash.substr(1);
 }

}

function getHash() {
 if (isIE) {
  if (!hifr) {hifr = ge('hifr');}
  var hash = hifr.contentWindow.document.body.childNodes[1].innerHTML;
  if (hash) {hash = '#'+hash;}
  return hash;
 } else {
  return location.hash;
 }
}


function setTitle(word) {
 document.title = site_name+": "+word;
}

function checkHistory() {
// Well this shit is tricky

/*
 if (loc_hash != location.hash) {
  var lhash = location.hash;
  location.hash = loc_hash;
  createPage(lhash);
  return;
 }
*/

 var hash = getHash();
 if (cur_hash != hash) {
  cur_hash = hash;
  location.hash = loc_hash = hash;
  createPage(hash);
  return;
 }

// if (isIE && cur_hash != location.hash) {
}