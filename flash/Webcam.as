package {
	
	import flash.display.*;
	import flash.media.*;
	import flash.events.*;
	import flash.external.*;
	import flash.net.*;	
	import flash.system.*;
	import FlashMediaServer.*;
	
	public class Webcam extends MovieClip {
		
		private static var USE_EXTERNAL_INTERFACE;

		public var config:Object = {
			uid: 5,
			name: "asdf",
			server: "debian",
			host: null
		};
		
		private var so_users:SharedObject;
		private var so_messages:SharedObject;
		private var so_viewers:SharedObject;
		
		private var FMS:Connection;
		private var users:Array;
		private var camera:Camera;
		private var microphone:Microphone;
		private var publishing:Boolean = false;		
		private var playing:Boolean = false;
		private var selected_user:String;
		
		private var camera_initialized:Boolean = false;
		
		public function Webcam(){
			
			var flashVars:Object = LoaderInfo(this.root.loaderInfo).parameters;
			for(var k in flashVars){
				if(config[k] != undefined){
					trace("Param " + k + ": " + unescape(flashVars[k]));
					config[k] = unescape(flashVars[k]);
				}
			}

			ExternalInterface.addCallback("JSCallback", JSCallback);
			
			if(config.host == null){
				selected_user = "5";
			}
			
			FMS = new Connection(this, "rtmp://" + config.server + ":1935/conference", {uid: config.uid, name: config.name});
			FMS.addEventListener(Connection.EVENT_ON_CONNECT, onConnectState);
			FMS.addEventListener(Connection.EVENT_ON_PUBLISH, onPublishState);
			FMS.addEventListener(Connection.EVENT_ON_PLAY, onPlayState);			
			
			JSPush("loaded", null);
		}
		
		private function publish(){
			var settings = SharedObject.getLocal("settings"); // вынести?
			if(Camera.names.length == 0){
				trace("Can't find webcam");
			} else if(Camera.names.length > 1 && settings.data.cam_selected == undefined){
				// показываем диалог выбора камер если найдено больше одной камеры
				trace("Select camera...");
				Security.showSettings(SecurityPanel.CAMERA);
				settings.data.cam_selected = true;
				settings.flush();
			} else {			
				if(camera == null){
					camera = Camera.getCamera();
					Log("camera.name=" + camera.name);
					//camera.setMode(200, 150, 12);
					camera.setMode(320, 240, 12);
					camera.setQuality(32000, 0);
					camera.addEventListener(StatusEvent.STATUS, function(info){
						trace("Camera: " + info.code);
						if(info.code == "Camera.Muted"){
							unpublish();
						} else if(info.code == "Camera.Unmuted"){
							publish();
						}
					});
				}

				trace("Camera name: " + camera.name);
				microphone = Microphone.getMicrophone();
				//this.mic.setRate(11);
				cam.attachCamera(camera);				
				
				if(camera.muted){
					if(camera_initialized){
						Security.showSettings(SecurityPanel.PRIVACY);
						// ждем юзера
					} else {
						camera_initialized = true;
						// ниче не делаем
					}
					return;
				}			
				
				FMS.publish(cam, camera, microphone);
					
		/*
					button_publish.addEventListener(MouseEvent.CLICK, function(){
						if(publishing)
							FMS.publish(mycam, null, null);					
						else
							FMS.publish(mycam, camera, microphone);
					});
					button_play.addEventListener(MouseEvent.CLICK, function(){
						if(playing)
							FMS.play(usercam, null);
						else if(selected_user)
							FMS.play(usercam, selected_user);
					});
		*/			
			}
		}
		
		private function unpublish(){
			FMS.publish(cam, null, null);
		}
		
		private function onConnectState(e:ServerEvent){
			var state = (e.data.connected ? "connected" : "disconnected");
			trace("onConnectState: " + state);
			Log(state);
			
			so_users = SharedObject.getRemote("users", FMS.connection.uri, false);
			so_users.addEventListener(NetStatusEvent.NET_STATUS, function(info){trace("SO: " + info);});
			so_users.addEventListener(SyncEvent.SYNC, onUsersSync);
			so_users.addEventListener(AsyncErrorEvent.ASYNC_ERROR, function(e:AsyncErrorEvent){trace(e.error)});			
			so_users.connect(FMS.connection);
			
			so_messages = SharedObject.getRemote("messages", FMS.connection.uri, false);
			so_messages.addEventListener(NetStatusEvent.NET_STATUS, function(info){trace("SO: " + info);});
			so_messages.addEventListener(AsyncErrorEvent.ASYNC_ERROR, function(e:AsyncErrorEvent){trace(e.error)});
			so_messages.client = {newMessage: function(message){
				JSPush("newMessage", message);
			}};
			so_messages.connect(FMS.connection);			
			
			so_viewers = SharedObject.getRemote("viewers_of_" + config.uid, FMS.connection.uri, false);
			so_viewers.addEventListener(NetStatusEvent.NET_STATUS, function(info){trace("SO: " + info);});
			so_viewers.addEventListener(SyncEvent.SYNC, onViewersSync);
			so_viewers.addEventListener(AsyncErrorEvent.ASYNC_ERROR, function(e:AsyncErrorEvent){trace(e.error)});			
			so_viewers.connect(FMS.connection);
			
		}
		
		private function onPublishState(e:ServerEvent){
			Log("onPublishState: " + e.data.publishing);
			publishing = e.data.publishing;
			//if(publishing){FMS.play(cam, config.uid);} // XXX: DEBUG
			
			//button_publish.label = publishing ? "не вещать" : "вещать";		
		}
		
		private function onPlayState(e:ServerEvent){
			Log("onPlayState: " + e.data.playing);
			playing = e.data.playing;
			//button_play.label = playing ? "не смотреть" : "смотреть";		
		}
		
		private function onUsersSync(e:SyncEvent){
			for(var k in e.changeList){
				var data = e.changeList[k];
				if(data.code == "change"){
					data.user = so_users.data[data.name];
				}
				trace("onUsersSync: " + data.code + " - " + data.name);
				JSPush("onUsersSync", data);				
			}
		}

		private function onViewersSync(e:SyncEvent){
			for(var k in e.changeList){
				var data = e.changeList[k];
				if(data.code == "change"){
					data.viewer = so_viewers.data[data.name];					
				}
				trace("onViewersSync: " + data.name + " - " + data.viewer);
				JSPush("onViewersSync", data);
			}
		}
		
		public function JSCallback(action, data){
			trace("JSCallback: action " + action);			
			var resp = "ok";
			switch(action){
				case "start-broadcast":
					FMS.play(cam, null);
					publish();
					break;
				case "stop-broadcast":
					unpublish();
				case "start-watch":
					Log("watch " + data.uid);
					FMS.play(cam, data.uid);
					break;
				case "stop-watch":
					FMS.play(cam, null);
					break;					
				case "play":
					//FMS.play(usercam, selected_user = data);
					break;
				case "message":
					so_messages.send("newMessage", {
						 sender_id: config.uid,
						 sender_name: config.name,
						 message: data
					});
					break;
			}
			return resp;
		}
		
		public static function JSPush(action, data){
			ExternalInterface.call("FLCallback", action, data);
			/*
			if(USE_EXTERNAL_INTERFACE !== false){
				if(USE_EXTERNAL_INTERFACE == null){
					if(String(ExternalInterface.call("ASCallback", "external_interface_test")) != "ok"){
						trace("EXTERNAL INTERFACE DISABLED!");
						USE_EXTERNAL_INTERFACE = false;
						JSPush(action, data);
					} else {
						trace("External Interface enabled");
						USE_EXTERNAL_INTERFACE = true;
					}
				}
				ExternalInterface.call("ASCallback", action, data);
			} else {
				trace("ACHTUNG!");
			}
			*/
		}
		
		public static function Log(message){
			JSPush("Log", message);
		}

	}

}