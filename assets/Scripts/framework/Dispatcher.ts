import { EventDispatcher } from "./event/EventDispatcher";
  
/**
 * 游戏相关控制
 */
export class Dispatcher extends EventDispatcher
{
	private static mInstance:Dispatcher;		
	static get intance():Dispatcher
	{
		if(Dispatcher.mInstance) return Dispatcher.mInstance;
		Dispatcher.mInstance = new Dispatcher();
		return Dispatcher.mInstance;
	}
	
	public On(type: any, caller: any, listener: Function, args?: Array<any>): EventDispatcher
	{
		type =  typeof type == 'number' ? type.toString():type;
		return this.on(type,caller,listener,args);
	}

	public Off(type: any, caller: any, listener: Function, onceOnly?: boolean): EventDispatcher
	{
		type = typeof type == 'number'? type.toString():type;
		return this.off(type,caller,listener);
	}
}