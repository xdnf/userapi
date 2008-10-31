package FlashMediaServer {

	import flash.display.*;
	import flash.net.*;
	import flash.events.*;
	import flash.media.*;
	
	public class Connection extends EventDispatcher{
	
		public static var EVENT_RECORD_DONE:String = "RecordDone";
		public static var EVENT_ON_CONNECT:String = "ConnectState";
		public static var EVENT_ON_PUBLISH:String = "PublishState";
		public static var EVENT_ON_PLAY:String = "PlayState";
	
		public  var connection:NetConnection;
        private var upstream:NetStream;
        private var downstream:NetStream;		
		private var root:MovieClip;
		private var container:MovieClip;
		private var client:Client;
		private var URL:String;
		private var param:Object;
		private var onConnect:Function;
		private var downstream_name:String;
		
		public function Connection(root:MovieClip, URL:String, param:Object){
			this.root = root;
			this.URL = URL;
			this.param = param;			
			client = new Client();
			connection = new NetConnection();
			connection.client = client;
            connection.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);
			connection.addEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
		}
		
		public function connect(onConnect:Function){
			if(!connection.connected){
				Webcam.Log("connecting to " + this.URL);
				this.onConnect = onConnect;
				connection.connect(this.URL, this.param);
			}
		}
		
		public function record(record:Boolean){
			if(record){				
				connection.call("StartRecording", null);
			} else {
				connection.call("StopRecording", new Responder(function(code){
					dispatchEvent(new ServerEvent(EVENT_RECORD_DONE, code));
				}));
				publish(null, null, null);
			}
		}
		
		public function publish(container:Video, camera:Camera, microphone:Microphone){
			if(camera != null){				
				if(connection.connected){
					if(upstream == null){
						upstream = new NetStream(connection);
						upstream.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);					
						upstream.client = client;
					}
					upstream.attachAudio(microphone);
					upstream.attachCamera(camera);
					upstream.publish(String(param.uid), "live");
					Webcam.Log("container.attachCamera");
					//container.attachCamera(camera);
					
					trace(container);
					trace(camera);
				} else {
					connect(function(){
						publish(container, camera, microphone);
					});
				}
			} else {
				container.attachCamera(null);
				container.clear();
				if(upstream != null){
					upstream.attachCamera(null);
					upstream.attachAudio(null);
					upstream.close();
				}
			}
		}
		
		public function play(container:Video, uid:String){
			if(uid != null){
				if(connection.connected){
					
					// XXX: переписать кибиням
					
					if(downstream_name != null){
						watchNotify(false);
					}
					downstream_name = uid;
					
					if(downstream == null){
						downstream = new NetStream(connection);
						downstream.addEventListener(NetStatusEvent.NET_STATUS, netStatusHandler);					
						downstream.client = client;
					}
					container.attachNetStream(downstream);
					downstream.play(String(uid), -2);					
					watchNotify(true);
				} else {
					connect(function(){
						play(container, uid);
					});
				}				
			} else {
				watchNotify(false);
				container.attachNetStream(null);
				//container.clear();
				if(this.downstream)
					this.downstream.close();
				downstream_name = null;
			}
		}
		
		private function watchNotify(watch:Boolean){
			trace("watchNotify: " + watch);
			connection.call("onWatch", null, watch, downstream_name);			
		}
		
		private function netStatusHandler(event:NetStatusEvent):void {
			trace(event.info.code);
			Webcam.Log(event.info.code);
            switch (event.info.code) {				
                case "NetConnection.Connect.Success":
					if(onConnect != null)
						onConnect();
					onConnect = null;
					dispatchEvent(new ServerEvent(EVENT_ON_CONNECT, {connected: true}));
                    break;
                case "NetConnection.Connect.Closed":
					onConnect = null;				
					dispatchEvent(new ServerEvent(EVENT_ON_CONNECT, {connected: false}));
                    break;
				case "NetStream.Publish.Start":
					dispatchEvent(new ServerEvent(EVENT_ON_PUBLISH, {publishing: true}));
					break;
				case "NetStream.Unpublish.Success":
					dispatchEvent(new ServerEvent(EVENT_ON_PUBLISH, {publishing: false}));
					break;
				case "NetStream.Play.Start":
					dispatchEvent(new ServerEvent(EVENT_ON_PLAY, {playing: true}));
					break;
				case "NetStream.Play.Stop":
					dispatchEvent(new ServerEvent(EVENT_ON_PLAY, {playing: false}));
					break;
                case "NetStream.Play.StreamNotFound":
                    trace("Stream not found");
                    break;
            }
        }

        private function securityErrorHandler(event:SecurityErrorEvent):void {
            trace("securityErrorHandler: " + event);
        }

	}

}


class Client {
		
	public function onBWDone():void{
		trace("onBWDone");
	}
	
	public function onMetaData(info:Object):void {
		trace("metadata: duration=" + info.duration + " width=" + info.width + " height=" + info.height + " framerate=" + info.framerate);
	}
	
	public function onCuePoint(info:Object):void {
		trace("cuepoint: time=" + info.time + " name=" + info.name + " type=" + info.type);
	}
	
}
