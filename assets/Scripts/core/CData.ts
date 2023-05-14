import {  TextAsset, resources } from "cc";
import { Dispatcher } from "../framework/Dispatcher";
import { Config } from "./Config";
import { EnumEventCmd } from "./enum/EnumEventCmd";

/**
 * DataHash	: 带数据修改操作
 * BaseDataHas	：只读操作
 */
export class CData 
{
	public static get dataHash():any
	{
		return CData._dataHash;
	}

	private static _dataHash:Map<string,any> = new Map<string,any>();

	public static register(name:string,cls:any):void
	{
		CData._dataHash.set(name,cls);
	}
	
	private static _inst:CData; ; 
	static get inst():CData 
	{
		return CData._inst || (CData._inst = new CData()); 
	}
	
	private _proxyPool:any=  {}; 
	private _sysDataList:any = {}; 

	public get proxyPool():any
	{
		return this._proxyPool;
	}

	get sysDataList() {
		return this._sysDataList; 
	}

	del(name:string) 
    {
		delete this._sysDataList[name];
	}

	private _preLang:string;
	set preLang(val) {
		this._preLang = val;
	}
	get preLang() {
		return this._preLang;
	}

	public initSysData() 
	{
		let path = Config.DATA_PATH;
		let succeed;
		let type;
		path = Config.DATA_JSON_PATH;
		path = path.replace('{data}', "Halo");
		resources.load(path,TextAsset,this.onSysCompleteJson.bind(this));
		
	}

	private onSysCompleteJson(path:string,data:any) 
	{
		this._sysDataList = JSON.parse(data.data);
		// window['GameSetting'] = this._sysDataList['gameSetting'];
		this.del('gameSetting')
		Dispatcher.intance.event(EnumEventCmd.LOAD_SYS_DATA_COMPLETE);
	}

	/**
	 * 初始化静态数据
	 * @param data 
	 */
	public InitSysDataByText(data:any)
	{
		this._sysDataList = data;
		Dispatcher.intance.event(EnumEventCmd.LOAD_SYS_DATA_COMPLETE);
	}
 
	// -- 数据代理管理 -- //
	proxy <T> (clsName:string):T
	{
		// return Laya.Pool.getItemByClass(clsName, CData.dataHash[clsName]) as T;
		if ( ! this._proxyPool.hasOwnProperty(clsName)) {
			this._proxyPool[clsName] = new CData.dataHash[clsName](); 
		}
		return this._proxyPool[clsName] as T; 
	}

	clear() {
		Dispatcher.intance.event(EnumEventCmd.CLEAR_DATA_HASE);
	}
}