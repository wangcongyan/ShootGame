import { Dispatcher } from "../../../framework/Dispatcher";
import { BaseHash } from "../../../framework/data/base/BaseHash";
import { CData } from "../../CData";

export abstract class SysProxy
{

    private _dataHash: BaseHash = null;
    private _isSetup: boolean = false;
    protected _listCache: Map<string,Array<any>> = new Map<string,Array<any>> ();	// 静态查询缓存

    constructor()
    {
        this.setup();
    }

    setup()
    {
        if (!this._isSetup)
        {
            this._dataHash = new BaseHash(this.dbName, this.mainKey, this.vo);
            this._dataHash.initData(CData.inst.sysDataList[this.dbName]);
            CData.inst.del(this.dbName);
            this._isSetup = true;
        }
    }

    get dataHash()
    {
        return this._dataHash;
    }

    public getItem(keys: any)
    {
        keys = keys instanceof Array ? keys : [keys];
        return this.dataHash.getItem(keys);
    }

    public search(keys: any, values: any)
    {
        let keyValue: string = values instanceof Array ? values.join('_') : values;
        if(this.dbName == 'sys_activity_award'||this.dbName == 'sys_activity')
        {
            var value =  this.dataHash.searhItems(keys, values)
            this._listCache.set(keyValue,value)
            
        }
        else
        {
            if (!this._listCache.hasOwnProperty(keyValue))
            {
                var value  = this.dataHash.searhItems(keys, values);
                this._listCache.set(keyValue,value);
            }
        }
        return this._listCache.get(keyValue);
    }

    /**
     * 注册事件 
     * */
    public registerEvent($eventName: string, $caller: any, $callBack: Function): void 
    {
        Dispatcher.intance.on($eventName, $caller, $callBack);
    }

    abstract get dbName():string;
    abstract get mainKey():string[];
    abstract get vo():any;
}