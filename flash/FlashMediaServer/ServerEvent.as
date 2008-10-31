package FlashMediaServer {
	
	import flash.events.Event;
	
	public class ServerEvent extends Event {
		
		public var data:Object;
		
		public function ServerEvent(type:String, data:Object){
			super(type);
			this.data = data;
		}
		
	}
	
}